import { Action } from '@ngrx/store';
import { Planet } from '../../models/planets';


export enum LawStateActionTypes {


  // First Law
  ShowEmptyFocusChanged = '[1Law] Show Empty Focus Changed',
  ShowCenterChanged = '[1Law] Show Center Changed',
  ShowSemiminoraxisChanged = '[1Law] Show Semiminoraxis Changed',
  ShowSemimajoraxisChanged = '[1Law] Show Semimajoraxis Changed',



  // Second Law
  SweepingToggled = '[2Law] Sweeping Toggled',
  SweepingChanged = '[2Law] Sweeping Changed',
  SweepContinuouslyChanged = '[2Law] Sweep Continuously Changed',
  SweepSizeChanged = '[2Law] Sweep Size Changed',
  EraseSweepsRequested = '[2Law] Erase Sweeps Requested',



  // Third Law
  SemimajoraxisChanged = '[3Law] Semimajoraxis Changed',
  OrbitalPeriodChanged = '[3Law] Orbital Period Changed',

}


/*
 *    ACTIONS classes
 */


// First Law

export class ShowEmptyFocusChangedAction implements Action {
  readonly type = LawStateActionTypes.ShowEmptyFocusChanged;

  constructor( public payload: { value: boolean } ) {}

}

export class ShowCenterChangedAction implements Action {
  readonly type = LawStateActionTypes.ShowCenterChanged;

  constructor( public payload: { value: boolean } ) {}

}

export class ShowSemiminoraxisChangedAction implements Action {
  readonly type = LawStateActionTypes.ShowSemiminoraxisChanged;

  constructor( public payload: { value: boolean } ) {}

}

export class ShowSemimajoraxisChangedAction implements Action {
  readonly type = LawStateActionTypes.ShowSemimajoraxisChanged;

  constructor( public payload: { value: boolean } ) {}

}




// Second Law

export class SweepingToggledAction implements Action {
  readonly type = LawStateActionTypes.SweepingToggled;

  constructor() {}

}

export class SweepingChangedAction implements Action {
  readonly type = LawStateActionTypes.SweepingChanged;

  constructor(public payload: { value: boolean } ) {}

}


export class SweepContinuouslyChangedAction implements Action {
  readonly type = LawStateActionTypes.SweepContinuouslyChanged;

  constructor( public payload: { value: boolean } ) {}

}


export class SweepSizeChangedAction implements Action {
  readonly type = LawStateActionTypes.SweepSizeChanged;

  constructor( public payload: { denominator: number } ) {}

}

export class EraseSweepsRequestedAction implements Action {
  readonly type = LawStateActionTypes.EraseSweepsRequested;

  constructor() {}

}




// Third Law

export class SemimajoraxisChangedAction implements Action {
  readonly type = LawStateActionTypes.SemimajoraxisChanged;

  constructor(public payload: { newValue: number }) {}

}

export class OrbitalPeriodChangedAction implements Action {
  readonly type = LawStateActionTypes.OrbitalPeriodChanged;

  constructor(public payload: { newValue: number }) {}

}


/*
 *  ACTIONS UNION
 */

export type LawStateActionsUnion =
  | ShowEmptyFocusChangedAction
  | ShowCenterChangedAction
  | ShowSemiminoraxisChangedAction
  | ShowSemimajoraxisChangedAction

  | SweepingToggledAction
  | SweepingChangedAction
  | SweepContinuouslyChangedAction
  | SweepSizeChangedAction
  | EraseSweepsRequestedAction

  | SemimajoraxisChangedAction
  | OrbitalPeriodChangedAction
  ;

