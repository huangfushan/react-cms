/**
 * check
 * @Author: huangfs
 * @Date: 2018-10-30
 * @Project: cms
 */

import { message } from 'antd';
import Lang from './lang';
import Rules from './rules';

export default class Check {
  data = {
    input: {}
  };
  // 判断字符串是否为空
  static isEmpty(str) {
    return Lang.isEmpty(str);
  }

  // 判断字符串是否不为空
  static isNotEmpty(str) {
    return !Lang.isEmpty(str);
  }

  // // 提示错误（调用FormTips）
  // tips(message) {
  //   this.$invoke('Tips', 'show', message);
  // }

  // 校验
  static check(rules) {
    for (let rule of rules) {
      const value = rule.value;
      if (rule.method !== 'noDuplicate' && Lang.isArray(value)) {
        // 数组校验每个值
        for (let innerValue of value) {
          const isValid = this.execCheck(rule, innerValue);
          if (!isValid) {
            return false;
          }
        }
      } else {
        // 单元素直接校验
        const isValid = this.execCheck(rule, value);
        if (!isValid) {
          return false;
        }
      }
    }
    return true;
  }

  static execCheck(rule, value) {
    const method = Rules[rule.method].bind(Rules);
    const isValid = method(value, rule.param);
    if (!isValid) {
      message.error(rule.message);
      return false;
    }
    return true;
  }

  onInput(e) {
    const fieldName = e.currentTarget.id;
    this.input[fieldName] = e.detail.value;
  }

  // methods = {
  //   // 处理输入事件
  //   input(e) {
  //     const fieldName = e.currentTarget.id;
  //     this.input[fieldName] = e.detail.value;
  //   },
  //   // 处理单选事件
  //   radio(e) {
  //     const fieldName = e.currentTarget.id;
  //     this.input[fieldName] = e.detail.value;
  //   }
  // };
}

