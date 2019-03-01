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
import { getStorage } from './utils';
import { C_STORAGE } from './common/constants';
import http from './api/http';
import { Actions } from './redux/actions';
import routerConfig from './routerConfig';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'normalize.css';
import './themes/index.less';

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
      http.setHeader(C_STORAGE.SESSION, auth.session);
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
            {routerConfig.map((item, index) => {
              if (!item.layout) return null;
              return <Route key={index} path={item.path} component={item.layout} />;
            })}
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}
