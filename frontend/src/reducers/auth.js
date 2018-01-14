import { authConstants } from '../constants/auth';
import initialState from './initialState';
// let user = JSON.parse(localStorage.getItem('user'));


export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case authConstants.LOGIN_SUCCESS:
      localStorage.setItem('lctodo_token', action.payload.access);
      return {
        loggingIn: false,
        isAuthenticated: true,
        token: action.payload.access
      };
    case authConstants.LOGIN_FAILURE:
      localStorage.removeItem('lctodo_token');
      return {
        loggingIn: false,
        isAuthenticated: false,
        token: ''
      };
    case authConstants.LOGOUT:
      localStorage.removeItem('lctodo_token');
      return {
        loggingIn: false,
        isAuthenticated: false,
        token: ''
      };
    default:
      return state
  }
}