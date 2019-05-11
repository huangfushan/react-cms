/**
 * 定义sidebar和header中的菜单项
 *
 * 一些约定:
 * 1.菜单一般最多3层;
 * 2.只有"叶子"节点才能跳转;
 * 3.所有的key都不能重复;
 */

// 导航支持多层嵌套
// 可用的图标见这里: https://ant.design/components/icon-cn/

// 定义sidebar菜单
const sidebarMenus = [
  { path: '/home', name: '统计', icon: 'global' },
  {
    path: '',
    name: '管理',
    icon: 'share-alt',
    children: [
      { path: '/order', name: '订单管理' },
      { path: '/goods', name: '商品管理' },
      { path: '/article', name: '文章管理' },
      {
        path: '/merchant', name: '店铺管理',
        children: [
          { path: '/store', name: '门店列表' }
        ]
      }
    ]
  },
  { path: '/setting', name: '设置', icon: 'trophy' }
];

const headerMenus = [
  { path: '/home', name: '统计' },
  {
    path: '', name: '管理', children: [
      { path: '/order', name: '订单管理' },
      { path: '/goods', name: '商品管理' },
      { path: '/category', name: '分类管理' },
    ]
  },
  { path: '/setting', name: '设置' },
];

export { sidebarMenus, headerMenus };


