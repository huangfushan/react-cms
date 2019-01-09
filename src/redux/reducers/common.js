/**
 * common
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */
import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import { Actions } from '../actions';

const INITIAL_STATE = Immutable({
  badge:{},
  language: 'cn'
});

export default handleActions({
  [Actions.common.update]: (state, { payload: value }) => state.merge(value),
}, INITIAL_STATE);
