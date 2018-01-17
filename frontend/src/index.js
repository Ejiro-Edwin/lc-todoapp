import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';

import './css/index.css';
import App from './App';
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker';
import initialState from './reducers/initialState';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

export const history = createHistory()


export const store = configureStore(history)



ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();

export default {
  history,
  store
}