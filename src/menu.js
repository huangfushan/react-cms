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
  {
    key: 'statistics',
    name: '统计',
    icon: 'global'
  }, {
    key: 'manager',// route时url中的值
    name: '管理', // 在菜单中显示的名称
    icon: 'share-alt', // 图标是可选的
    child: [
      {
        key: 'order',
        name: '订单管理'
      }, {
        key: 'goods',
        name: '商品管理'
      }, {
        key: 'category',
        name: '分类管理',
      }, {
        key: 'merchant',
        name: '店铺管理',
      }
    ]
  }, {
    key: 'setting',
    name: '设置',
    icon: 'trophy'
  }
];

export default sidebarMenus;


