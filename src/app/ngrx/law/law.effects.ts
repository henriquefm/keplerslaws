import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom, filter } from 'rxjs/operators';
import { LawStateActionTypes, EraseSweepsRequestedAction, SweepingToggledAction } from './law.actions';
import { LawStateService } from './law.service';
import { AnimationStateService } from '../animation/animation.service';
import { PlanetSelectedAction, OrbitStateActionTypes } from '../orbit/orbit.actions';
import { OrbitStateService } from '../orbit/orbit.service';



@Injectable()
export class LawStateEffects {


  // Erase Sweeps should stop sweeping
  @Effect({ dispatch: false })
  eraseSweepsShouldStopSweeping$ = this.actions$.pipe(
    ofType<EraseSweepsRequestedAction>( LawStateActionTypes.EraseSweepsRequested ),
    tap(() => {
      this.lawStateService.sweepingChanged( false );
    })
  );


  // 'Start sweeping' shoud start animation if it is not started already
  @Effect({ dispatch: false })
  startSweepingShouldStartAnimation$ = this.actions$.pipe(
    ofType<SweepingToggledAction>( LawStateActionTypes.SweepingToggled ),
    withLatestFrom(this.animationService.running$, (a, s) => s),
    filter(running => ! running),
    tap(() => {
      this.animationService.runningToggled();
    })
  );


  // Changing planets should change third law's semimajoraxis
  @Effect({ dispatch: false })
  changingPlanetsShouldChangeThirdLawsSemimajoraxis$ = this.actions$.pipe(
    ofType<PlanetSelectedAction>( OrbitStateActionTypes.PlanetSelected ),
    withLatestFrom(this.orbitStateService.planet$, (a, s) => s),
    tap((planet) => {
      this.lawStateService.semimajoraxisChanged(planet.semimajorAxis);
    })
  );




  constructor(private actions$: Actions, private lawStateService: LawStateService, private animationService: AnimationStateService,
              private orbitStateService: OrbitStateService) {}
}
