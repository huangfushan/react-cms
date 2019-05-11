/**
 * error
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */
import { message } from 'antd';
import { removeStorage } from './storage';
import { C_RESP, C_STORAGE } from '../common/constants';

/**
 * 后端返回状态码错误处理
 */
export const error = (err) => {
  if (err.notice) {
    message.error(err.notice);
  }
  if (err.status === C_RESP.ERR_401) {
    removeStorage(C_STORAGE.AUTH);
    console.error('登录失效，请重新登录');
    return;
  }
  console.error(err);
};
