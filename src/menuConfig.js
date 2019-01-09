/**
 * 定义sidebar和header中的菜单项
 *
 * 一些约定:
 * 1.菜单最多3层;
 * 2.只有"叶子"节点才能跳转;
 * 3.所有的key都不能重复;
 */

// 导航支持多层嵌套
// 可用的图标见这里: https://ant.design/components/icon-cn/

// 定义siderbar菜单
const sidebarMenus = [
  { path: '', name: '统计', icon: 'global' },
  {
    path: 'manager',
    name: '管理',
    icon: 'share-alt',
    child: [
      {
        path: 'order',
        name: '订单管理'
      }, {
        path: 'goods',
        name: '商品管理'
      }, {
        path: 'category',
        name: '分类管理',
      }, {
        path: 'merchant',
        name: '店铺管理',
      }
    ]
  }, {
    path: 'setting',
    name: '设置',
    icon: 'trophy'
  }
];

export default sidebarMenus;


