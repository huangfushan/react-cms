/**
 * auApi
 * @Author: huangfs
 * @Date: 2018-11
 * @Project: cms
 */

import http from './http';

export default {
  signIn: params => http.post(`/cms/auth`, params), // 登录
  signOut: () => http.delete(`/auth`), // 登出
  changePassword: params => http.patch(`/cms/auth/password`, params), //修改密码
  getUser: () => http.get(`/cms/auth`), //获取用户信息
}
