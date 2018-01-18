import { tasksConstants } from '../constants/tasks';
import initialState from './initialState';


export default function tasks(state = initialState.tasks, action) {
  switch (action.type) {
    case tasksConstants.FETCH_TODOTASKS_REQUEST || tasksConstants.FETCH_TODAYTASKS_REQUEST:
      return {
        ...state,
        isFetching: true,
        data: []
      }
    case tasksConstants.FETCH_TODOTASKS_SUCCESS  || tasksConstants.FETCH_TODAYTASKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case tasksConstants.FETCH_TODOTASKS_FAILURE || tasksConstants.FETCH_TODAYTASKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        data: []
      }
      case tasksConstants.FETCH_ALLTASKS_REQUEST:
        return {
          ...state,
          isFetching: true,
        }
      case tasksConstants.FETCH_ALLTASKS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          allTasksData: action.payload
        }
      case tasksConstants.FETCH_ALLTASKS_FAILURE:
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
        data: state.data.map( task => { 
          if(task.id === action.payload.id){
            return action.payload
          } 
          return task
        })
      }
    case tasksConstants.UPDATE_TASK_FAILURE:
      return{
        ...state,
        isFetching: false,
      }
    case tasksConstants.CREATE_TASK_REQUEST:
      return{
        ...state,
        isFetching: true,
      }  
    case tasksConstants.CREATE_TASK_SUCCESS:
      return{
        ...state,
        data: state.data.concat(action.payload)
      }  
    case tasksConstants.CREATE_TASK_FAILURE:
      return{
        ...state,
        isFetching: false
      }  
    default:
      return state
  }
}
