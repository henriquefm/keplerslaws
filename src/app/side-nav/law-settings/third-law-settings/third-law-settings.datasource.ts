import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { ThirdLawState } from 'src/app/ngrx/law/law.state';
import { map } from 'rxjs/operators';


interface TableItem {
  'property': string;
  'symbol': string;
  'unit': string;
  'value': number;
}



export class ThirdLawDataSource extends DataSource<TableItem> {

  constructor(private thirdLawSettings$: Observable<ThirdLawState>) {
    super();
  }

  connect(): Observable<TableItem[]> {
    return this.thirdLawSettings$.pipe(
      map(thirdLawSettings => {

        const thirdLawRatio = Math.pow( thirdLawSettings.semiMajorAxis * 100, 3 ) / Math.pow( thirdLawSettings.orbitalPeriod, 2 );

        return [
          {property: 'Semi-major axis', symbol: 'R', unit: 'AU', value: thirdLawSettings.semiMajorAxis},
          {property: 'Orbital Period', symbol: 'T', unit: 'days', value: thirdLawSettings.orbitalPeriod},
          {property: 'R³/T²', symbol: '', unit: '', value: thirdLawRatio},
        ];
      })
    );
  }


  disconnect() { }

}
