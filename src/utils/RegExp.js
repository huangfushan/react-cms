/**
 * regularConfig
 * @Author: huangfs
 * @Date: 2018-10-30
 * @Project: cms
 */

export const RegExp = {
  idNumber: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  phone: /^1[345678]\d{9}$/,
  password: /^[a-zA-Z0-9_]{6,16}$/,
  price: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
};
