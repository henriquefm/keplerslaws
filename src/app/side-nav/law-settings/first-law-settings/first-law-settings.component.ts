import { Component, OnInit } from '@angular/core';
import { LawStateService } from 'src/app/ngrx/law/law.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kl-first-law-settings',
  templateUrl: './first-law-settings.component.html',
  styleUrls: ['./first-law-settings.component.scss', '../../settings.shared.scss']
})
export class FirstLawSettingsComponent implements OnInit {

  showEmptyFocus$: Observable<boolean>;

  showCenter$: Observable<boolean>;

  showSemiminoraxis$: Observable<boolean>;

  showSemimajoraxis$: Observable<boolean>;

  constructor(private lawStateService: LawStateService) {

    this.showEmptyFocus$ = this.lawStateService.firstLawSettings$.pipe(
      map(firstLawSettings => firstLawSettings.showEmptyFocus),
    );

    this.showCenter$ = this.lawStateService.firstLawSettings$.pipe(
      map(firstLawSettings => firstLawSettings.showCenter),
    );

    this.showSemiminoraxis$ = this.lawStateService.firstLawSettings$.pipe(
      map(firstLawSettings => firstLawSettings.showSemiminoraxis),
    );

    this.showSemimajoraxis$ = this.lawStateService.firstLawSettings$.pipe(
      map(firstLawSettings => firstLawSettings.showSemimajoraxis),
    );

  }

  ngOnInit() {
  }

  onShowEmptyFocusChanged(value) {
    this.lawStateService.showEmptyFocusChanged(value);
  }

  onShowCenterChanged(value) {
    this.lawStateService.showCenterChanged(value);
  }

  onShowSemiminoraxisChanged(value) {
    this.lawStateService.showSemiminoraxis(value);
  }

  onShowSemimajoraxisChanged(value) {
    this.lawStateService.showSemimajoraxis(value);
  }

}
