import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Planet } from '../../models/planets';
import { AppState } from '../app.state';
import { getEccentricitySettings, getPlanetSettings } from './orbit.reducer';

import { OrbitEccentricityChangedAction, PlanetSelectedAction } from './orbit.actions';



@Injectable()
export class OrbitStateService {

  eccentricity$: Observable<number>;

  planet$: Observable<Planet>;

  constructor(private store: Store<AppState>) {

    this.eccentricity$ = store.pipe(
      select(getEccentricitySettings)
    );

    this.planet$ = store.pipe(
      select(getPlanetSettings),
    );
  }

  planetSelected(planet: Planet) {
    this.store.dispatch( new PlanetSelectedAction( { planet } )  );
  }

  orbitEccentricityChanged(eccentricity: number) {
    this.store.dispatch( new OrbitEccentricityChangedAction( { eccentricity } )  );
  }

}
