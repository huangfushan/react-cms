const PROJECT_NAME = 'CMS框架'; //项目名称
const PROJECT_CODE = 'p18888'; //项目code
const PROJECT_PORT = 'manager'; //端
const PROJECT_HOST_PROD = ''; //正式服
const PROJECT_HOST_TEST = 'https://test.dayukeji.xin'; //正式服
const PROJECT_HOST_DEV = 'https://tst.dayukeji.xin'; //测试服
const DEBUG = {
  postman: '/postman', //postman
  dev: '/dev', //开发服
  test: '/test', //测试服
  product: '/product', //正式服
};

module.exports = {
  PROJECT_NAME,
  PROJECT_CODE,
  X_CLIENT_TOKEN: `${PROJECT_CODE}:${PROJECT_PORT}`,
  PROJECT_PORT,
  PROJECT_HOST_PROD,
  PROJECT_HOST_TEST,
  PROJECT_HOST_DEV,

  //拿到当前环境的请求路径
  env: () => {
    switch (process.env.PRODUCTION_ENV) {
      case 'dev': //开发服
        return `${PROJECT_HOST_DEV}/${PROJECT_CODE}/api`;
      case 'test': //测试服
        return `${PROJECT_HOST_TEST}/${PROJECT_CODE}/api`;
      case 'prod': //正式服
        return `${PROJECT_HOST_PROD}/${PROJECT_CODE}/api`; //商家提供域名的话，就没有code
      default: //其他，如本地start
        return ``;
    }
  },

  //如果是本地，则返回当前环境映射路径
  debug: () => {
    if (process.env.NODE_ENV === 'production') {
      return null;
    }
    return DEBUG.postman;
  }
};
