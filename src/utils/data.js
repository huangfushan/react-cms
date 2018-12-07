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


//通过key，拿到value
//这个方法写的不好，应该把data数组改成对象，然后返回对象中key对应的值
//下个项目做需求的时候需要改
const getKeyValue = (key, data) => {
  let STATE ;
  data.forEach(item => {
    if (key === item.key)
    {
      STATE = item.value
    }
  });
  return STATE
};

export {
  getDiffObj,
  getKeyValue
}
