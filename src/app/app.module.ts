import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponentComponent } from './base-component/base-component.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
         MatSelectModule, MatExpansionModule, MatSliderModule, MatCheckboxModule,
         MatTabsModule, MatTableModule, MatDialogModule} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { SideNavComponent } from './side-nav/side-nav.component';
import { orbitStateReducer } from './ngrx/orbit/orbit.reducer';
import { OrbitStateService } from './ngrx/orbit/orbit.service';
import { OrbitSimulatorComponent } from './orbit-simulator/orbit-simulator.component';
import { AnimationStateService } from './ngrx/animation/animation.service';
import { animationStateReducer } from './ngrx/animation/animation.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { environment } from '../environments/environment';
import { LawStateService } from './ngrx/law/law.service';
import { lawStateReducer } from './ngrx/law/law.reducer';
import { LawSettingsComponent } from './side-nav/law-settings/law-settings.component';
import { FirstLawSettingsComponent } from './side-nav/law-settings/first-law-settings/first-law-settings.component';
import { EffectsModule } from '@ngrx/effects';
import { LawStateEffects } from './ngrx/law/law.effects';
import { SecondLawSettingsComponent } from './side-nav/law-settings/second-law-settings/second-law-settings.component';
import { ThirdLawSettingsComponent } from './side-nav/law-settings/third-law-settings/third-law-settings.component';
import { OrbitSettingsComponent } from './side-nav/orbit-settings/orbit-settings.component';
import { AnimationSettingsComponent } from './side-nav/animation-settings/animation-settings.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponentComponent,
    SideNavComponent,
    OrbitSimulatorComponent,
    LawSettingsComponent,
    FirstLawSettingsComponent,
    SecondLawSettingsComponent,
    ThirdLawSettingsComponent,
    OrbitSettingsComponent,
    AnimationSettingsComponent,
    HelpDialogComponent
  ],
  imports: [
    BrowserModule,


    StoreModule.forRoot({
      law: lawStateReducer,
      orbit: orbitStateReducer,
      animation: animationStateReducer
    }),

    EffectsModule.forRoot([LawStateEffects]),


    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })
    : [],

    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [ OrbitStateService, AnimationStateService, LawStateService],
  entryComponents: [ HelpDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
