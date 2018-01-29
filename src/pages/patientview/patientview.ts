import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../../store/reducers/root.reducers';
import { LOGOUT } from '../../../store/actions/auth.actions';
import { ADD_PATIENT,GET_PATIENT, SET_DATA_LOCALLY,DELETE } from '../../../store/actions/patient.actions';
import { Observable } from 'rxjs/Observable';
import { PatientdetailsPage } from '../../pages/patientdetails/patientdetails';
import { PatientEpic } from '../../../store/epics/patient.epics';
import { Http, Headers } from "@angular/http";

// import { Router } from '@angular/router';
// import { Route } from '@angular/compiler/src/core';

/**
 * Generated class for the PatientviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patientview',
  templateUrl: 'patientview.html',
})
export class PatientviewPage {
  hey: any;
  selectedItem: any;
  selectedIndex: number;
  
  constructor(public navCtrl: NavController, navParams: NavParams,
		private fb: FormBuilder,
		private http: Http,
		private ngRedux: NgRedux<AppState>) {

      (this.ngRedux.getState());
      // this.selectedItem = navParams.get('item');
      this.hey=navParams.get('param1');
      console.log(this.hey)
      // this.selectedItem = navParams.get('param1'); 
      // this.selectedIndex = navParams.get('ndex')
    }
    


  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientviewPage');
  }

  

  // back() {
  //   this.router.navigate(['/patientdetails']);
  // }
  
  back() {
    this.navCtrl.push(PatientdetailsPage);
  }

  deletepatient(deletepatient) {
    (deletepatient);
    this.ngRedux.dispatch({
      type: DELETE,
      payload: deletepatient,
      navCtrl: () => this.navCtrl.pop()
    })
  }


}
