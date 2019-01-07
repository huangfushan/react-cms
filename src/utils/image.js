/**
 * 关于图片的操作
 */

import { message } from 'antd';

//图片上传前判断大小和类型
export const beforeUpload = (file, allType = ['jpg', 'png', 'jpeg', 'gif'], maxSize = 5, type) => {
  let fileType = file.type;
  let { name } = file;
  if (!fileType) {
    fileType = name.split('.').pop();
  } else {
    fileType = fileType.split('/')[1];
  }
  const isJPG = allType.indexOf(fileType) > -1;
  if (!isJPG) {
    message.error('图片仅支持jpg，png，gif，jpeg格式');
    return false;
  }
  const isSize = file.size / 1024 / 1024 < maxSize;
  if (!isSize && isJPG) {
    message.error(`上传图片必须小于${maxSize}M!`);
    return false;
  }
  return isJPG && isSize;
};

//图片转base64
export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

//base64转文件
export const base64toFile = (base64, filename) => { //将base64转换为文件
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

//判断是否是base64， 是就返回截取后的base64信息数组
export const isBase64 = (value) => {
  if (!value) {
    return null;
  }
  //data:image/png;base64,
  //data:image/jpg;base64,
  //data:image/jpeg;base64,
  //data:image/gif;base64,
  // const reg = /^data:image\/([a-zA-Z]*);base64,(.+)$/;
  return /^data:image\/(\w+);base64,([\w=/+]+)$/.exec(value);
};




