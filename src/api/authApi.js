/**
 * auApi
 * @Author: huangfs
 * @Date: 2018-11
 * @Project: cms
 */

import http from './http';
const url = `/merchant/auth`;

/**
 * 登录
 * @param params
 * @returns {Promise<*>}
 */
const signIn = (params) => http.post(url, params);

/**
 * 登出
 * @returns {*}
 */
const signOut = () => http.delete(url);

/**
 * 获取用户信息
 */
const getUser = () => http.get(url);

export default {
  signIn,
  signOut,
  getUser,
}
