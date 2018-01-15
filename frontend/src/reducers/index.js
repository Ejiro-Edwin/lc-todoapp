import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth.js'
import notifications from './notifications.js';
import todolists from './todolists';
import tasks from './tasks';
import users from './users';
import {reducer as formReducer} from "redux-form";

export default combineReducers({
  auth,
  todolists,
  tasks,
  notifications,
  users,
  router: routerReducer,
  form: formReducer
})
