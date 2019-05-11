/**
 * 头部固定（头部），包含左侧栏 （内容 + 底部）
 * @Author: huangfs
 * @Date: 2019-02-26
 * @Project: cms
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { BreadcrumbsCom } from 'react-breadcrumbs-hoc';
import { Icon } from 'antd';
import Header from './Header';
import SideBar from './Sidebar';
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
    const { location } = this.props;
    const { pathname } = location;
    return (
      <div className="header-aside-layout">
        <Header pathname={pathname} />
        <div className="header-aside-layout-content">
          <SideBar collapsed={this.state.collapsed} />
          <div className="body">
            <div className="body-header">
              <Icon
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleCollapse}
                style={{ marginRight: '1rem' }}
              />
              <BreadcrumbsCom routers={routerConfig} />
            </div>
            <div className="body-content">
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
        </div>
      </div>
    );
  }
}
