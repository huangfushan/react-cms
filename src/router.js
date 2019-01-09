/**
 * 路由配置入口，带优化（权限分配）
 * @Author: huangfs
 * @Date: 2019-01-09
 * @Project: cms
 */

import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import LoadingComponent from './components/common/LoadingComponent';
import { getStorage } from './utils';
import { C_STORAGE } from './common/constants';
import http from './api/http';
import { Actions } from './redux/actions';
import App from './layout/App';
import routerConfig from './routerConfig';
import PrivateRoute from './components/common/privateRoute';
import 'normalize.css';
import './themes/index.less';

//登录
const Login = Loadable({
  loader: () => import('./page/Login'),
  loading: LoadingComponent,
  delay: 100
});

// const GoodsList = Loadable({
//   loader: () => import('./page/example/GoodsList'),
//   loading: LoadingComponent,
//   delay: 100
// });
// const OrderList = Loadable({
//   loader: () => import('./page/example/OrderList'),
//   loading: LoadingComponent,
//   delay: 100
// });
const NotFound = Loadable({
  loader: () => import('./components/common/NotFound'),
  loading: LoadingComponent,
  delay: 100
});

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  {
    updateAuth: Actions.auth.updateAuth
  }
)
export default class Routers extends React.Component {
  static propTypes = {
    updateAuth: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const auth = JSON.parse(getStorage(C_STORAGE.KEY_AUTH));
    if (auth && auth.session) {
      http.setHeader(C_STORAGE.KEY_SESSION, auth.session);
      this.props.updateAuth(auth);
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <App>
            <Switch>
              {/*<Route exact path="/" component={DndExample} />*/}
              {/*<Route exact path="/statistics" component={Statistics} />*/}
              {/*<Route exact path="/manager/goods" component={GoodsList} />*/}
              {/*<Route exact path="/manager/order" component={OrderList} />*/}
              {/*<Route exact path="/manager/order/:id" component={NotFound} />*/}
              {/*<Route exact path="/setting" component={NotFound} />*/}
              {
                routerConfig.map((item, index) => <PrivateRoute exact key={index} path={item.path} component={item.component} />)
              }
              <Route component={NotFound} />
            </Switch>
          </App>
        </Switch>
      </Router>
    );
  }
}
