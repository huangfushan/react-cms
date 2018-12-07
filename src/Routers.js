import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import MyLoadingComponent from './components/common/Loading';
import { getStorage } from './utils';
import { STORAGE_C } from './common/constants';
import http from './api/http';
import actions from './redux/actions';
import 'normalize.css';
import './themes/index.less';

const Routes = Loadable({
  loader: () => import('./Routes'),
  loading: MyLoadingComponent,
  delay: 100
});

const Login = Loadable({
  loader: () => import('./containers/page/Login'),
  loading: MyLoadingComponent
});

@connect(
  null,
  {
    updateAuth: actions.auth.updateAuth
  }
)

export default class Routers extends React.Component {
  static propTypes = {
    updateAuth: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const session = getStorage(STORAGE_C.KEY_SESSION);
    if (session) {
      http.setHeader(STORAGE_C.KEY_SESSION, session);
      this.props.updateAuth({ session });
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={ Login }/>
          <Route component={ Routes }/>
        </Switch>
      </Router>
    );
  }
}
