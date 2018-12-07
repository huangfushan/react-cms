import { message } from 'antd';

// export const imageType = (file) => {
//   const picture_type = file.type;
//
//   if (picture_type  === 'image/jpeg' || picture_type  === 'image/png' || picture_type  === 'image/gif') {
//
//     return true ;
//   }
//   message.error('仅支持jpg，png，gif格式');
// };
//
//
// export const imageSize = (file) => {
//   const picture_size = file.size / 1024 / 1024 < 10;
//   if (!picture_size) {
//     message.error('图片不能大于10MB');
//   }
//   return picture_size;
// };

export const beforeUpload = (file,allType = ['jpg','png','jpeg', 'gif'],maxSize= 5, type) =>  {
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
  return  isJPG && isSize;
};


export const getBase64 = (img, callback)  => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};


//判断是否是base64， 是就返回截取后的base64
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





