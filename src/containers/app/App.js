/**
 * HomePage
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */

import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import SideBar from './Sidebar';
import Navbar from './Navbar';
import AsyncActions from '../../redux/actions';
import Copyright from '../../components/common/Copyright';

@connect(
  null,
  {
    signOut: AsyncActions.signOut,
  }
)

export default class App extends React.Component {

  state = {
    collapsed: false,
    superLevel: true
  };

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
      <Layout style={ style }>
        <SideBar collapsed={ this.state.collapsed } permission={ this.state.superLevel }/>
        <Layout >
          <Navbar
            collapsed={ this.state.collapsed }
            handleClick={ this.toggleCollapse }
            signOut={ this.handleLogout }
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
    position:'relative',
    background: '#fff',
    margin: 10,
    Height: 'calc(100vh - 136px)',
    flex: '1 1',
  }
};
