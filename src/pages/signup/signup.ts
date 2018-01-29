import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../../store/reducers/root.reducers';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SIGNUP } from '../../../store/actions/auth.actions';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, private ngRedux: NgRedux<AppState>
  ) {
    this.signupForm = this.fb.group({
      // userName: ['', Validators.required],
      userEmail: ['', Validators.compose([Validators.required])],
      userPassword: ['', Validators.compose([Validators.minLength(6),Validators.required])]
    })

  }

  signup() {
    this.ngRedux.dispatch({
      type: SIGNUP,
      payload: this.signupForm.value
    })
    this.signupForm.reset
    this.navCtrl.push(LoginPage)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  login(){
    this.navCtrl.push(SignupPage)
  }

}
