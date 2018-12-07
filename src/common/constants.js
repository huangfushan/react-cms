const path = require('./config');

export const PROJECT_NAME_C = `${path.PROJECT_NAME}`;
export const X_CLIENT_TOKEN_C = `${path.PROJECT_CODE}:manager:merchant`; //token
export const PROJECT_HOST_C = process.env.PRODUCTION_ENV === 'prod' ? path.PROJECT_HOST_PROD : path.PROJECT_HOST_DEV; //只有发布到测试服或者正式服的时候才会用到。本地不会被添加到请求路径里去

/**
 * 技术支持
 * @type {{NAME: string, PATH: string}}
 */
export const AUTHOR_C = {
  TIME: '2018',
  NAME: '大愚科技提供技术支持',
  PATH: 'https://www.dayukeji.xin'
};
/**
 * API请求路径
 * @type {{HOST: string, PATH: string}}
 */
export const API_C = {
  HOST: `${PROJECT_HOST_C}/${path.PROJECT_CODE}/api`,
  PATH_NAME: `/merchant`,
  IMAGE: `/common/file`,//图片路径
  ADDRESS: `/static/address`,//三级联动地址路径
};
/**
 * 网络请求后端返回状态吗
 * @type {{OK: number, ERR_INVALID: number, ERR_NO_FOUND: number, ERR_UNKNOWN: number}}
 */
export const RESP_C = {
  OK: 0,
  ERR_INVALID: 401,
  ERR_NO_FOUND: 404,
  ERR_UNKNOWN: -999,
};

/**
 * 时间格式
 * @type {{Y: string, M: string, D: string, H: string, m: string, s: string, q: number, S: number}}
 */
export const TIME_C = {
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
 * @type {{KEY_SESSION: string, KEY_USER: string, KEY_PASSWORD: string}}
 */
export const STORAGE_C = {
  KEY_SESSION: 'session',
  KEY_USER: 'user',
  KEY_PASSWORD: 'password',
};

/**
 * 页码
 * @type {{PAGE: number, COUNT: number}}
 */
export const PAGE_NUMBER_C = {
  PAGE: 1,
  COUNT: 10,
};

export const ORDER_STATE = {
  ALL: '全部订单',
  UNSHIP: '待发货',
  SHIPED: '待收货',
  COMPLETE: '已完成'
};


export const  GENDER_TYPE = {
  MAN: '男',
  WOMEN: '女',
  UNKNOW: '未知'
};


export const GRADUATION_TYPE = {
  0: '在读',
  1: '已毕业'
};

export const EDUCATION_TYPE = {
  JUNIOR: '初中',
  SENIOR: '高中/中专',
  COLLEGE: '大专',
  UNIVERSITY: '本科',
  MASTER: '硕士',
  DOCTOR: '博士',
};

export const WITHDRAW_TYPE = {
  CERTIFYING: '处理中',
  PASS: '提现成功',
  UNPASS: '提现失败'
};

//首页类型选择
export const HOME_TYPE = {
  SALARY: '高薪',
  DISTANCE: '附近',
  DAY: '日结',
  LONG: '长期'
};

export const TIME_TYPE = {
  LONG: '长期',
  SHORT: '短期'
};

export const PERIOD_TYPE = {
  DAY: '日结',
  WEEK: '周结',
  MONTH: '月结',
  FINISH: '完工结'
};

//长期兼职里面的时间要求
export const MONTH_TYPE = {
  1: '一个月以上',
  2: '两个月以上',
  3: '三个月以上',
  4: '四个月以上',
  5: '五个月以上',
  6: '六个月以上'
};

//长期兼职里面的每周至少
export const WEEK_LIMIT = {
  1: '一天',
  2: '两天',
  3: '三天',
  4: '四天',
  5: '五天',
  6: '六天',
  7: '七天'
};

export const SEEK_STATE = {
  DELIVERED: '已投递',
  INTERESTED: '有意向',
  HIRED: '已录用'
};

export const JOB_STATE = {
  DELIVERED: '已接收',
  CANCELED: '已取消',
  IMPROPER: '不合适',
  INTERESTED: '请确认',
  REJECTED: '已拒绝',
  STOP: '已停止',
  HIRED: '已录用'
};

// 打卡方式
export const PUNCH_TYPE = {
  TIME: '时间',
  LOCAL: '定位',
  IMAGE: '图片'
};
