/**
 * utils
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */

import { getStorage, setStorage, removeStorage } from './storage';
import { timeFmt, timeFmtNext} from './time';
import { checkBankNo, checkBankNoForm } from './bankno';
import hide from './hide';
import { postData }  from './postData';
import { beforeUpload }  from './image';
import { error }  from './error';
import { getDiffObj, Converter, objToArr }  from './data';
import { RegExp }  from './RegExp';

export {
  timeFmt,
  timeFmtNext,
  getStorage,
  setStorage,
  removeStorage,
  checkBankNo,
  checkBankNoForm,
  hide,
  postData,
  beforeUpload,
  error,
  getDiffObj,
  RegExp,
  Converter,
  objToArr
}
