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
import { Actions, AsyncActions } from '../../redux/actions';
import Copyright from '../../components/common/Copyright';

@connect(
  null,
  {
    signOut: AsyncActions.signOut,
    updateBadge: Actions.common.updateBadge,
  }
)

export default class App extends React.Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    updateBadge: PropTypes.func.isRequired,
  };

  state = {
    collapsed: false,
    superLevel: true
  };

  //需要获取网络请求，拿到badge
  componentDidMount() {
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
