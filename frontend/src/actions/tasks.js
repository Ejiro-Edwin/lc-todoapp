import { RSAA } from 'redux-api-middleware';
import { tasksConstants } from '../constants/tasks';

export const fetchTodoTasks = (todoListId) => ({
    [RSAA]: {
      types: [
          tasksConstants.FETCH_TODOTASKS_REQUEST, 
          tasksConstants.FETCH_TODOTASKS_SUCCESS, 
          tasksConstants.FETCH_TODOTASKS_FAILURE, 
        ],
      endpoint: `http://localhost:8000/api/v1/todolists/${todoListId}/tasks/`,
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json' 
     }
    }
  });

export const updateTask = (parameters) => ({
    [RSAA]: {
      types: [
          tasksConstants.UPDATE_TASK_REQUEST, 
          tasksConstants.UPDATE_TASK_SUCCESS, 
          tasksConstants.UPDATE_TASK_FAILURE, 
        ],
      endpoint: `http://localhost:8000/api/v1/tasks/${parameters.id}/`,
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json' 
     },
     body: JSON.stringify(parameters)
    }
  });