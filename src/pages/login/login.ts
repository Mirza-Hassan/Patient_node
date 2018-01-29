import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../../store/reducers/root.reducers';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LOGIN, GET_DATA_LOCALLY } from '../../../store/actions/auth.actions';
import { SignupPage } from '../../pages/signup/signup';
import { HomePage } from '../../pages/home/home';
import { PatientdetailsPage } from '../../pages/patientdetails/patientdetails';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, private ngRedux: NgRedux<AppState>
  ) {
    this.ngRedux.dispatch({
      type: GET_DATA_LOCALLY,
    });

    this.loginForm = this.fb.group({
      userEmail: [null, Validators.compose([Validators.required]) ],
      userPassword: [null, Validators.compose([Validators.minLength(6),Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.ngRedux.dispatch({
      type: LOGIN,
      payload: this.loginForm.value
    })
    this.loginForm.reset()
    this.navCtrl.push(PatientdetailsPage)
  }

  register(){
    this.navCtrl.push(SignupPage)
  }
}
