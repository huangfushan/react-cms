/**
 * error
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */
import { message } from 'antd';
import { removeStorage } from './storage';
import { C_STORAGE } from '../common/constants';

/**
 * 后端返回状态码错误处理
 */
export const error = (err) => {
  if (err.notice) {
    message.error(err.notice);
  }
  if (err.status === 401) {
    removeStorage(C_STORAGE.KEY_SESSION);
    const errorMessage = '登录失效，请重新登录';
    console.error(errorMessage);
    return;
  }
  if (err.status === 404) {
    const errorMessage = '接口404';
    console.error(errorMessage);
    return;
  }
  if (err.status === 500) {
    const errorMessage = '服务异常';
    console.error(errorMessage);
    return;
  }
  console.error(err);
};


// import {removeStorage} from "./storage";
// import {C_STORAGE} from "../common/constants";
//
// /**
//  * 后端返回状态码错误处理
//  */
// export default class Err {
//
//   // 网络请求异常错误
//   static reqErr(err) {
//     if (err.notice){
//       console.error(err.notice)
//     }
//     if (err.status === 401) {
//       removeStorage(C_STORAGE.KEY_SESSION);
//       const errorMessage = '登录失效，请重新登录';
//       console.error(errorMessage);
//       return ;
//     }
//     if (err.status === 404) {
//       const errorMessage = '接口不存在';
//       console.error(errorMessage);
//       return ;
//     }
//     if (err.status === 500) {
//       const errorMessage = '服务异常';
//       console.error(errorMessage);
//       return ;
//     }
//     console.error(err);
//   }
// }
