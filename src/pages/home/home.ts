import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../../store/reducers/root.reducers';
import { LOGOUT } from '../../../store/actions/auth.actions';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private ngRedux: NgRedux<AppState>) {

  }

  logout() {
    this.ngRedux.dispatch({
      type: LOGOUT
    })
    this.navCtrl.push(LoginPage)
  }


}
