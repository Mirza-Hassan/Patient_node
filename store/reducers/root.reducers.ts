import { combineReducers } from 'redux';
import { AuthState,AUTH_INITIAL_STATE,AuthReducer } from '../reducers/auth.reducers';
import { PatientState, PATIENT_INITIAL_STATE, PatientReducer } from '../reducers/patient.reducers';

export interface AppState {
    auth: AuthState,
    patient: PatientState
}

export const INITIAL_STATE = {
    auth: AUTH_INITIAL_STATE,
    patient: PATIENT_INITIAL_STATE
}

export const RootReducer = combineReducers<AppState>({
    auth: AuthReducer,
    patient:  PatientReducer
})