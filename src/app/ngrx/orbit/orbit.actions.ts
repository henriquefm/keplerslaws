import { Action } from '@ngrx/store';
import { Planet } from '../../models/planets';


export enum OrbitStateActionTypes {

  PlanetSelected = '[App] PlanetSelected',
  OrbitEccentricityChanged = '[App] OrbitEccentricityChanged',

}


/*
 *    ACTIONS classes
 */

export class PlanetSelectedAction implements Action {
  readonly type = OrbitStateActionTypes.PlanetSelected;

  constructor( public payload: { planet: Planet } ) {}

}

export class OrbitEccentricityChangedAction implements Action {
  readonly type = OrbitStateActionTypes.OrbitEccentricityChanged;

  constructor( public payload: { eccentricity: number } ) {}

}



/*
 *  ACTIONS UNION
 */

export type OrbitStateActionsUnion =
  | PlanetSelectedAction
  | OrbitEccentricityChangedAction
  ;

