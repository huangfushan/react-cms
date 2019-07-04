/**
 * utils
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */

import { getStorage, setStorage, removeStorage } from './storage'; //缓存
import { timeFmt, timeFmtNext } from './time'; //时间相关
import { checkBankNo } from './bankno'; //银行卡相关
import { checkFile, fileToBase64, blobToFile, base64ToFile, isBase64, base64ToBlob } from './file'; //文件相关
import { error } from './error';
import { getDiffObj, objToArr, getUrlParams } from './data'; //关于数据的处理
import { RegExp } from './regExp'; //正则
import { PushAliOss } from './ali'; //阿里相关
import { isIE } from './browser'; //关于浏览器的相关操作

export {
  timeFmt,
  timeFmtNext,
  getStorage,
  setStorage,
  removeStorage,
  checkBankNo,
  checkFile,
  fileToBase64,
  blobToFile,
  base64ToFile,
  isBase64,
  error,
  getDiffObj,
  RegExp,
  objToArr,
  getUrlParams,
  PushAliOss,
  base64ToBlob,
  isIE,
};
