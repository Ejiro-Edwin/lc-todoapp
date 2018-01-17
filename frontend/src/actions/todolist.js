import { RSAA } from 'redux-api-middleware';
import { todoListConstants } from '../constants/todolists';
import { push } from 'react-router-redux';


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

export const createTodo = (parameters) => ({
	[RSAA]: {
	  types: [
		  todoListConstants.CREATE_TODO_REQUEST, 
		  {
			type: todoListConstants.CREATE_TODO_SUCCESS,
			meta: (action, state, res) => ({ successMessage: "To-do adicionada" })
		  },
		  todoListConstants.CREATE_TODO_FAILURE, 
		],
	  endpoint: `http://localhost:8000/api/v1/todolists/`,
	  method: 'POST',
	  headers: { 
		'Content-Type': 'application/json' 
	 },
	 body: JSON.stringify(parameters)
	}
});

export const updateTodo = (parameters) => ({
	[RSAA]: {
	  types: [
		  todoListConstants.UPDATE_TODO_REQUEST, 
		  {
				type: todoListConstants.UPDATE_TODO_SUCCESS,
				meta: (action, state, res) => ({ successMessage: "To-do modificada" })
		  },
		  todoListConstants.UPDATE_TODO_FAILURE, 
		],
	  endpoint: `http://localhost:8000/api/v1/todolists/${parameters.id}/`,
	  method: 'PATCH',
	  headers: { 
		'Content-Type': 'application/json' 
	 },
	 body: JSON.stringify(parameters)
	}
 });

 export const deleteTodo = (todoId) => ({
		[RSAA]: {
			types: [
				todoListConstants.DELETE_TODO_REQUEST, 
				{
					type: todoListConstants.DELETE_TODO_SUCCESS,
					payload: (action, state, res) => ({ id: todoId })
				},
				todoListConstants.DELETE_TODO_FAILURE, 
			],
			endpoint: `http://localhost:8000/api/v1/todolists/${todoId}/`,
			method: 'DELETE',
			headers: { 
				'Content-Type': 'application/json' 
			}
		}
	})

export const toggleDialogTodo = (visible, edit = false) => ({
	type: todoListConstants.TOGGLE_DIALOG_TODO,
	visible,
	edit
})

export const toggleTodoDeleteDialog = (visible) => ({
	type: todoListConstants.TOGGLE_TODO_DELETE_DIALOG,
	visible
})