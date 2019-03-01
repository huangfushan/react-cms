import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';
import { sidebarMenus } from '../../menuConfig';

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
  menuRender = (data, url) => {
    return data.map(item => {
      const path = url ? (url + item.path) : item.path;
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
              this.menuRender(item.children, path)
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
        <div className="dt-sidebar-body">
          <Menu theme="light" mode="inline" selectedKeys={[pathname]}>
            {this.menuRender(sidebarMenus)}
          </Menu>
        </div>
      </Layout.Sider>
    );
  }
}
