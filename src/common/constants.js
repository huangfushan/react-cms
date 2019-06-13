const path = require('./config');

export const C_PROJECT_NAME = path.PROJECT_NAME; //项目名称
export const C_X_CLIENT_TOKEN = path.X_CLIENT_TOKEN; //x-client-token
export const C_SESSION = 'session'; //session

/**
 * 技术支持
 * @type {{NAME: string, PATH: string}}
 */
export const C_AUTHOR = {
  TIME: '2019',
  NAME: '大愚科技提供技术支持',
  PATH: 'https://www.dayukeji.xin'
};

/**
 * API请求路径
 * @type {{HOST: string, PATH: string}}
 */
export const C_API = {
  // HOST: path.env(), //当前运行环境对应的host,因为线上请求api是会自动添加域名，所以只要线上域名与接口请求域名一样，就可以不用配置这个属性
  HOST_PATH: `${path.debug()}${path.getCode()}/api`, // 基本请求路径/debug/code/api，线上debug是空，
  TIMEOUT: 15000, //api请求超时时间
  // DEBUG: path.debug(), // 本地环境调试需要的接口映射
};

/**
 * 网络请求后端返回状态吗
 * @type {{ERR_FAIL: number, ERR_401: number, ERR_500: number, ERR_404: number, OK: number}}
 */
export const C_RESP = {
  OK: 0,
  SUCCESS: 200,
  ERR_401: 401,
  ERR_404: 404,
  ERR_500: 500,
  ERR_FAIL: -1000,
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
 * @type {{PASSWORD: string, AUTH: string, USERNAME: string}}
 */
export const C_STORAGE = {
  AUTH: `${process.env.PRODUCTION_ENV}_${path.PROJECT_CODE}_auth`, //账户信息，是对象
  USERNAME: `${process.env.PRODUCTION_ENV}_${path.PROJECT_CODE}_username`, //登录账号
  PASSWORD: `${process.env.PRODUCTION_ENV}_${path.PROJECT_CODE}_password`, //登录密码
};

/**
 * 页码
 * @type {{PAGE: number, COUNT: number}}
 */
export const C_PAGE_NUMBER = {
  PAGE: 1,
  COUNT: 10,
};

/**
 * 性别
 * @type {{MAN: string, WOMEN: string, UNKNOWN: string}}
 */
export const C_GENDER = {
  MAN: '男',
  WOMEN: '女',
  UNKNOWN: '未知'
};

/**
 * 学历
 * @type {{JUNIOR: string, MASTER: string, SENIOR: string, COLLEGE: string, UNIVERSITY: string, DOCTOR: string}}
 */
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
  REGISTER: 'REGISTER', //注册时的验证码
  LOGIN: 'LOGIN', //验证码登录
  ALTER_PASSWORD: 'ALTER_PASSWORD', //通过旧密码，修改密码
  ALTER_PHONE: 'ALTER_PHONE', //修改手机号
  FORGET_PASSWORD: 'FORGET_PASSWORD', //忘记密码时，修改密码
  BIND: 'BIND', //绑定
};

/**
 * 支付类型
 * @type {{WX_MINI: string, WX_APP: string, WX_H5: string, WX_MP: string, ALI_MINI: string, ALI_H5: string, ALI_APP: string}}
 */
export const C_PAY = {
  WX_MINI: 'WX_MINI', //微信小程序
  WX_APP: 'WX_APP', //微信app
  WX_H5: 'WX_H5', //微信h5
  WX_MP: 'WX_MP', //微信公众号
  ALI_MINI: 'ALI_MINI', //支付宝小程序
  ALI_H5: 'ALI_H5', //支付宝h5
  ALI_APP: 'ALI_APP', //支付宝app
};

//文件接受类型
export const C_FILE = {
  IMAGE_ACCEPT: 'image/png,image/gif,image/jpg,image/jpeg',
  VIDEO_ACCEPT: 'video/mp4',
  AUDIO_ACCEPT: 'audio/mp3',
};

//各种审核状态
export const C_STATE = {
  IN_CERTIFICATION: 'IN_CERTIFICATION', //审核中，
  CERTIFICATION_PASS: 'CERTIFICATION_PASS', // 通过
  CERTIFICATION_FAIL: 'CERTIFICATION_FAIL'// /未通过
};
