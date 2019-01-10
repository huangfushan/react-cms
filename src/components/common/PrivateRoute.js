import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';


@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
)
@withRouter
export default class PrivateRoute extends Component {

  render() {
    let { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route {...rest} render={(props) => (
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      )} />
    );
  }
}
