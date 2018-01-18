import { RSAA, getJSON } from 'redux-api-middleware';
import { authConstants } from '../constants/auth';
import { history } from '../index';

export const login = (parameters) => ({
    [RSAA]: {
      types: [
          authConstants.LOGIN_REQUEST, 
          authConstants.LOGIN_SUCCESS, 
          {
            type: authConstants.LOGIN_FAILURE,
            meta: (action, state, res) => ({errorMessage: "Login ou Senha incorretos, tente novamente"})
          }
        ],
      endpoint: '/api/v1/auth/obtain_token/',
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' },
      body: JSON.stringify(parameters)
    }
  });

  export const forgotPassword = (parameters) => ({
    [RSAA]: {
      types: [
          authConstants.FORGOT_PASSWORD_REQUEST, 
          {
            type: authConstants.FORGOT_PASSWORD_SUCCESS,
            payload: (action, state, res) => {
              return res.json().then(json => {
                history.push('/auth/forgot-password-done');
                return json;
              });
            },
          },
          authConstants.FORGOT_PASSWORD_FAILURE,
        ],
      endpoint: `/api-auth/forgot/?email=${parameters.email}`,
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json' }
    }
  });
  
  export const recoverPassword = (parameters) => ({
    [RSAA]: {
      types: [
          authConstants.RECOVER_PASSWORD_REQUEST, 
          {
            type: authConstants.RECOVER_PASSWORD_SUCCESS,
            meta: (action, state, res) => {
                history.push('/auth/login');
                return {successMessage: "Nova senha criada com sucesso"}
            },
          },
          {
            type: authConstants.RECOVER_PASSWORD_FAILURE,
            meta: {errorMessage: "Dados invalidos"},
          }
        ],
      endpoint: '/api-auth/reset/',
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' },
      body: JSON.stringify(parameters)
    }
  });

  export const signup = (parameters) => {
    var body = new FormData()
    
    for (var name in parameters) {
      body.append(name, parameters[name])
    }
    return { 
      [RSAA]: {
      types: [
          authConstants.SIGNUP_REQUEST, 
          {
            type: authConstants.SIGNUP_SUCCESS,
            payload: () => {
                history.push('/auth/login');
              }
            }
          ,{
            type: authConstants.SIGNUP_FAILURE,
            payload: (action, state, res) =>
              res.then(json => console.log(json)), // THIS WILL GIVE YOU DATA FROM FAILURE RESPONSE
            meta: (action, state, res) => {
              return res.json().then(json => {
                return {errorMessage: Object.values(json)? Object.values(json)[0]: json }
              });
            },
          }
        ],
      endpoint: '/api/v1/users/',
      method: 'POST',
      headers: { 
         },
      body: body
    }
  }
  };

  export const logout = () => ({
    type: authConstants.LOGOUT,
  });