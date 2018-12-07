/**
 * actions
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */
import { isEmpty, merge } from 'lodash';

import { createActions } from 'redux-actions';
import authApi from '../api/authApi';
import { RESP_C, STORAGE_C } from '../common/constants';
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
      isAuthenticated: !isEmpty(auth)
    }),
    signOut: () => {
      removeStorage(STORAGE_C.KEY_SESSION);
      return {
        session: null,
        isAuthenticated: false
      }
    }
  },
});

const AsyncActions = {
  signIn: params => dispatch => authApi.signIn(params).then(resp => {
    if (resp.status === RESP_C.OK) {
      http.setHeader(STORAGE_C.KEY_SESSION, resp.data.session);
      setStorage(STORAGE_C.KEY_SESSION, resp.data.session);
      dispatch(Actions.auth.updateAuth(resp.data));
    } else {
      error(resp);
    }
    return resp;
  }),
  signOut: () => dispatch => authApi.signOut().then(resp => {
    switch (resp.status){
      case RESP_C.OK :
        dispatch(Actions.auth.signOut());
        break;
      case RESP_C.ERR_INVALID:
        dispatch(Actions.auth.signOut());
        break;
      default:
        error(resp)
    }
  })
};

export default merge(Actions, AsyncActions);
