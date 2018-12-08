/**
 * 封装apisauce
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */

import ApiSauce from 'apisauce'
import { message } from 'antd';
import {C_API, C_X_CLIENT_TOKEN} from "../common/constants";

const filterResponse = (resp) => {
  if (resp.ok) {
    return resp.data;
  }
  else {
    const data = {
      status: resp.status,
      message: 'have some error happened?',
    };
    switch (resp.problem) {
      case ApiSauce.NETWORK_ERROR:
      case ApiSauce.TIMEOUT_ERROR:
        data.message = '网络请求超时';
        message.warn(data.message);
        break
      case ApiSauce.CONNECTION_ERROR:
      case ApiSauce.CLIENT_ERROR:
      case ApiSauce.SERVER_ERROR:
      default:
        console.log(resp);
    }
    return data;
  }
};


class HTTP {
  constructor(host, config) {
    this._agent = ApiSauce.create({
      baseURL: host,
      timeout: 10000, // 10 seconds default.
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

  get = (url, params = {} ) => {
    return this._agent.get(url, params ).then(filterResponse);
  };

  post = (uri, params) => {
    return this._agent.post(uri, params).then(filterResponse);
  };

  put = (uri, params) => {
    return this._agent.put(uri, params).then(filterResponse);
  };

  patch = (uri, params) => {
    return this._agent.patch(uri, params).then(filterResponse);
  };

  delete = (uri, params) => {
    return this._agent.delete(uri, params).then(filterResponse);
  };
}


const http = new HTTP(
    process.env.NODE_ENV === 'production' ? C_API.HOST : '',
  {
    headers: {
      'X-Client-Token': C_X_CLIENT_TOKEN,
    }
  }
);

export default http
