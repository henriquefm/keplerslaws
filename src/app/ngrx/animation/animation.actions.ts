import { Action } from '@ngrx/store';


export enum AnimationStateActionTypes {

  RunningToggled = '[Animation] Running Toggled',
  RateChanged = '[Animation] Rate Changed',

}


/*
 *    ACTIONS classes
 */

export class RunningToggledAction implements Action {
  readonly type = AnimationStateActionTypes.RunningToggled;

  constructor( ) {}

}

export class RateChangedAction implements Action {
  readonly type = AnimationStateActionTypes.RateChanged;

  constructor( public payload: { rate: number } ) {}

}



/*
 *  ACTIONS UNION
 */

export type AnimationStateActionsUnion =
  | RunningToggledAction
  | RateChangedAction
  ;

