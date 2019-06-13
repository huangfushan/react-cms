/**
 * 封装apisauce
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */

import ApiSauce from 'apisauce';
import { message } from 'antd';
import { C_API, C_X_CLIENT_TOKEN } from '../common/constants';

const httpResponse = (resp) => {
  if (resp.ok) {
    return resp.data;
  } else {
    const data = {
      status: resp.status,
      problem: resp.problem,
      message: 'have some error happened',
    };

    switch (resp.problem) {
      case ApiSauce.CLIENT_ERROR:
        data.message = `http：客户端错误400-499`;
        break;
      case ApiSauce.TIMEOUT_ERROR:
        data.message = `http：网络请求超时`;
        message.warn('网络请求超时');
        break;
      case ApiSauce.CONNECTION_ERROR:
        data.message = `http：连接错误`;
        break;
      case ApiSauce.NETWORK_ERROR:
        data.message = `http：网络错误`;
        break;
      case ApiSauce.SERVER_ERROR:
        data.message = `http：服务错误`;
        break;
      default:
        console.log(resp);
        break;
    }
    return data;
  }
};


class HTTP {
  constructor(host, timeout, config) {
    this._agent = ApiSauce.create({
      baseURL: host,
      timeout: timeout,
      ...config,
    });
  }

  setHeader = (key, value) => {
    if (!key || !value) return;
    this._agent.setHeader(key, value);
  };

  removeHeader = (key) => {
    if (!key) return;
    this._agent.deleteHeader(key);
  };

  get = (url, params = {}) => {
    return this._agent.get(url, params).then(httpResponse);
  };

  post = (uri, params) => {
    return this._agent.post(uri, params).then(httpResponse);
  };

  put = (uri, params) => {
    return this._agent.put(uri, params).then(httpResponse);
  };

  patch = (uri, params) => {
    return this._agent.patch(uri, params).then(httpResponse);
  };

  delete = (uri, params) => {
    return this._agent.delete(uri, params).then(httpResponse);
  };
}


const http = new HTTP(
  C_API.HOST_PATH,
  C_API.TIMEOUT,
  {
    headers: {
      'X-Client-Token': C_X_CLIENT_TOKEN,
    }
  }
);

export default http;
