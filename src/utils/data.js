/**
 * 处理数据
 * @Author: huangfs
 * @Date: 2018-10-28
 * @Project: cms
 */

//提取新对象与旧对象不同的地方，组成新对象
const getDiffObj = (oldValue, newValue) => {
  const value = {};
  for (let key in newValue) {
    if (newValue[key] !== oldValue[key]) {
      value[key] = newValue[key];
    }
  }
  return value;
};

const objToArr = (obj) => {
  let newArr = [];
  Object.keys(obj).forEach(item => {
    newArr.push({
      key: item,
      value: obj[item]
    });
  });
  return newArr;
};

//获取url中某个字段的值
const getUrlParams = (name, url = window.location.href) => {
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export {
  getDiffObj,
  objToArr,
  getUrlParams
};
