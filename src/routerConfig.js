/**
 * 路由配置文件
 * @Author: huangfs
 * @Date: 2019-01-09
 * @Project: cms
 */

import LoadingComponent from './components/common/LoadingComponent';
import Loadable from 'react-loadable';

//登录
const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: LoadingComponent,
  delay: 100
});

//注册
const Register = Loadable({
  loader: () => import('./pages/Register'),
  loading: LoadingComponent,
  delay: 100
});

//忘记密码
const ForgetPassword = Loadable({
  loader: () => import('./pages/ForgetPassword'),
  loading: LoadingComponent,
  delay: 100
});

//404
const Page404 = Loadable({
  loader: () => import('./components/common/Page404'),
  loading: LoadingComponent,
  delay: 0
});
const PageError = Loadable({
  loader: () => import('./components/common/PageError'),
  loading: LoadingComponent,
  delay: 0
});
//ArticleEdit
const ArticleEdit = Loadable({
  loader: () => import('./example/pages/Article/ArticleEdit'),
  loading: LoadingComponent,
  delay: 0
});

//ArticleEdit
const ArticleInfo = Loadable({
  loader: () => import('./example/pages/Article/ArticleInfo'),
  loading: LoadingComponent,
  delay: 0
});

//ArticleList
const ArticleList = Loadable({
  loader: () => import('./example/pages/Article'),
  loading: LoadingComponent,
  delay: 0
});
// /**
//  * 路由配置
//  * path：路径
//  * component：页面
//  * exact 是否精确路由,这个字段只在具体的布局layout中才起效用
//  * name：面包屑
//  * isAuthenticated：是否需要登录
//  * layout：布局
//  *
//  * 路由都加上layout的话，相当于每点击一次sidebar的子项，都会重新渲染。这将导致每次点击左侧栏都会被关闭。
//  * layout布局放在routerConfig中最好的应用场景是在客户端而不是管理后台。因为管理后台的布局相对稳定，不会有太多的变动。
//  */
// const routerConfig = [
//   { path: '/login', component: Login, exact: true, name: '登录', layout: CenterLayout },
//   { path: '/register', component: Register, exact: true, name: '注册', layout: CenterLayout },
//   { path: '/password/forget', component: ForgetPassword, exact: true, name: '忘记密码', layout: CenterLayout },
//   { path: '/order', component: Page404, exact: true, name: '首页', isAuthenticated: true, layout: HeaderAsideLayout },
//   { path: '/goods', component: Page404, exact: true, name: '首页', isAuthenticated: true, layout: AsideLayout },
//   { path: '/category', component: Page404,exact: true,breadcrumb: '首页',isAuthenticated: true,layout: BlankLayout,},
//   { path: '/setting', component: Page404, exact: true, name: '404', isAuthenticated: true, layout: NormalLayout },
//   { path: '/home', component: Page404, exact: true, name: '404', isAuthenticated: true, layout: HeaderAsideLayout },
// ];

/**
 * 路由配置
 * path：路径
 * component：页面
 * exact 是否精确路由,这个字段只在具体的布局layout中才起效用
 * name：面包屑
 * isAuthenticated：是否需要登录
 */
const routerConfig = [
  { path: '/login', component: Login, exact: true, name: '登录' },
  { path: '/register', component: Register, exact: true, name: '注册' },
  { path: '/password/forget', component: ForgetPassword, exact: true, name: '忘记密码' },
  { path: '/', component: Page404, exact: true, name: '首页', isAuthenticated: true },
  { path: '/home', component: Page404, exact: true, name: '统计', isAuthenticated: true },
  { path: '/order', component: Page404, exact: true, name: '订单', isAuthenticated: true },
  { path: '/goods', component: Page404, exact: true, name: '商品', isAuthenticated: true },
  { path: '/article', component: ArticleList, exact: true, name: '文章管理', isAuthenticated: true },
  { path: '/article/add', component: ArticleEdit, exact: true, name: '添加', isAuthenticated: true },
  { path: '/article/:id', component: ArticleInfo, exact: true, name: '', isAuthenticated: true },
  { path: '/article/:id/update', component: ArticleEdit, exact: true, name: '编辑', isAuthenticated: true },
  { path: '/setting', component: PageError, exact: true, name: '设置', isAuthenticated: true },
];
export const redirectPath = ''; //重定向地址
export default routerConfig;


