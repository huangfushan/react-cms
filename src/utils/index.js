/**
 * utils
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */

import { getStorage, setStorage, removeStorage } from './storage';
import { timeFmt, timeFmtNext } from './time';
import { checkBankNo } from './bankno';
import { beforeUpload } from './image';
import { error } from './error';
import { getDiffObj, Converter, objToArr } from './data';
import { RegExp } from './regExp';

export {
  timeFmt,
  timeFmtNext,
  getStorage,
  setStorage,
  removeStorage,
  checkBankNo,
  beforeUpload,
  error,
  getDiffObj,
  RegExp,
  Converter,
  objToArr
};
