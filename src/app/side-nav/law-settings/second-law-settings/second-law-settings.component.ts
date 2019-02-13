import { Component, OnInit } from '@angular/core';
import { LawStateService } from 'src/app/ngrx/law/law.service';
import { Observable } from 'rxjs';
import { SecondLawState } from 'src/app/ngrx/law/law.state';

@Component({
  selector: 'kl-second-law-settings',
  templateUrl: './second-law-settings.component.html',
  styleUrls: ['./second-law-settings.component.scss', '../../settings.shared.scss']
})
export class SecondLawSettingsComponent implements OnInit {

  secondLawSettings$: Observable<SecondLawState>;

  allowedValues = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36];

  constructor(private lawStateService: LawStateService) {

    this.secondLawSettings$ = this.lawStateService.secondLawSettings$;

  }

  ngOnInit() {
  }

  onStartSweepingClicked() {
    this.lawStateService.sweepingToggle();
  }

  onEraseSweepsClicked() {
    this.lawStateService.eraseSweeps();
  }

  onSweepContinuouslyChanged(value) {
    this.lawStateService.sweepContinuouslyChanged(value);
  }

  onSweepSizeChanged(value) {
    if ( this.allowedValues.includes( value ) ) {
      this.lawStateService.sweepSizeChanged(value);
    }
  }

}
