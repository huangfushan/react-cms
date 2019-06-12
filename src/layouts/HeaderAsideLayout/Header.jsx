import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Tag, Menu } from 'antd';
import { AsyncActions } from '../../redux/actions';
import { common } from '../../images/images';
import { headerMenus } from '../../menuConfig';
import { C_STORAGE } from '../../common/constants';

const { Item } = Menu;

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

  /**
   * 遍历bav栏
   */
  menuRender = (data, url) => {
    return data.map(item => {
      const path = url ? (url + item.path) : item.path;
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={path} title={item.name}>
            {
              this.menuRender(item.children, path)
            }
          </Menu.SubMenu>
        );
      } else {
        return (
          <Item key={path}>
            <Link to={path}>{item.name}</Link>
          </Item>
        );
      }
    });
  };

  render() {
    const { pathname } = this.props;
    return (
      <header>
        <div className="logo">
          <img src={common.logo} alt="logo" />
        </div>
        <div className="menu-left">
          <Menu selectedKeys={[pathname]} mode="horizontal">
            {this.menuRender(headerMenus || [])}
          </Menu>
        </div>

        <div className="nav-right">
          <span
            style={{ marginRight: 20 }}>{this.props.isAuthenticated ? (this.props.username || C_STORAGE.USERNAME) : '未登录'}</span>
          <Tag color='red' onClick={this.handleLogout}>{this.props.isAuthenticated ? '退出' : '登录'}</Tag>
        </div>
      </header>
    );
  }
}
