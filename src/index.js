import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import 'babel-polyfill';
import * as serviceWorker from './serviceWorker';
import App from './router';
import store from './redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { I18nProvider } from './i18n/I18nConfig';

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <I18nProvider currentLanguage='cn'>
        <App />
      </I18nProvider>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
