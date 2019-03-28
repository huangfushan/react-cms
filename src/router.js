/**
 * 路由配置入口，带优化（权限分配）
 * @Author: huangfs
 * @Date: 2019-01-09
 * @Project: cms
 */

import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { connect } from 'react-redux';
import LoadingComponent from './components/common/LoadingComponent';
import Loadable from 'react-loadable';
import { getStorage } from './utils';
import { C_SESSION, C_STORAGE } from './common/constants';
import http from './api/http';
import { Actions } from './redux/actions';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'normalize.css';
import './themes/index.less';

moment.locale('zh-cn');

const CenterLayout = Loadable({
  loader: () => import('./layouts/CenterLayout'),
  loading: LoadingComponent,
  delay: 100
});

const HeaderAsideLayout = Loadable({
  loader: () => import('./layouts/HeaderAsideLayout'),
  loading: LoadingComponent,
  delay: 100
});

@connect(
  state => ({
    language: state.env.language
  }),
  {
    updateAuth: Actions.auth.updateAuth,
    updateLanguage: Actions.env.update,
  }
)
export default class Routers extends React.Component {

  componentWillMount() {
    const auth = getStorage(C_STORAGE.AUTH) && JSON.parse(getStorage(C_STORAGE.AUTH));
    if (auth && auth.session) {
      http.setHeader(C_SESSION, auth.session);
      this.props.updateAuth(auth);
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateLanguage({ language: 'en' });
    }, 10000);
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path='/login' component={CenterLayout} />
            <Route path='/password/forget' component={CenterLayout} />
            <Route path='/register' component={CenterLayout} />
            <Route path='/' component={HeaderAsideLayout} />
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}
