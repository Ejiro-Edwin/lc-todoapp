import { tasksConstants } from '../constants/tasks';
import initialState from './initialState';


export default function tasks(state = initialState.tasks, action) {
  switch (action.type) {
    case tasksConstants.FETCH_TODOTASKS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case tasksConstants.FETCH_TODOTASKS_SUCCESS:
      return {
        isFetching: false,
        data: action.payload
      }
    case tasksConstants.FETCH_TODOTASKS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    case tasksConstants.UPDATE_TASK_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case tasksConstants.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        data: state.data.map( todo => { 
          if(todo.id === action.payload.id){
            return action.payload
          } 
          return todo
        })
      }

    case tasksConstants.UPDATE_TASK_FAILURE:
      return{
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
