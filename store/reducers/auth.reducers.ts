import { tassign } from 'tassign';
import { SIGNUP_SUCCESS, LOGIN_SUCCESS } from '../actions/auth.actions';

export interface AuthState {
    userData: Object;
}

export const AUTH_INITIAL_STATE = {
    userData: null
}

export const AuthReducer = (state: AuthState = AUTH_INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGNUP_SUCCESS:
            return tassign({userDate: action.payload});
        case LOGIN_SUCCESS:
            return tassign({useData: action.payload})
        default:
            return state
    }

}