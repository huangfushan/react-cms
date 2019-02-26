/**
 * AdideLayout
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from './Header';
import SideBar from './Sidebar';
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
export default class AsideLayout extends React.Component {

  state = {
    collapsed: false,
  };

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div className="aside-layout">
        <SideBar collapsed={this.state.collapsed} />
        <div className="aside-layout-content">
          <Header collapsed={this.state.collapsed} handleClick={this.toggleCollapse} />
          <div className="body">
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
            <Copyright />
          </footer>
        </div>
      </div>
    );
  }
}
