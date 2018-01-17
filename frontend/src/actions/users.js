import { RSAA } from 'redux-api-middleware';
import { usersConstants } from '../constants/users';

export const fetchUsers = () => ({
    [RSAA]: {
      types: [
          usersConstants.USERS_REQUEST, 
          usersConstants.USERS_SUCCESS, 
          usersConstants.USERS_FAILURE
        ],
      endpoint: '/api/v1/users/',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  });
