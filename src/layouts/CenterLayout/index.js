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
import routerConfig, { redirectPath } from '../../routerConfig';
import PrivateRoute from '../../components/common/PrivateRoute';
import LoadingComponent from '../../components/common/LoadingComponent';
import './index.less';

const Page404 = Loadable({
  loader: () => import('../../components/common/Page404'),
  loading: LoadingComponent,
  delay: 100
});

export default class CenterLayout extends Component {

  render() {
    return (
      <div className="account-layout">
        <div className="account-layout-layer" />
        <div className="account-layout-content">
          <Switch>
            {routerConfig.map((item, index) => {

              if (!item.component) return null;

              if (item.isAuthenticated) {
                return <PrivateRoute key={index} path={item.path} component={item.component} exact={item.exact} />;
              }

              return <Route key={index} path={item.path} component={item.component} exact={item.exact} />;

            })}

            {!!redirectPath && <Redirect from="/" to={redirectPath} />}

            <Route component={Page404} />
          </Switch>
        </div>
        <footer>
          <Copyright />
        </footer>
      </div>
    );
  }
}
