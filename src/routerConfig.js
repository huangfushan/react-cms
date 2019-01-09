/**
 * 路由配置文件
 * @Author: huangfs
 * @Date: 2019-01-09
 * @Project: cms
 */

import LoadingComponent from './components/common/LoadingComponent';
import Loadable from 'react-loadable';

const GoodsList = Loadable({
  loader: () => import('./page/example/GoodsList'),
  loading: LoadingComponent,
  delay: 100
});
const OrderList = Loadable({
  loader: () => import('./page/example/OrderList'),
  loading: LoadingComponent,
  delay: 100
});
const NotFound = Loadable({
  loader: () => import('./components/common/NotFound'),
  loading: LoadingComponent,
  delay: 100
});

// 定义路由
const routerConfig = [
  {
    path: '/',
    component: NotFound,
  }, {
    path: '/manager/goods',
    component: GoodsList,
  },{
    path: '/manager/goods/:id',
    component: NotFound,
  },{
    path: '/manager/order',
    component: OrderList,
  },
];

export default routerConfig;


