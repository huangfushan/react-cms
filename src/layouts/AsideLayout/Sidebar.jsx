import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';
import { sidebarMenus } from '../../menuConfig';
import { common } from '../../images/images';

const { Item } = Menu;
const SubMenu = Menu.SubMenu;

@withRouter
export default class Sidebar extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
  };

  /**
   * 遍历bav栏
   */
  menuRender = () => {
    return sidebarMenus.map(item => {
      const path = item.path;
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={path}
            title={
              <span>
              {!!item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>}>
            {
              this.childMenu(path, item.children)
            }
          </SubMenu>
        );
      } else {
        return (
          <Item key={path}>
            <Link to={path}>
              {!!item.icon && <Icon type={item.icon} />}
              <span>{item.name}</span>
            </Link>
          </Item>
        );
      }
    });
  };

  /**
   * 遍历子bar栏
   * @param parents
   * @param childMenu
   * @returns {*}
   */
  childMenu = (parents, childMenu) => {
    return childMenu.map(item => {
      const path = parents + item.path;
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={path}
            title={
              <span>
              {!!item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            }>
            {
              this.childMenu(path, item.children)
            }
          </SubMenu>
        );
      }
      return (
        <Item key={path}>
          <Link to={path}>
            {!!item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Link>
        </Item>
      );
    });
  };

  render() {
    const { location } = this.props;
    const { pathname } = location;
    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        style={{ background: '#fff' }}
        className='dt-sidebar'
      >
        <div className="dt-sidebar-header">
          <img src={common.logo} alt="logo" />
        </div>
        <div className="dt-sidebar-body">
          <Menu theme="light" mode="inline" selectedKeys={[pathname]}>
            {this.menuRender()}
          </Menu>
        </div>
      </Layout.Sider>
    );
  }
}
