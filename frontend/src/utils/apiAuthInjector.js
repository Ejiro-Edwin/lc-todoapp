import { CALL_API } from 'redux-api-middleware'
import { authConstants } from '../constants/auth'


export const authLocalManager = store => next => action => {
  if ( action.type === authConstants.LOGOUT ||
      (action.payload &&
        (action.payload.status === 401 || action.payload.status === 403)
      )
  ) {
    console.log('auth')
    localStorage.removeItem('lctodo_token')
    action.type = authConstants.LOGOUT
  } 
  return next(action)
  

  
}

export const apiAuthHeader = store => next => action => {
  const callApi = action[CALL_API]
  if (callApi) {
    console.log('header')
  	const token = localStorage.getItem('lctodo_token') || ''
    callApi.headers = Object.assign({}, callApi.headers)
    callApi.headers['Authorization'] = `Bearer ${token}`
  }
  return next(action)
}

export default {
	apiAuthHeader,
	authLocalManager
}