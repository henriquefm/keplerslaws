import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, ViewEncapsulation, Input } from '@angular/core';
import { OrbitStateService } from '../ngrx/orbit/orbit.service';
import { Observable, Subject, ReplaySubject, timer, merge } from 'rxjs';
import { Planet } from '../models/planets';
import { AnimationStateService } from '../ngrx/animation/animation.service';

// import * as D3 from 'd3';

import * as D3_selection from 'd3-selection';
import * as D3_scale_chromatic from 'd3-scale-chromatic';


import { filter, take, map, distinctUntilChanged, withLatestFrom, skip, debounceTime, switchMap } from 'rxjs/operators';
import { LawStateService } from '../ngrx/law/law.service';

class Coords { 'x': number; 'y': number; }

@Component({
  selector: 'kl-orbit-simulator',
  templateUrl: './orbit-simulator.component.html',
  styleUrls: ['./orbit-simulator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrbitSimulatorComponent implements OnInit, AfterViewChecked {

  @ViewChild('maincontainer')
  maincontainer: ElementRef;

  @Input()
  eraseSweeps$: Observable<void>;


  svg;

  d3Element;

  viewChecked$: Subject<boolean>;

  width: number;
  height: number;

  semiMajorAxis: number;
  semiMinorAxis: number;
  center: Coords;
  linearEccentricity: number;
  planetCoords: Coords;
  sunCoords: Coords;

  // Orbital elements
  timeElapsed: number;

  // Orbit Settings
  eccentricity$: Observable<number>;
  planet$: Observable<Planet>;

  eccentricity: number;

  // Animation
  running$: Observable<boolean>;
  rate$: Observable<number>;

  // Sweeps
  sweeps: any[];
  currentSweep: any[];
  currentSweepStart: number;
  currentSweepsQnt: number;

  constructor(private orbitStateService: OrbitStateService, private animationStateService: AnimationStateService,
              private lawStateService: LawStateService) {

    this.eccentricity$ = this.orbitStateService.eccentricity$;
    this.planet$ = this.orbitStateService.planet$;

    this.running$ = this.animationStateService.running$;
    this.rate$ = this.animationStateService.rate$;

    this.eccentricity = 0;

    this.timeElapsed = 0;

    this.sweeps = [];
    this.currentSweep = [];
    this.currentSweepsQnt = 0;

    this.viewChecked$ = new ReplaySubject<boolean>(1);
    this.viewChecked$.next(false);


  }

  ngOnInit() {

    const htmlElement = this.maincontainer.nativeElement;

    this.svg = D3_selection.select(htmlElement)
                 .select('svg');


    // The first time viewChecked$ emits true, start everything

    this.viewChecked$.pipe(
      filter(x => x),
      take(1),
    )
    .subscribe(() => {

      this.drawEverything();
      this.positionEverything();



      // When eccentricity changes
      this.eccentricity$.pipe(
        distinctUntilChanged()
      ).subscribe((ecc) => {
        this.eccentricity = ecc;
        this.calculateOrbit();
        this.planetCoords = this.calculatePlanetPosition( this.timeElapsed );
        this.positionEverything(true);
        this.recalculateRedrawSweeps();
      });


      // When showEmptyFocus changes
      this.lawStateService.firstLawSettings$.pipe(
        map(firstLawSettings => firstLawSettings.showEmptyFocus),
        distinctUntilChanged()
      )
      .subscribe(showEmptyFocus => {
        this.showEmptyFocus(showEmptyFocus);
      });


      // When showCenter changes
      this.lawStateService.firstLawSettings$.pipe(
        map(firstLawSettings => firstLawSettings.showCenter),
        distinctUntilChanged()
      )
      .subscribe(showCenter => {
        this.showCenter(showCenter);
      });


      // When showSemiminoraxis changes
      this.lawStateService.firstLawSettings$.pipe(
        map(firstLawSettings => firstLawSettings.showSemiminoraxis),
        distinctUntilChanged()
      ).subscribe (shouldShow => {
        this.showSemiminoraxis(shouldShow);
      });

      // When showSemimajoraxis changes
      this.lawStateService.firstLawSettings$.pipe(
        map(firstLawSettings => firstLawSettings.showSemimajoraxis),
        distinctUntilChanged()
      ).subscribe (shouldShow => {
        this.showSemimajoraxis(shouldShow);
      });



      // Erase sweeps when:
      // - A eraseSweep event is received
      // - Sweep size changes
      merge(
        this.eraseSweeps$,
        this.lawStateService.secondLawSettings$.pipe(
          map(s => s.sweepSize),
          distinctUntilChanged()
        ),
      ).subscribe(() => {
        this.eraseSweeps();
      });


    });


    // Position everything if component size changes
    this.viewChecked$.pipe(
      filter(x => x),
      skip(1),
      withLatestFrom( this.running$ ),
    )
    .subscribe(([, isRunning]) => {

      this.calculateOrbit();
      this.planetCoords = this.calculatePlanetPosition( this.timeElapsed );

      // Dont position the planet if animation is running
      this.positionEverything( ! isRunning );

      this.recalculateRedrawSweeps();

    });


    // Planet animation

    this.rate$.pipe(
      debounceTime(200),
      // rate = 0,1 -> period = 50
      // rate = 5 -> period = 5
      map(rate => Math.floor(( - 45 / 4.9 ) * ( rate - 5 ) + 5 )),
      switchMap((period) => timer(0, period)),
      withLatestFrom( this.running$ ),
      filter(([, running]) => running),
      withLatestFrom( this.lawStateService.secondLawSettings$, ([], sLS) => sLS ),
    ).subscribe((secondLawSettings) => {

      this.animatePlanet();

      if ( secondLawSettings.isSweeping ) {

        const sweepQnt = secondLawSettings.sweepContinuously ? secondLawSettings.sweepSize.denominator : 1;

        this.sweep(secondLawSettings.sweepSize.value, sweepQnt);
      }

    },
    );

  }

  /**
   * If the size of the main container changes, get new width and height, and emit true on the viewChecked$ stream,
   * so the orbit size and elements positions can be recalculated
   */
  ngAfterViewChecked() {

    if ( this.width === this.maincontainer.nativeElement.offsetWidth &&
          this.height === this.maincontainer.nativeElement.offsetHeight ) {

      return;

    }

    this.width = this.maincontainer.nativeElement.offsetWidth;
    this.height = this.maincontainer.nativeElement.offsetHeight;

    this.svg.attr('width', this.width)
            .attr('height', this.height);

    this.viewChecked$.next(true);

  }

  /**
   * Calculate orbit properties (semiMajorAxis, semiMinorAxis, linearEccentricity, center and sunCoords) based on the main container
   * width and height and the orbit eccentricity
   */
  calculateOrbit() {

    const maxHorizontalWidth = this.width * 0.8;
    const maxVerticalHeight = this.height * 0.8;

    if ( maxHorizontalWidth < maxVerticalHeight ) {

      this.semiMajorAxis = maxHorizontalWidth / 2;

    } else {

      this.semiMajorAxis = maxVerticalHeight / 2;

    }

    this.semiMinorAxis = Math.sqrt( Math.pow(this.semiMajorAxis, 2) * ( 1 - Math.pow(this.eccentricity, 2) ) );

    this.linearEccentricity = Math.sqrt( Math.pow(this.semiMajorAxis, 2) - Math.pow(this.semiMinorAxis, 2) );

    this.center = { x:  this.width / 2, y:  this.height / 2 };

    this.sunCoords = { x:  this.width / 2 - this.linearEccentricity, y:  this.height / 2 };

  }

  drawEverything() {

    this.svg.text('');

    this.calculateOrbit();

    this.drawSweepsContainer();

    this.drawMainOrbit();

    this.drawSemiminoraxis();

    this.drawSemimajoraxis();

    this.drawSun();

    this.drawPlanet();

    this.drawCenter();

    this.drawEmptyFocus();


  }

  positionEverything(positionPlanet = true) {

    this.calculateOrbit();

    this.positionOrbit();

    this.positionSun();

    if ( positionPlanet ) {
      this.positionPlanet();
    }

    this.positionEmptyFocus();

    this.positionCenter();

    this.positionSemiminoraxis();

    this.positionSemimajoraxis();

  }

  drawMainOrbit() {

    this.svg
      .append('ellipse')
      .classed('mainOrbit', true);

    this.positionOrbit();

  }

  positionOrbit() {

    const orbitCoords = {cx:  this.width / 2, cy:  this.height / 2, rx: this.semiMajorAxis, ry: this.semiMinorAxis};

    this.svg
      .select('ellipse.mainOrbit')
        .attr('cx', orbitCoords.cx)
        .attr('cy', orbitCoords.cy)
        .attr('rx', orbitCoords.rx)
        .attr('ry', orbitCoords.ry);

  }


  drawSun() {

    this.svg
      .append('circle')
        .attr('r',  10)
        .classed('sun', true);

    this.positionSun();
  }

  positionSun() {

    if ( ! this.sunCoords ) {
      this.sunCoords = { x:  0, y:  0 };
    }

    this.svg
      .select('circle.sun')
        .attr('cx', this.sunCoords.x)
        .attr('cy', this.sunCoords.y);
  }




  drawPlanet() {

    this.svg
      .append('circle')
        .attr('r', 5)
        .classed('planet', true);

    this.positionPlanet( );

  }

  positionPlanet( ) {

    if ( ! this.planetCoords ) {
      this.planetCoords = { x:  this.width / 2 - this.semiMajorAxis, y:  this.height / 2 };
    }

    this.svg
      .select('circle.planet')
        .attr('cx', this.planetCoords.x)
        .attr('cy', this.planetCoords.y);


  }


  animatePlanet() {

    this.timeElapsed++;

    this.planetCoords = this.calculatePlanetPosition( this.timeElapsed );

    this.positionPlanet();

  }

  /**
   *  Calculate and return the planet's position at a particular time
   *
   * @param timeElapsed In this case, timeElapsed is analogous to the Mean anomaly, M: an "imaginary" angle that is
   *  zero at periapsis and increases at a constant rate of 360 degrees per orbit (by 2012rcampion)
   */
  calculatePlanetPosition(timeElapsed: number): Coords {

    // https://space.stackexchange.com/questions/8911/determining-orbital-position-at-a-future-point-in-time/8915#8915


    // Since we are in 2D space, I believe/hope longitude of the ascending node (Ω), argument of periapsis (ω)
    //   and longitude of periapsis are not applicable

    // Mean anomaly (M) = mean longitude (L) (in radians), in 2D
    const M = timeElapsed * Math.PI / 180;


    let E = M;
    while (true) {
      const dE = (E - this.eccentricity * Math.sin(E) - M) / (1 - this.eccentricity * Math.cos(E));
      E -= dE;
      if ( Math.abs(dE) < 1e-6 ) {
        break;
      }
    }

    const P = - this.semiMajorAxis * (Math.cos(E) - this.eccentricity) + this.width / 2 - this.linearEccentricity;
    const Q = this.semiMajorAxis * Math.sin(E) * Math.sqrt(1 - Math.pow(this.eccentricity, 2)) + this.height / 2;

    return { x: P, y: Q };

  }

  /**
   *  Updates the sweeps, currentSweep and a few other variables
   *
   * @param sweepSize The size of a sweep
   * @param sweepQnt How many sweeps should it make
   */
  sweep(sweepSize: number, sweepQnt: number) {

    const currentSweepSize = ( this.timeElapsed - this.currentSweepStart ) % 360;

    // New sweep
    if ( this.currentSweep.length === 0 || 360 * sweepSize <= currentSweepSize ) {

      this.currentSweepsQnt++;

      // Restart currentSweep with the sun
      this.currentSweep = [ {  ...this.sunCoords, timeElapsed: this.timeElapsed, sun: true } ];

      // Put the planet's current position in last sweep, if there's one
      const lastSweep = this.sweeps[ this.sweeps.length - 1 ];
      if ( lastSweep && this.currentSweepsQnt !== 1 ) {
        lastSweep.push( { ...this.planetCoords, timeElapsed: this.timeElapsed } );
      }

      this.sweeps.push( this.currentSweep );

      this.currentSweepStart = this.timeElapsed;

    }

    this.currentSweep.push( {...this.planetCoords, timeElapsed: this.timeElapsed } );

    this.updateSweeps();

    if ( this.currentSweepsQnt > sweepQnt ) {
      this.currentSweepsQnt = 0;
      this.currentSweep = [];
      this.lawStateService.sweepingToggle();
      return;
    }

  }

  eraseSweeps() {
    this.currentSweepsQnt = 0;
    this.currentSweep = [];
    this.sweeps = [];

    this.updateSweeps();
  }

  /**
   * Update the sweeps on screen based on the sweeps variable
   */
  updateSweeps() {

    const sweepsSvg = this.svg
                        .select('#sweeps')
                        .selectAll('polygon.sweep')
                        .data( this.sweeps );

    sweepsSvg.enter()
              .append('polygon')
              .classed('sweep', true);

    sweepsSvg.attr('points', (polygon) => {
                  return polygon.map( (point) => {
                      return [point.x, point.y].join(',');
                  }).join(' ');
                })
              .style('fill', (a, b) => D3_scale_chromatic.schemeCategory10[ b % 10 ] );

    sweepsSvg.exit()
                .remove();

  }

  /**
   * Recalculate all sweeps coordinates and redraw them
   */
  recalculateRedrawSweeps() {

    this.sweeps = this.sweeps.map( sweep => {

      return sweep.map( coordinate => {

        if ( 'sun' in coordinate && coordinate.sun === true ) {
          return { ...this.sunCoords, timeElapsed: coordinate.timeElapsed, sun: true };
        } else {
          const newCoordinate = this.calculatePlanetPosition( coordinate.timeElapsed );
          return { ...newCoordinate, timeElapsed: coordinate.timeElapsed };
        }

      });

    });

    this.updateSweeps();

  }

  drawSweepsContainer() {

    this.svg
      .append('g')
      .attr('id', 'sweeps');

  }


  drawEmptyFocus() {

    this.svg
      .append('circle')
      .classed('emptyFocus', true);

    this.positionEmptyFocus();

  }

  positionEmptyFocus() {

    const emptyFocusCoords = { cx:  this.width / 2 + this.linearEccentricity, cy:  this.height / 2, r: 5 };

    this.svg
      .select('circle.emptyFocus')
        .attr('cx', emptyFocusCoords.cx)
        .attr('cy', emptyFocusCoords.cy)
        .attr('r',  emptyFocusCoords.r);

  }



  showEmptyFocus(shouldShowEmptyFocus) {

    this.svg
      .selectAll('circle.emptyFocus')
      .classed('hidden', ! shouldShowEmptyFocus);


  }


  //      CENTER

  drawCenter() {

    this.svg
      .append('circle')
      .classed('center', true);

    this.positionCenter();

  }

  positionCenter() {

    this.svg
      .select('circle.center')
        .attr('cx', this.center.x)
        .attr('cy', this.center.y)
        .attr('r',  5);

  }



  showCenter(shouldShowCenter) {

    this.svg
    .selectAll('circle.center')
    .classed('hidden', ! shouldShowCenter);


  }


  /*
   *      Semi minor axis
   */

  drawSemiminoraxis() {

    this.svg
      .append('line')
      .classed('semiminoraxis', true);

    this.positionSemiminoraxis();

  }

  positionSemiminoraxis() {

    this.svg
      .select('line.semiminoraxis')
        .attr('x1', this.center.x)
        .attr('y1', this.center.y)
        .attr('x2', this.center.x)
        .attr('y2', this.center.y - this.semiMinorAxis);

  }

  showSemiminoraxis(shouldShow) {

    this.svg
      .selectAll('line.semiminoraxis')
        .classed('hidden', ! shouldShow);


  }


  /*
   *      Semi major axis
   */

  drawSemimajoraxis() {

    this.svg
      .append('line')
      .classed('semimajoraxis', true);

    this.positionSemimajoraxis();

  }

  positionSemimajoraxis() {

    this.svg
      .select('line.semimajoraxis')
        .attr('x1', this.center.x)
        .attr('y1', this.center.y)
        .attr('x2', this.center.x + this.semiMajorAxis)
        .attr('y2', this.center.y);

  }

  showSemimajoraxis(shouldShow) {

    this.svg
      .selectAll('line.semimajoraxis')
        .classed('hidden', ! shouldShow);


  }

}
