/**
 * 关于文件相关操作
 */

import { message } from 'antd';
import { C_FILE } from '../common/constants';

const getType = type => {
  switch (type) {
    case 'image':
      return '图片';
    case 'video':
      return '视频';
    case 'audio':
      return '音频';
    default:
      return '文件';
  }
};

const getAccept = (accept, type) => {
  switch (type) {
    case 'image':
      return (accept || C_FILE.IMAGE_ACCEPT).split(',').map(item => item.split('image/')[1]);
    case 'video':
      return (accept || C_FILE.VIDEO_ACCEPT).split(',').map(item => item.split('video/')[1]);
    case 'audio':
      return (accept || C_FILE.VIDEO_ACCEPT).split(',').map(item => item.split('audio/')[1]);
    default:
      break;
  }
};

//文件上传前判断大小和类型
export const checkFile = (file, accept = ['jpg', 'png', 'jpeg', 'gif'], maxSize = 5, type = 'image') => {
  let fileType = file.type;
  let { name } = file;
  if (!fileType) {
    fileType = name.split('.').pop();
  } else {
    fileType = fileType.split('/')[1];
  }
  const isType = accept.indexOf(fileType) > -1;
  if (!isType) {
    message.error(`${getType(type)}仅支持${getAccept(accept, type)}格式`);
    return false;
  }
  const isSize = file.size / 1024 / 1024 < maxSize;
  if (!isSize && isType) {
    let sizeHint;
    if (maxSize && maxSize < 1) {
      sizeHint = `${maxSize * 1000} KB`;
    }
    if (maxSize && maxSize >= 1) {
      sizeHint = `${maxSize} MB`;
    }
    message.error(`${getType(type)}必须小于${sizeHint}!`);
    return false;
  }
  return isType && isSize;
};

//图片转base64
export const fileToBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

//base64转文件
export const base64ToFile = (base64, filename) => { //将base64转换为文件
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

//将base64转换为blob
export const base64ToBlob = (base64) => {
  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });

};

//将blob转换成file
export const blobToFile = (theBlob, fileName) => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
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




