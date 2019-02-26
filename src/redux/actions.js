/**
 * actions
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */
import { isEmpty } from 'lodash';
import { createActions } from 'redux-actions';
import authApi from '../api/authApi';
import { C_RESP, C_STORAGE } from '../common/constants';
import { error, removeStorage, setStorage } from '../utils';
import http from '../api/http';

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
      removeStorage(C_STORAGE.KEY_AUTH);
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
  }
});

const AsyncActions = {
  signIn: params => dispatch => authApi.signIn(params).then(resp => {
    const res = {
      status: 0,
      data: {
          session: '4353543535354'
      }
    };
    if (res.status === C_RESP.OK) {
      http.setHeader(C_STORAGE.KEY_SESSION, res.data.session);
      setStorage(C_STORAGE.KEY_AUTH, res.data); //session
      dispatch(Actions.auth.updateAuth(res.data));
    } else {
      error(res);
    }
    return res;
  }),
  signOut: () => dispatch => authApi.signOut().then(resp => {
    switch (resp.status){
      case C_RESP.OK :
        dispatch(Actions.auth.clearAuth());
        break;
      case C_RESP.ERR_INVALID:
        dispatch(Actions.auth.clearAuth());
        break;
      default:
        error(resp)
    }
  })
};

// export default merge(Actions, AsyncActions);
export {
  Actions,
  AsyncActions
}
