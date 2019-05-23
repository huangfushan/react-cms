/**
 * commonApi
 * @Author: huangfs
 * @Date: 2018-11
 * @Project: cms
 */

import http from './http';
import isEmpty from 'lodash.isempty';
import { error } from '../utils/error';
import { C_RESP } from '../common/constants';

/**
 * 数据转文件
 * @param data
 * @return {*}
 */
export const postData = (data) => {
  if (isEmpty(data)) {
    return null;
  }

  const formData = new FormData();
  const dataName = Object.keys(data);

  dataName.map((name) => {
    formData.append(name, data[name]);
    return null;
  });

  return formData;
};

export default {
  fetchCaptcha: (phone, scene) => http.get(`/${phone}/captcha`, { scene }), //获取验证吗，scene代表场景
  pushFile: params => http.post(`/common/file`, postData(params)), //上传文件
  pushBase64: params => http.post(`/common/file/base64`, params), //上传base64格式
  downloadFile: uri => { //下载文件
    return new Promise(resolve => {
      http.get(uri).then(resp => {
        resolve(resp);
        if (resp.status !== C_RESP.OK) {
          error(resp);
          return;
        }
        if (!resp.data.url) return;
        const aTag = document.createElement('a');
        const filename = resp.data.url.split('/');
        aTag.setAttribute('href', resp.data.url);
        aTag.setAttribute('download', resp.data.filename || filename[filename.length - 1]);
        aTag.click();
        document.body.appendChild(aTag);
        aTag.click();
        setTimeout(function () {
          document.body.removeChild(aTag);
        }, 1000);
      });
    });
  },
  fetchCountryList: () => http.get(`/static/country.json`), //获取国家列表
  fetchAddress: (type, value) => {
    switch (type) {
      case 'province':
        return http.get(`/static/address/${type}.json`);
      case 'city':
        return http.get(`/static/address/${type}/${value}.json`);
      case 'county':
        return http.get(`/static/address/${type}/${value}00.json`);
      default:
        return Promise.resolve({
          status: 1000,
          notice: '',
          msg: '缺少获取三级联动的类型: province，city,county三者之一',
        });
    }
  },

//TODO，获取osskey
  /**
   * @params accessKeyId：通过阿里云控制台创建的access key。
   * @params accessKeySecret：通过阿里云控制台创建的access secret。
   * @params token： 使用临时授权方式
   * @params bucket：通过控制台创建的bucket。
   * @params region：bucket 所在的区域
   * @return {*}
   */
  fetchOssAccessKey: () => http.post(`/oss`, {
    VERB: 'GET',
    ContentMD5: '123j4i',
    ContentType: '123j4i',
    Date: '',
    CanonicalizedOSSHeaders: {},
    CanonicalizedResource: ''
  }), //获取oss KEY
};
