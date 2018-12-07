import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import * as serviceWorker from './serviceWorker';
import Routers from './Routers';
import store from './redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
  <Provider store={ store }>
    <LocaleProvider locale={ zhCN }>
      <Routers/>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
