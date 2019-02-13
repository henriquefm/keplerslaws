import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../app.state';
import { getRunning, getRate } from './animation.reducer';
import { RunningToggledAction, RateChangedAction } from './animation.actions';

@Injectable()
export class AnimationStateService {

  running$: Observable<boolean>;

  rate$: Observable<number>;

  constructor(private store: Store<AppState>) {

    this.running$ = store.pipe(
      select(getRunning)
    );

    this.rate$ = store.pipe(
      select(getRate),
    );
  }

  runningToggled() {
    this.store.dispatch( new RunningToggledAction( )  );
  }

  rateChanged(rate: number) {
    this.store.dispatch( new RateChangedAction( { rate } )  );
  }

}
