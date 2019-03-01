/**
 * 头部固定（头部），包含左侧栏 （内容 + 底部）
 * @Author: huangfs
 * @Date: 2019-02-26
 * @Project: cms
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Icon } from 'antd';
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

export default class HeaderAsideLayout extends React.Component {

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
      <div className="header-aside-layout">
        <Header />
        <div className="header-aside-layout-content">
          <SideBar collapsed={this.state.collapsed} />
          <div className="body">
            <div className="body-header">
              <Icon
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleCollapse}
              />
            </div>
            <div className="body-content">
              <Switch>
                {routerConfig.map((item, index) => {
                  // 首页重定向
                  if (item.path === '/' && item.redirect) {
                    return <Redirect key={index} exact from="/" to={item.redirect} />;
                  }

                  if (!item.component) return null;

                  if (item.isAuthenticated) {
                    return <PrivateRoute key={index} path={item.path} component={item.component} exact={item.exact} />;
                  }

                  return <Route key={index} path={item.path} component={item.component} exact={item.exact} />;

                })}
                <Route component={NotFound} />
              </Switch>
            </div>
            <footer>
              <Copyright />
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
