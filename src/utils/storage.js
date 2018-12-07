/**
 * 缓存
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */


//设置缓存
export const setStorage = (name, content) => {
  if (!name) return ;
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  sessionStorage.setItem(name, content)
};

//获取缓存
export const getStorage = name => {
  if (!name) return ;
  return sessionStorage.getItem(name)
};

//清除缓存
export const removeStorage = name => {
  if (!name) return ;
  return sessionStorage.removeItem(name)
};
