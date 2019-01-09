import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import * as serviceWorker from './serviceWorker';
import App from './router';
import store from './redux';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
