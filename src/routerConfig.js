/**
 * 路由配置文件
 * @Author: huangfs
 * @Date: 2019-01-09
 * @Project: cms
 */

import LoadingComponent from './components/common/LoadingComponent';
import Loadable from 'react-loadable';
import CenterLayout from './layouts/CenterLayout';
import AsideLayout from './layouts/AsideLayout';
import NormalLayout from './layouts/NormalLayout';
import HeaderAsideLayout from './layouts/HeaderAsideLayout';
import Register from './components/common/Register';

const Login = Loadable({
  loader: () => import('./pages/login'),
  loading: LoadingComponent,
  delay: 100
});
const NotFound = Loadable({
  loader: () => import('./components/common/NotFound'),
  loading: LoadingComponent,
  delay: 0
});

/**
 * 路由配置
 * path：路径
 * component：页面
 * exact 是否精确路由,这个字段只在具体的布局layout中才起效用
 * breadcrumbs：面包屑
 * isAuthenticated：是否需要登录
 * layout：布局
 */
const routerConfig = [
  {
    path: '/goods',
    component: NotFound,
    exact: true,
    breadcrumb: '商品',
    layout: NormalLayout
  }, {
    path: '/login',
    component: Login,
    exact: true,
    breadcrumb: '未找到',
    layout: CenterLayout
  }, {
    path: '/setting',
    component: NotFound,
    exact: true,
    breadcrumb: '未找到',
    layout: HeaderAsideLayout
  }, {
    path: '/',
    component: Register,
    exact: true,
    breadcrumb: '首页',
    isAuthenticated: true,
    layout: AsideLayout
  },
];

export default routerConfig;


