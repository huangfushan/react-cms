import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Tag, Menu } from 'antd';
import { AsyncActions } from '../../redux/actions';
import { common } from '../../images/images';
import { headerMenus } from '../../menuConfig';

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
    const { pathname } = this.props;
    return (
      <header>
        <div className="logo">
          <img src={common.logo} alt="logo" />
        </div>
        <div className="menu-left">
          <Menu
            selectedKeys={[pathname]}
            mode="horizontal"
          >
            {
              headerMenus && headerMenus.map(item =>
                <Menu.Item key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
              )
            }
          </Menu>
        </div>

        <div className="nav-right">
          <span
            style={{ marginRight: 20 }}>{this.props.isAuthenticated ? (this.props.username || 'Admin') : '未登录'}</span>
          <Tag color='red' onClick={this.handleLogout}>{this.props.isAuthenticated ? '退出' : '登录'}</Tag>
        </div>
      </header>
    );
  }
}
