import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom';

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

const store = configureStore(initialState)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();