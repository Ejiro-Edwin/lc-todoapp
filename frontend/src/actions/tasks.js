import { RSAA } from 'redux-api-middleware';
import { tasksConstants } from '../constants/tasks';

export const fetchTodoTasks = (todoListId) => ({
    [RSAA]: {
      types: [
          todoListConstants.FETCH_TODOTASKS_REQUEST, 
          todoListConstants.FETCH_TODOTASKS_SUCCESS, 
          todoListConstants.FETCH_TODOTASKS_FAILURE, 
        ],
      endpoint: `http://localhost:8000/api/v1/todolists/${todoListId}`,
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json' 
     }
    }
  });