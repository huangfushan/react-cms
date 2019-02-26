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

  // 需要获取网络请求，拿到badge
  componentWillMount() {
    const auth = JSON.parse(getStorage(C_STORAGE.KEY_AUTH));
    if (auth && auth.session) {
      http.setHeader(C_STORAGE.KEY_SESSION, auth.session);
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
              return item.layout ? (
                <Route key={index} path={item.path} component={item.layout} />
              ) : null;
            })}
            {/* 根路由默认重定向到 /dashboard */}
            {/*<Redirect exact from="/" to="/dashboard" />*/}
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}
