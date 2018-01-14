import { todoListConstants } from '../constants/todolists';
import initialState from './initialState';

export default function todolists(state = initialState.todolists, action) {
  switch (action.type) {
    case todoListConstants.FETCH_TODOLISTS_REQUEST:
      return {
        isFetching: true,
        data: [],
      };
    case todoListConstants.FETCH_TODOLISTS_SUCCESS:
      return {
        isFetching: false,
        data: action.payload
      };
    case todoListConstants.FETCH_TODOLISTS_FAILURE:
      console.log(action)
      return {
        isFetching: false,
        data: []
      };
    default:
      return state
  }
}