import { Component, OnInit } from '@angular/core';
import { LawStateService } from 'src/app/ngrx/law/law.service';
import { Observable } from 'rxjs';
import { ThirdLawState } from 'src/app/ngrx/law/law.state';
import { DataSource } from '@angular/cdk/table';
import { map } from 'rxjs/operators';

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


class ThirdLawDataSource extends DataSource<TableItem> {

  constructor(private thirdLawSettings$: Observable<ThirdLawState>) {
    super();
  }

  connect(): Observable<TableItem[]> {
    return this.thirdLawSettings$.pipe(
      map(thirdLawSettings => {

        const thirdLawRatio = Math.pow( thirdLawSettings.semiMajorAxis * 100, 3 ) / Math.pow( thirdLawSettings.orbitalPeriod, 2 );

        return [
          {'property': 'Semi-major axis', 'symbol': 'R', 'unit': 'AU', 'value': thirdLawSettings.semiMajorAxis},
          {'property': 'Orbital Period', 'symbol': 'T', 'unit': 'days', 'value': thirdLawSettings.orbitalPeriod},
          {'property': 'R³/T²', 'symbol': '', 'unit': '', 'value': thirdLawRatio},
        ];
      })
    );
  }


  disconnect() { }

}

interface TableItem {
  'property': string;
  'symbol': string;
  'unit': string;
  'value': number;
}
