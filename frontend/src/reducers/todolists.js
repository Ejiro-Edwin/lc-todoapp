import { todoListConstants } from '../constants/todolists';
import initialState from './initialState';

export default function todolists(state = initialState.todolists, action) {
  switch (action.type) {
    case todoListConstants.FETCH_TODOLISTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case todoListConstants.FETCH_TODOLISTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case todoListConstants.FETCH_TODOLISTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case todoListConstants.CREATE_TODO_REQUEST:
      return {
        ...state,
        isFetching: false
      }
    case todoListConstants.CREATE_TODO_SUCCESS:
      return {
        ...state,
        isFetching: true,
        data: state.data.concat(action.payload)
      }
    case todoListConstants.CREATE_TODO_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case todoListConstants.TOGGLE_DIALOG_TODO:
      return {
        ...state,
        isTodoDialogOpen: action.visible,
        edit: action.edit
      }
    case todoListConstants.TOGGLE_TODO_DELETE_DIALOG:
      return {
        ...state,
        isDeleteTodoDialogOpen: action.visible
      }
    case todoListConstants.UPDATE_TODO_REQUEST:
      return{
        ...state,
        isFetching: true,
      }
    case todoListConstants.UPDATE_TODO_SUCCESS:
      return{
        ...state,
        isFetching: false,
        data: state.data.map( todo => { 
          if(todo.id === action.payload.id){
            return action.payload
          } 
          return todo
        })
      }
    case todoListConstants.UPDATE_TODO_FAILURE:
      return{
        ...state,
        isFetching: false,
      }
    case todoListConstants.DELETE_TODO_REQUEST:
      return {
        ...state,
        isFetching: false,
      }
    case todoListConstants.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: state.data.filter(todo => todo.id.toString() !== action.payload.id)
      }
    case todoListConstants.DELETE_TODO_FAILURE:
      return {
        ...state,
        isFetching: false,
        data: []
      }
    default:
      return state
  }
}