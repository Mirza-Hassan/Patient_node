import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../../store/reducers/root.reducers';
import { LOGOUT,GET_DATA_LOCALLY } from '../../../store/actions/auth.actions';
import { ADD_PATIENT,GET_PATIENT, SET_DATA_LOCALLY } from '../../../store/actions/patient.actions';
import { Observable } from 'rxjs/Observable';
import { PatientviewPage } from '../../pages/patientview/patientview';
import { LoginPage } from '../login/login';
import { PatientEpic } from '../../../store/epics/patient.epics';

// import { Router } from '@angular/router';
// import { Route } from '@angular/compiler/src/core';

/**
 * Generated class for the PatientdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientdetails',
  templateUrl: 'patientdetails.html',
})
export class PatientdetailsPage {
  patientform: FormGroup
  patientData = [];
 
  @select((s: AppState) => s.patient.patientData) patientData$: Observable<Array<any>>;
  @select((s: AppState)=> s.auth.userData) userData$: Observable<object>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private fb: FormBuilder,private ngRedux: NgRedux<AppState>) {

		this.ngRedux.dispatch({
			type: GET_PATIENT
		})

    this.patientform = this.fb.group({
      patientName: [null, Validators.required],
      patientAge: [null, Validators.required],
      contactNo: [null, Validators.required],
      diseases: [null, Validators.required],
      gender:[null, Validators.required],
      date: [null, Validators.required],
      // description:[null, Validators.required],
      // patientAddress: [null, Validators.required],
      // email: [null, Validators.required],
      // medicine: [null, Validators.required],
      // time: [null, Validators.required],
    });
    this.patientData$.subscribe((data) => {

			this.patientData = data
    })
    
    this.userData$.subscribe((data)=> {
      (data);
      if(data) {
        this.ngRedux.dispatch({
          type: SET_DATA_LOCALLY,
          payload:data
        })
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientdetailsPage');
  }

  logout() {
    this.ngRedux.dispatch({
      type: LOGOUT
    })
    this.navCtrl.push(LoginPage)
  }

  hey={};
  addPatient() {
    (this.patientform.value);
    this.ngRedux.dispatch({
      type: ADD_PATIENT,
      payload: this.patientform.value,
    })
    this.hey=this.patientform.value;
    console.log(this.hey);
    this.patientform.reset();

  }


	// itemTapped(item, index) {

	// 	this.navCtrl.push(PatientviewPage, {
	// 		item,
	// 		index
	// 	})
	// }

  // view() {
  //   this.router.navigate(['/patientview']);
  // }

  patientview() {
    this.navCtrl.push(PatientviewPage,{
      
    param1: this.hey
    });
  }
  // view(data) {
  //   (this.patientform.value);
  //   this.ngRedux.dispatch({
  //     type: SET_DATA_LOCALLY,
  //     payload:data
  //   })
  // }



}
