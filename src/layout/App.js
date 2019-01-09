/**
 * HomePage
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */

import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from './Sidebar';
import Navbar from './Navbar';
import { Actions, AsyncActions } from '../redux/actions';
import Copyright from '../components/common/Copyright';
import http from '../api/http';
import { C_STORAGE } from '../common/constants';
import { getStorage } from '../utils';

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  {
    signOut: AsyncActions.signOut,
    updateBadge: Actions.common.update,
    updateAuth: Actions.auth.updateAuth,
  }
)

export default class App extends React.Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    updateBadge: PropTypes.func.isRequired,
    updateAuth: PropTypes.func.isRequired,
  };

  state = {
    collapsed: false,
    superLevel: true
  };

  //需要获取网络请求，拿到badge
  componentWillMount() {
    const auth = JSON.parse(getStorage(C_STORAGE.KEY_AUTH));
    if (auth && auth.session) {
      http.setHeader(C_STORAGE.KEY_SESSION, auth.session);
      this.props.updateAuth(auth);
    }
    this.props.updateBadge({ badge: {} });
  }

  handleLogout = () => {
    this.props.signOut();
  };

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={style}>
        <SideBar collapsed={this.state.collapsed} permission={this.state.superLevel} />
        <Layout>
          <Navbar
            collapsed={this.state.collapsed}
            handleClick={this.toggleCollapse}
            signOut={this.handleLogout}
          />
          <div style={style.body}>
            {this.props.children}
          </div>
          <Copyright />
        </Layout>
      </Layout>
    );
  }
}

const style = {
  height: '100%',

  body: {
    padding: 10,
    position: 'relative',
    background: '#fff',
    margin: 10,
    Height: 'calc(100vh - 136px)',
    flex: '1 1',
  }
};
