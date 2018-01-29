import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PatientdetailsPage } from '../pages/patientdetails/patientdetails';
import { PatientviewPage } from '../pages/patientview/patientview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { combineReducers } from 'redux';
import { RootReducer, AppState, INITIAL_STATE } from '../../store/reducers/root.reducers'
import { createEpicMiddleware } from 'redux-observable';
import { AuthEpic } from '../../store/epics/auth.epics';
import { PatientEpic } from '../../store/epics/patient.epics';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    PatientdetailsPage,
    PatientviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserModule,
    FormsModule,
    NgReduxModule,
    ReactiveFormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    PatientdetailsPage,
    PatientviewPage
  ],
  providers: [AuthEpic,PatientEpic,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>,private authepic: AuthEpic, private patientepic: PatientEpic) {
    const middleware = [
      createEpicMiddleware(this.authepic.signup),
      createEpicMiddleware(this.authepic.login),
      createEpicMiddleware(this.authepic.logout),
      createEpicMiddleware(this.authepic.getDataLocal),
      createEpicMiddleware(this.patientepic.addpatient),
      createEpicMiddleware(this.patientepic.deletepatient),
      createEpicMiddleware(this.patientepic.getpatient),
      createEpicMiddleware(this.patientepic.setDataLocally),
    ]
    ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
  }
 }
