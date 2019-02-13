import { Component } from '@angular/core';
import { Planet, planets } from 'src/app/models/planets';
import { Observable } from 'rxjs';
import { OrbitStateService } from 'src/app/ngrx/orbit/orbit.service';
import { LawStateService } from 'src/app/ngrx/law/law.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kl-orbit-settings',
  templateUrl: './orbit-settings.component.html',
  styleUrls: ['./orbit-settings.component.scss', '../settings.shared.scss']
})
export class OrbitSettingsComponent {

  planets: Planet[];

  eccentricity$: Observable<number>;
  planet$: Observable<Planet>;

  isSweeping$: Observable<boolean>;


  constructor( private orbitStateService: OrbitStateService, private lawStateService: LawStateService ) {


    this.eccentricity$ = this.orbitStateService.eccentricity$;
    this.planet$ = this.orbitStateService.planet$;
    this.isSweeping$ = this.lawStateService.secondLawSettings$.pipe(
      map( secondLawSettings => secondLawSettings.isSweeping ),
    );

    this.planets = planets;

  }

  onPlanetSelected(value) {
    this.orbitStateService.planetSelected(value);
  }

  onOrbitEccentricityChanged(value) {
    this.orbitStateService.orbitEccentricityChanged(value);
  }

}
