import { CALL_API } from 'redux-api-middleware'
import { authConstants } from '../constants/auth'
import { logout } from '../actions/auth';


export const authLocalManager = store => next => action => {
  if (action.payload && (action.payload.status === 401 || action.payload.status === 403)) {
      let errorMessage = "Sessão expirada, por favor faça login novamente";
      
      localStorage.removeItem('lctodo_token')
        
      return next({
        type: authConstants.LOGOUT,
        errorMessage
      })
  } 
  return next(action)
}

export const apiAuthHeader = store => next => action => {
  const callApi = action[CALL_API]
  if (callApi) {
  	const token = localStorage.getItem('lctodo_token')
    if(token){
      callApi.headers = Object.assign({}, callApi.headers)
      callApi.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return next(action)
}

export default {
	apiAuthHeader,
	authLocalManager
}