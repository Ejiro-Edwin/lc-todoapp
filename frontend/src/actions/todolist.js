import { RSAA } from 'redux-api-middleware';
import { todoListConstants } from '../constants/todolists';

export const fetchTodoLists = () => ({
    [RSAA]: {
      types: [
          todoListConstants.FETCH_TODOLISTS_REQUEST, 
          todoListConstants.FETCH_TODOLISTS_SUCCESS, 
          todoListConstants.FETCH_TODOLISTS_FAILURE, 
        ],
      endpoint: 'http://localhost:8000/api/v1/todolists/',
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json' 
     }
    }
  });