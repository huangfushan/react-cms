import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import LoadingComponent from './components/common/LoadingComponent';
import { getStorage } from './utils';
import { C_STORAGE } from './common/constants';
import http from './api/http';
import { Actions } from './redux/actions';
import 'normalize.css';
import './themes/index.less';

//登录
const Login = Loadable({
  loader: () => import('./containers/page/Login'),
  loading: LoadingComponent,
  delay: 100
});

const Routes = Loadable({
  loader: () => import('./Routes'),
  loading: LoadingComponent,
  delay: 100
});


@connect(
  null,
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
          <Route component={Routes} />
        </Switch>
      </Router>
    );
  }
}
