import React from 'react';
import PropTypes from 'prop-types';
import {STORAGE_C, PROJECT_NAME_C} from '../../common/constants';
import { Layout, Icon, Tag, Popover } from 'antd';
import { getStorage } from '../../utils';

const { Header } = Layout;

export default class Navbar extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
  };
  state = {
    loading: false
  };

  handleLogout = () => {
    this.props.signOut()
  };

  renderOverlay = () => {
    return <Tag  color='red' onClick={this.handleLogout}>退出</Tag>
  };

  render() {
    return (
      <Header style={style.header}>
        <nav className="flex-center-between" style={style.nav}>
          <div>
            <Icon
              style={style.cursor}
              type={this.props.collapsed ? 'menu-unfold': 'menu-fold'}
              onClick={this.props.handleClick}
            />
            <span>{PROJECT_NAME_C}</span>
          </div>
          <Popover
            placement="bottom" title={null} content={this.renderOverlay()}
          >
            <a>
              <Icon
                type="user"
              />
              <span>{getStorage(STORAGE_C.KEY_USER)}</span>
            </a>
          </Popover>
        </nav>
      </Header>
    )
  }
}

const style = {
  header: {
    background: '#fff',
    padding: '0  20px'
  },

  nav: {
    height: '100%',
    paddingRight: 30
  },

  cursor: {
    cursor: 'pointer'
  }
};
