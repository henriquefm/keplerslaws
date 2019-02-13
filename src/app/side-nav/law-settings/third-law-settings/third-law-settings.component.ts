import { Component, OnInit } from '@angular/core';
import { LawStateService } from 'src/app/ngrx/law/law.service';
import { Observable } from 'rxjs';
import { ThirdLawState } from 'src/app/ngrx/law/law.state';
import { ThirdLawDataSource } from './third-law-settings.datasource';

@Component({
  selector: 'kl-third-law-settings',
  templateUrl: './third-law-settings.component.html',
  styleUrls: ['./third-law-settings.component.scss']
})
export class ThirdLawSettingsComponent implements OnInit {

  thirdLawSettings$: Observable<ThirdLawState>;

  tableColumns: string[] = ['property', 'symbol', 'unit', 'value'];

  dataSource: ThirdLawDataSource;


  constructor(private lawStateService: LawStateService) {

    this.thirdLawSettings$ = this.lawStateService.thirdLawSettings$;

    this.dataSource = new ThirdLawDataSource( this.thirdLawSettings$ );

  }

  ngOnInit() {
  }

  onSemiMajorAxisChanged(value) {
    this.lawStateService.semimajoraxisChanged(value);
  }

  onOrbitalPeriodChanged(value) {
    this.lawStateService.orbitalPeriodChangedAction(value);
  }

}


