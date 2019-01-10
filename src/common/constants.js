const path = require('./config');
const env = (env) => {
  switch (env){
    case 'dev': //开发服
      return `${path.PROJECT_HOST_DEV}/${path.PROJECT_CODE}`;
    case 'test': //测试服
      return `${path.PROJECT_HOST_TEST}/${path.PROJECT_CODE}`;
    case 'prod': //正式服
      return `${path.PROJECT_HOST_PROD}`; //商家提供域名的话，就没有code
    default: //其他，如本地
      return ``;
  }
};

export const C_PROJECT_NAME = path.PROJECT_NAME;
export const C_X_CLIENT_TOKEN = `${path.PROJECT_CODE}:${path.PROJECT_PORT}`; //token
export const C_PROJECT_HOST = env(process.env.PRODUCTION_ENV); //当前运行环境对应的host

/**
 * 技术支持
 * @type {{NAME: string, PATH: string}}
 */
export const C_AUTHOR = {
  TIME: '2018',
  NAME: '大愚科技提供技术支持',
  PATH: 'https://www.dayukeji.xin'
};
/**
 * API请求路径
 * @type {{HOST: string, PATH: string}}
 */
export const C_API = {
  HOST: `${C_PROJECT_HOST}/api`,
  // ADDRESS: `${path.PROJECT_HOST_PROD}/static${path.PROJECT_CODE}/address`,//静态资源api
};

/**
 * 网络请求后端返回状态吗
 * @type {{OK: number, ERR_INVALID: number, ERR_NO_FOUND: number, ERR_UNKNOWN: number}}
 */
export const C_RESP = {
  OK: 0,
  ERR_INVALID: 401,
  ERR_NO_FOUND: 404,
  ERR_UNKNOWN: -999,
};

/**
 * 时间格式
 * @type {{Y: string, M: string, D: string, H: string, m: string, s: string, q: number, S: number}}
 */
export const C_TIME = {
  Y: 'YYYY',
  M: 'YYYY-MM',
  D: 'YYYY-MM-DD',
  H: 'YYYY-MM-DD HH',
  m: 'YYYY-MM-DD HH:mm',
  s: 'YYYY-MM-DD HH:mm:ss',
  q: 0,//季度
  S: 0,//毫秒
};

/**
 * 存入storage缓存
 * @type {{KEY_SESSION: string, KEY_USER: string}}
 */
export const C_STORAGE = {
  KEY_AUTH: 'auth', //账户信息，是对象
  KEY_SESSION: 'session', //session
};


/**
 * 页码
 * @type {{PAGE: number, COUNT: number}}
 */
export const C_PAGE_NUMBER = {
  PAGE: 1,
  COUNT: 10,
};

export const C_ORDER = {
  ALL: '全部订单',
  UNSHIP: '待发货',
  SHIPED: '待收货',
  COMPLETE: '已完成'
};


export const  C_GENDER = {
  MAN: '男',
  WOMEN: '女',
  UNKNOW: '未知'
};

export const C_EDUCATION = {
  JUNIOR: '初中',
  SENIOR: '高中/中专',
  COLLEGE: '大专',
  UNIVERSITY: '本科',
  MASTER: '硕士',
  DOCTOR: '博士',
};

/**
 * 相关验证码操作的时候需要
 * @type {{REGISTER: string, LOGIN: string, ALTER_PASSWORD: string, ALTER_PHONE: string, BIND: string}}
 */
export const C_SCENE = {
  REGISTER: "REGISTER", //注册时的验证码
  LOGIN: 'LOGIN', //验证码登录
  ALTER_PASSWORD: 'ALTER_PASSWORD', //通过旧密码，修改密码
  ALTER_PHONE: 'ALTER_PHONE', //修改手机号
  FORGET_PASSWORD: 'FORGET_PASSWORD', //忘记密码时，修改密码
  BIND: 'BIND', //绑定
};
//
// 'WX_MINI', 微信小程序
// 'WX_APP',微信app
// 'WX_H5',微信h5
// 'WX_MP',微信公众号
// 'ALI_MINI',支付宝小程序
// 'ALI_H5',支付宝h5
// 'ALI_APP'支付宝app
