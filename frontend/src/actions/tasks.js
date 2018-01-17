import { RSAA } from 'redux-api-middleware';
import { tasksConstants } from '../constants/tasks';

export const fetchTodoTasks = (todoListId) => ({
	[RSAA]: {
	  types: [
		  tasksConstants.FETCH_TODOTASKS_REQUEST, 
		  tasksConstants.FETCH_TODOTASKS_SUCCESS, 
		  tasksConstants.FETCH_TODOTASKS_FAILURE, 
		],
	  endpoint: `/api/v1/todolists/${todoListId}/tasks/`,
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
		  {
			type: tasksConstants.UPDATE_TASK_SUCCESS,
			meta: (action, state, res) => ({ successMessage: "Task atualizada" })
		  },
		  tasksConstants.UPDATE_TASK_FAILURE, 
		],
	  endpoint: `/api/v1/tasks/${parameters.id}/`,
	  method: 'PATCH',
	  headers: { 
		'Content-Type': 'application/json' 
	 },
	 body: JSON.stringify(parameters)
	}
  });

export const createTask = (parameters) => ({
	[RSAA]: {
	  types: [
		  tasksConstants.CREATE_TASK_REQUEST, 
		  {
			type: tasksConstants.CREATE_TASK_SUCCESS,
			meta: (action, state, res) => ({ successMessage: "Task adicionada" })
		  },
		  tasksConstants.CREATE_TASK_FAILURE, 
		],
	  endpoint: `/api/v1/tasks/`,
	  method: 'POST',
	  headers: { 
		'Content-Type': 'application/json' 
	 },
	 body: JSON.stringify(parameters)
	}
});