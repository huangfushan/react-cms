/**
 * 通用的布局
 * @Author: huangfs
 * @Date: 2019-02-25
 * @Project: cms
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Footer from './Footer';
import routerConfig from '../../routerConfig';
import Header from './Header';
import PrivateRoute from '../../components/common/PrivateRoute';
import LoadingComponent from '../../components/common/LoadingComponent';
import './index.less';

const NotFound = Loadable({
  loader: () => import('../../components/common/NotFound'),
  loading: LoadingComponent,
  delay: 100
});
export default class NormalLayout extends React.Component {

  render() {
    return (
      <div className="normal-layout">
        <Header />
        <div className="normal-layout-content">
          <Switch>
            {routerConfig.map((item, index) => {
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
          <Footer />
        </footer>
      </div>
    );
  }
}
