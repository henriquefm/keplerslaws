import { createFeatureSelector, createSelector } from '@ngrx/store';
import { orbitInitialState, OrbitState } from './orbit.state';
import { OrbitStateActionsUnion, OrbitStateActionTypes } from './orbit.actions';



export function orbitStateReducer(state = orbitInitialState, action: OrbitStateActionsUnion): OrbitState {
  switch (action.type) {

    case OrbitStateActionTypes.PlanetSelected: {

      return {
        ...state,
        planet: action.payload.planet,
        eccentricity: action.payload.planet.eccentricity,
      };
    }

    case OrbitStateActionTypes.OrbitEccentricityChanged: {

      return {
        ...state,
        planet: undefined,
        eccentricity: action.payload.eccentricity,
      };
    }

    default: {
      return state;
    }
  }
}






export const getOrbitStateFeature = createFeatureSelector<OrbitState>('orbit');

export const getPlanetSettings = createSelector(
  getOrbitStateFeature,
  state => state.planet
);

export const getEccentricitySettings = createSelector(
  getOrbitStateFeature,
  state => state.eccentricity
);


