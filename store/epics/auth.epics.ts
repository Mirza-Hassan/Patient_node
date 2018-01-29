import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';
// import { Router } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../reducers/root.reducers';
import { SIGNUP, SIGNUP_SUCCESS, LOGIN, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, GET_DATA_LOCALLY} from '../actions/auth.actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class AuthEpic {
    constructor(private http: Http) {}

    signup = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(SIGNUP)
        .switchMap(({payload})=> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json')
            return this.http.post('http://localhost:3000/auth/signup', payload, {headers:headers})
            .switchMap(res => {
                if(res.status == 303) {

                }
                else {
                    // this.router.navigate(['/login']);
                    return Observable.of({type: SIGNUP_SUCCESS, payload: res.json()})
                }
            });
        })
    }

    login = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(LOGIN)
        .switchMap(({payload})=> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.post('http://localhost:3000/auth/login', payload, {headers: headers})
            .switchMap(res => {
                if(res.status == 404) {

                }
                // this.router.navigate(['/patientdetails']);
                return Observable.of({type: LOGIN_SUCCESS, payload: res.json()})
            })
        })
    }

    logout = (action$: ActionsObservable<any>) => {
        return action$.ofType(LOGOUT)
        .switchMap(({payload})=> {
            localStorage.removeItem('token')
            // this.router.navigate(['/login']);
            return Observable.of({type: LOGOUT_SUCCESS})
        })
    }

    getDataLocal = (action$: ActionsObservable<any>) => {
        return action$.ofType(GET_DATA_LOCALLY)
        .switchMap(({payload})=> {
            if(localStorage.getItem('token')) {
                // this.router.navigate(['/patientdetails']);
            }
            return Observable.of()
        })
    }

}