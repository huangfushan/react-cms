import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Icon, Menu, Switch } from 'antd';
import SidebarLogo from '../components/common/SidebarLogo';
import sidebarMenus from '../menuConfig';
import { Actions } from '../redux/actions';
import '../components/antd/index.less';

const { Sider } = Layout;
const { Item } = Menu;
const SubMenu = Menu.SubMenu;

@connect(
  state => ({
    badge: state.common.badge
  }),
  {
    updateBadge: Actions.common.updateBadge
  }
)

export default class Sidebar extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    badge: PropTypes.object.isRequired,
    updateBadge: PropTypes.func.isRequired,
  };

  static defaultProps = {
    badge: {}
  };

  state = {
    current: undefined,
    light: false
  };

  /**
   * 遍历bav栏
   */
  menuRender = () => {
    const menu = sidebarMenus.map(item => {
      const path = `/${item.path}`;
      if (item.child) {
        return (
          <SubMenu key={path} title={<span><Icon type={item.icon || 'smile'} /><span>{item.name}</span></span>}>
            {
              this.childMenu(path, item.child)
            }
          </SubMenu>
        );
      } else {
        return (
          <Item key={path}>
            <Link to={path}>
              <Icon type={item.icon || 'smile'} />
              <span>{item.name}</span>
            </Link>
          </Item>
        );
      }
    });
    return menu;
  };

  /**
   * 遍历子bar栏
   * @param key
   * @param childMenu
   * @returns {*}
   */
  childMenu = (key, childMenu) => {
    return childMenu.map(item => {
      const path = `${key}/${item.path}`;
      if (item.child) {
        return (
          <SubMenu
            key={path}
            title={
              <span>
                {item.icon ? <Icon type={item.icon} /> : null}
                <span>{item.name}</span>
              </span>
            }>
            {
              this.childMenu(path, item.child)
            }
          </SubMenu>
        );
      }
      else {
        return (
          <Item key={path}>
            <Link to={path}>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.name}</span>
            </Link>
          </Item>
        );
      }

    });
  };

  handleClick = (e) => {
    const key = e.key;
    this.setState({
      current: key
    });
    // this.props.updateBadge({
    // badge: { ...this.props.badge, [e.keyPath[0].split('/')[e.keyPath.length]]: 0 }
    // });
  };

  handleChange = (value) => {
    this.setState({
      light: !value
    });
  };

  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        className={`ant-layout-sider-${this.state.light ? 'light' : 'dark'}`}
      >
        <div className="sider-header">
          <SidebarLogo />
        </div>
        <div className="sider-body">
          <Menu
            theme={this.state.light ? 'light' : 'dark'}
            mode="inline"
            defaultSelectedKeys={[`${window.location.hash}`.split('#')[1]]}
            onClick={this.handleClick}
          >
            {this.menuRender()}
          </Menu>
        </div>
        <div className="flex-around theme-switch">
          <span>主题定义</span>
          <Switch checkedChildren="Dark" unCheckedChildren="Light" onChange={this.handleChange} defaultChecked />
        </div>
      </Sider>
    );
  }
}
