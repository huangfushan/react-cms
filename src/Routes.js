/**
 * routes
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import App from './containers/app/App';
import Loadable from 'react-loadable';
import MyLoadingComponent from './components/common/MyLoadingComponent';


const OrderList = Loadable({
  loader: () => import('./containers/page/example/OrderList'),
  loading: MyLoadingComponent,
  delay: 100
});
const NotFound = Loadable({
  loader: () => import('./components/common/NotFound'),
  loading: MyLoadingComponent,
  delay: 100
});

const DndExample = Loadable({
  loader: () => import('./containers/page/example/DndExample'),
  loading: MyLoadingComponent,
  delay: 100
});


@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
)
export default class Routes extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isAuthenticated: false
  };

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <Redirect
          to={ {
            pathname: '/login',
            state: {
              message: '请您先登录，谢谢！'
            }
          } }
        />
      )
    }
    return (
      <App >
        <Switch>
          <Route exact path="/statistics" component={DndExample} />
          <Route exact path="/manager/order" component={OrderList} />
          <Route exact path="/manager/order/:id" component={NotFound} />
          <Route exact path="/setting" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </App>
    )
  }
}


