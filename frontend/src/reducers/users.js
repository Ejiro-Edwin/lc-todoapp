



import { usersConstants } from '../constants/users';
import initialState from './initialState';

export default function users(state = initialState.users, action) {
  switch (action.type) {
    case usersConstants.USERS_REQUEST:
      return {
        isFetching: true,
        data: [],
      };
    case usersConstants.USERS_SUCCESS:
      return {
        isFetching: false,
        data: action.payload
      };
    case usersConstants.USERS_FAILURE:
      return {
        isFetching: false,
        data: []
      };
    default:
      return state
  }
}