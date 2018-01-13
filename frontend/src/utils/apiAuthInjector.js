import {  RSAA, FSA } from 'redux-api-middleware';
import { logout } from '../actions/auth';

export default store => next => action => {
  const callApi = action[RSAA]
  // Check if this action is a redux-api-middleware action.
  if (callApi) {
    // Inject the Authorization header from localStorage.
    callApi.headers = Object.assign({}, callApi.headers, {
      "Authorization": "Bearer " + localStorage.getItem('lctodo_token') || '',
      "Accept-Language": 'pt-br'
    });
    const nextAction = {
      [RSAA]: callApi
    };
  
    return next(nextAction).then((data) => {
      if (data.payload && data.payload.name === 'ApiError' && data.payload.status === 401) {
        return store.dispatch(logout())
      }
      return data;
    });
  }

  
  // Pass the FSA to the next action.
  return next(action)

}
