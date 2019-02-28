/**
 * 居中布局 （内容 + 底部）
 * @Author: huangfs
 * @Date: 2019-02-26
 * @Project: cms
 */

import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from 'react-router-dom';
import Copyright from '../../components/common/Copyright';
import routerConfig from '../../routerConfig';
import PrivateRoute from '../../components/common/PrivateRoute';
import LoadingComponent from '../../components/common/LoadingComponent';
import './index.less';

const NotFound = Loadable({
  loader: () => import('../../components/common/NotFound'),
  loading: LoadingComponent,
  delay: 100
});

export default class CenterLayout extends Component {

  render() {
    return (
      <div className="blank-layout">
        <div className="blank-layout-content">
          <Switch>
            {routerConfig.map((item, index) => {
              if (item.path === '/' && item.redirect) {
                return <Redirect key={index} exact from="/" to={item.redirect} />;
              }

              if (item.component && item.isAuthenticated) {
                return <PrivateRoute key={index} path={item.path} component={item.component} exact={item.exact} />;
              }
              return item.component ? (
                <Route key={index} path={item.path} component={item.component} exact={item.exact} />
              ) : null;
            })}

            <Route component={NotFound} />
          </Switch>
        </div>
        <footer>
          <Copyright />
        </footer>
      </div>
    );
  }
}
