import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth.js'
import notifications from './notifications.js';
import todolists from './todolists';
import tasks from './tasks';

export default combineReducers({
  auth: auth,
  todolists: todolists,
  tasks: tasks,
  notifications: notifications,
  router: routerReducer
})
