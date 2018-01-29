import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Http, Headers } from '@angular/http';

import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../reducers/root.reducers';

import { ADD_PATIENT, ADD_PATIENT_SUCCESS, DELETE,
    DELETE_SUCCESS,GET_PATIENT,GET_PATIENT_SUCCESS,
   SET_DATA_LOCALLY,LOCAL_DATA_SUCCESS } from "../actions/patient.actions";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class PatientEpic {
    patientArray = [];
    currentUserId: String;
    @select((s:AppState)=> s.patient.patientData) patientData$ : Observable<Array<any>>;
    constructor(private ngRedux: NgRedux<AppState>, private http: Http) {}

    setDataLocally = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(SET_DATA_LOCALLY)
        .switchMap(({payload})=> {
            localStorage.setItem('token', payload._id)
            return Observable.of()
        })
    }

    getpatient = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(GET_PATIENT)
        .switchMap(({payload})=> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let currentUserId = localStorage.getItem('token');
            return this.http.get('http://localhost:3000/hospital/patient/' + currentUserId, {headers: headers})
            .switchMap(res => {
                return Observable.of({type: GET_PATIENT_SUCCESS, payload: res.json()})
            })
        })
    }

    addpatient = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(ADD_PATIENT)
        .switchMap(({payload})=> {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.currentUserId = localStorage.getItem('token')
            payload.id = this.currentUserId
            return this.http.post('http://localhost:3000/hospital/patient', JSON.stringify(payload), {headers:headers})
            .switchMap(res => {
                this.patientArray.push(res.json())
                this.ngRedux.dispatch({
                    type: GET_PATIENT
                })
                return Observable.of({type: ADD_PATIENT_SUCCESS})
            })
        })
    }

    deletepatient = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(DELETE)
        .switchMap(({payload})=> {
            return this.http.delete('http://localhost:3000/hospital/patient' + payload._id)
            .switchMap((res)=> {
                if(res) {
                    return Observable.of({type: DELETE_SUCCESS, payload: res.json()})
                }
            })
        })
    }
}