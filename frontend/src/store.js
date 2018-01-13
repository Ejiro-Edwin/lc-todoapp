import { createStore, applyMiddleware, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { auth } from './reducers/auth';
import { notifications } from './reducers/notifications';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiAuthInjector from './utils/apiAuthInjector'; 
import rootReducer from './reducers';

export default (history) => {

  const reducer = persistReducer(
    {
      key: 'root',
      storage: storage,
      whitelist: ['auth'],
    },
    rootReducer
  );

  // custom middleware.

  const store = createStore(
    reducer,
    applyMiddleware(apiAuthInjector, apiMiddleware)
  )

  persistStore(store);
  return store;
}