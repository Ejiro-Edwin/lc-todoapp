import { tasksConstants } from '../constants/tasks';
import initialState from './initialState';
// let user = JSON.parse(localStorage.getItem('user'));


export default function tasks(state = initialState.tasks, action) {
  switch (action.type) {
    case tasksConstants.FETCH_TODOTASKS_REQUEST:
      return {
          isFetching: true,
          data: []
      }
    case tasksConstants.FETCH_TODOTASKS_SUCCESS:
      return {
        isFetching: false,
        data: action.payload
      }
    case tasksConstants.FETCH_TODOTASKS_FAILURE:
      return {
        isFetching: false,
        data: []
      }
    default:
      return state
  }
}
