/**
 * 路由配置入口，带优化（权限分配）
 * @Author: huangfs
 * @Date: 2019-01-09
 * @Project: cms
 */

import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { LocaleProvider } from 'antd';
import Loadable from 'react-loadable';
import LoadingComponent from './components/common/LoadingComponent';
import { Actions } from './redux/actions';
import App from './layout/App';
import routerConfig from './routerConfig';
import PrivateRoute from './components/common/privateRoute';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { I18nProvider } from './i18n/I18nConfig';
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
    language: state.common.language
  }),
  {
    updateLanguage: Actions.common.update,
  }
)
export default class Routers extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.updateLanguage({language: 'en'})
    }, 1000);
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <I18nProvider currentLanguage={this.props.language}>
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
        </I18nProvider>
      </LocaleProvider>
    );
  }
}
