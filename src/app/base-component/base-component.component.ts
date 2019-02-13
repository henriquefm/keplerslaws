import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LawStateService } from '../ngrx/law/law.service';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { LawStateActionTypes } from '../ngrx/law/law.actions';
import { MatDialog } from '@angular/material';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';


@Component({
  selector: 'kl-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss'],
})
export class BaseComponentComponent implements OnInit {

  eraseSweeps$: Observable<void>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private actionsSubj: ActionsSubject, private dialog: MatDialog) {

    this.eraseSweeps$ = this.actionsSubj.pipe(
      ofType( LawStateActionTypes.EraseSweepsRequested ),
    );

  }

  ngOnInit() { }


  openHelp() {
    this.dialog.open(HelpDialogComponent, {
      width: '650px'
    });
  }

}
