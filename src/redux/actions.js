/**
 * actions
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */
import isEmpty from 'lodash.isempty';
import { createActions } from 'redux-actions';
import authApi from '../api/authApi';
import { C_RESP, C_SESSION, C_STORAGE } from '../common/constants';
import { error, removeStorage, setStorage } from '../utils';
import http from '../api/http';
import commonApi from '../api/commonApi';

//
// 该文件包含所有 Redux 的 Action，`redux-actions` 文档看这里: https://redux-actions.js.org
// 为了可读性，每一个 action 只能占用一行，可以将相关的 actions 放到一个内嵌对象中。
//
// AsyncActions 为异步 action, 具体参考 `redux-thunk` 库，异步方法定义必须放到 actions
// 目录中，
//

const Actions = createActions({
  auth: {
    updateAuth: auth => ({
      ...auth,
      username: auth.username || '',
      isAuthenticated: !isEmpty(auth)
    }),
    clearAuth: () => {
      removeStorage(C_STORAGE.AUTH);
      return {
        session: null,
        isAuthenticated: false
      };
    }
  },
  env: {
    update: value => value
  },
  common: {
    update: value => value
  },
  address: value => value
});

const AsyncActions = {
  signIn: params => dispatch => authApi.signIn(params).then(() => {
    const resp = {
      status: 0,
      data: {
        session: '写死session，只能用于开发用'
      }
    };
    if (resp.status === C_RESP.OK) {
      http.setHeader(C_SESSION, resp.data.session);
      setStorage(C_STORAGE.AUTH, resp.data); //session
      dispatch(Actions.auth.updateAuth(resp.data));
    } else {
      error(resp);
    }
    return resp;
  }),
  signOut: () => dispatch => authApi.signOut().then(resp => {
    switch (resp.status) {
      case C_RESP.OK :
        dispatch(Actions.auth.clearAuth());
        break;
      case C_RESP.ERR_401:
        dispatch(Actions.auth.clearAuth());
        break;
      default:
        error(resp);
    }
  }),
  //获取国家列表
  fetchCountryList: () => dispatch => commonApi.fetchCountryList().then(resp => {
    switch (resp.status) {
      case C_RESP.OK :
        dispatch(Actions.common.update({
          country: resp.data.map(item => ({
            key: item,
            value: item,
          }))
        }));
        break;
      case C_RESP.ERR_401:
        dispatch(Actions.auth.clearAuth());
        break;
      default:
        error(resp);
    }
  }),
  //获取省份列表
  fetchProvinceList: () => dispatch => commonApi.fetchAddress('province').then(resp => {
    switch (resp.status) {
      case C_RESP.OK :
        dispatch(Actions.address({
          province: resp.data.map(item => ({
            key: item.id,
            value: item.name,
          }))
        }));
        break;
      case C_RESP.ERR_401:
        dispatch(Actions.auth.clearAuth());
        break;
      default:
        error(resp);
    }
  }),
  //获取市区列表
  fetchCityList: code => dispatch => commonApi.fetchAddress('city', code).then(resp => {
    switch (resp.status) {
      case C_RESP.OK :
        dispatch(Actions.address({
          city: resp.data.map(item => ({
            key: item.id,
            value: item.name,
          }))
        }));
        break;
      case C_RESP.ERR_401:
        dispatch(Actions.auth.clearAuth());
        break;
      default:
        error(resp);
    }
  }),
  //获取区县列表
  fetchCountyList: code => dispatch => commonApi.fetchAddress('county', code).then(resp => {
    switch (resp.status) {
      case C_RESP.OK :
        dispatch(Actions.address({
          county: resp.data.map(item => ({
            key: item.id,
            value: item.name,
          }))
        }));
        break;
      case C_RESP.ERR_401:
        dispatch(Actions.auth.clearAuth());
        break;
      default:
        error(resp);
    }
  }),
};

// export default merge(Actions, AsyncActions);
export {
  Actions,
  AsyncActions
};
