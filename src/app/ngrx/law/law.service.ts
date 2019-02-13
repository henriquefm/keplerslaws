import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../app.state';
import { getSecondLawSettings, getFirstLawSettings, getThirdLawSettings } from './law.reducer';
import { SweepingToggledAction, SweepContinuouslyChangedAction,
         SweepSizeChangedAction, ShowEmptyFocusChangedAction, ShowCenterChangedAction,
         ShowSemiminoraxisChangedAction,
         ShowSemimajoraxisChangedAction,
         EraseSweepsRequestedAction,
         SweepingChangedAction,
         SemimajoraxisChangedAction,
         OrbitalPeriodChangedAction} from './law.actions';
import { ThirdLawState, FirstLawState, SecondLawState } from './law.state';



@Injectable()
export class LawStateService {

  firstLawSettings$: Observable<FirstLawState>;

  secondLawSettings$: Observable<SecondLawState>;

  thirdLawSettings$: Observable<ThirdLawState>;

  constructor(private store: Store<AppState>) {


    this.secondLawSettings$ = store.pipe(
      select(getSecondLawSettings)
    );

    this.firstLawSettings$ = store.pipe(
      select(getFirstLawSettings)
    );

    this.thirdLawSettings$ = store.pipe(
      select(getThirdLawSettings)
    );

  }


  // First Law

  showEmptyFocusChanged(value) {
    this.store.dispatch( new ShowEmptyFocusChangedAction( {value} ) );
  }

  showCenterChanged(value) {
    this.store.dispatch( new ShowCenterChangedAction( {value} ) );
  }

  showSemiminoraxis(value) {
    this.store.dispatch( new ShowSemiminoraxisChangedAction( {value} ) );
  }

  showSemimajoraxis(value) {
    this.store.dispatch( new ShowSemimajoraxisChangedAction( {value} ) );
  }



  // Second Law


  sweepingToggle() {
    this.store.dispatch( new SweepingToggledAction() );
  }

  sweepingChanged(value) {
    this.store.dispatch( new SweepingChangedAction(value) );
  }

  sweepContinuouslyChanged(value) {
    this.store.dispatch( new SweepContinuouslyChangedAction( {value} ) );
  }

  sweepSizeChanged(value) {
    this.store.dispatch( new SweepSizeChangedAction({denominator: value}) );
  }

  eraseSweeps() {
    this.store.dispatch( new EraseSweepsRequestedAction() );
  }


  // Third Law

  semimajoraxisChanged(newValue) {
    this.store.dispatch( new SemimajoraxisChangedAction({newValue}) );
  }

  orbitalPeriodChangedAction(newValue) {
    this.store.dispatch( new OrbitalPeriodChangedAction({newValue}) );
  }


}
