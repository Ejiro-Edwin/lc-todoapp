import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import App from './App';
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';
import './css/index.css';

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