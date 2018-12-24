/**
 * 处理数据
 * @Author: huangfs
 * @Date: 2018-10-28
 * @Project: cms
 */

//提取新对象与旧对象不同的地方，组成新对象
const getDiffObj = (oldValue, newValue) => {
  const value = {};
  for (let key in newValue){
    if (newValue[key] !== oldValue[key]){
      value[key] = newValue[key]
    }
  }
  return value
};

const Converter = {
  replay: key => (value, dest) => {
    dest[key] = value;
    return dest
  },
  exposure: (key) => (value, dest) => {
    dest[key] = value[key];
    return dest
  },
  detail: key => (value, dest) => {
    dest.detail.push({key, value});
    return dest;
  },
  enum: (key, map) => (value, dest) => {
    dest.detail.push({key, value: map[value]});
    return dest;
  },
  map: (src, map) => {
    return Object.entries(map).reduce((dest, [k, fn]) => {
      if (fn) {
        return fn(src[k], dest);
      } else {
        dest[k] = src[k];
      }
      return dest;
    }, {detail: []});
  }
};


const objToArr = (obj) => {
  let newArr = [];
  Object.keys(obj).forEach(item => {
    newArr.push({
      key: item,
      value: obj[item]
    })
  });
  return newArr
};


export {
  getDiffObj,
  Converter,
  objToArr
}
