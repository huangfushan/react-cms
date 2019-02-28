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
import BlankLayout from './layouts/BlankLayout';

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
 * redirect：重定向的页面，只在 path='/' 时奇效
 */
const routerConfig = [
  {
    path: '/login',
    component: Login,
    exact: true,
    breadcrumb: '未找到',
    layout: CenterLayout
  }, {
    path: '/order',
    component: NotFound,
    exact: true,
    breadcrumb: '首页',
    isAuthenticated: true,
    layout: NormalLayout
  }, {
    path: '/goods',
    component: NotFound,
    exact: true,
    breadcrumb: '首页',
    isAuthenticated: true,
    layout: AsideLayout
  }, {
    path: '/category',
    component: NotFound,
    exact: true,
    breadcrumb: '首页',
    isAuthenticated: true,
    layout: BlankLayout
  }, {
    path: '/setting',
    component: NotFound,
    exact: true,
    breadcrumb: '404',
    isAuthenticated: true,
    layout: HeaderAsideLayout
  }, {
    path: '/',
    redirect: '/home',
    layout: AsideLayout
  },
];

export default routerConfig;


