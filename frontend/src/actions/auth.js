import { RSAA } from 'redux-api-middleware';
import { authConstants } from '../constants/auth';

export const login = (email, password) => ({
    [RSAA]: {
      types: [
          authConstants.LOGIN_REQUEST, 
          authConstants.LOGIN_SUCCESS, 
          {
            type: authConstants.LOGIN_FAILURE,
            payload: (action, state, res) => ({error: "Login ou Senha incorretos, tente novamente"})
          }
        ],
      endpoint: 'http://localhost:8000/api/v1/auth/obtain_token/',
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})
    }
  });

  export const logout = (errorMsg) => ({
    type: authConstants.LOGOUT,
  });