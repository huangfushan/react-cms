import React from 'react';
import { connect } from 'react-redux';
import { Icon, Tag } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { C_PROJECT_NAME, C_STORAGE } from '../../common/constants';
import { AsyncActions } from '../../redux/actions';
import { getStorage } from '../../utils';

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
  }),
  {
    signOut: AsyncActions.signOut,
  }
)
@withRouter
export default class Header extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false,
    username: '',
  };

  handleLogout = () => {
    if (this.props.isAuthenticated) {
      this.props.signOut();
    } else {
      this.props.history.push('/login');
    }
  };

  render() {
    return (
      <header className="flex-between">
        <div className='name'>
          <Icon
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.handleClick}
          />
          <span>{C_PROJECT_NAME}</span>
        </div>
        <div>
          <span
            style={{ marginRight: 20 }}>{this.props.isAuthenticated ? (this.props.username || getStorage(C_STORAGE.USERNAME)) : '未登录'}</span>
          <Tag color='red' onClick={this.handleLogout}>{this.props.isAuthenticated ? '退出' : '登录'}</Tag>
        </div>
      </header>
    );
  }
}
