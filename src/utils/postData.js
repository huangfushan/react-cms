/**
 * 上传文件
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */

import { isEmpty } from 'lodash';

export const postData = (datas) => {
  if (isEmpty(datas)) {
    return null
  }

  const formData = new FormData();
  const dataName = Object.keys(datas);

  dataName.map((name) => {
    formData.append(name, datas[name]);
    return null
  });

  return formData
};

