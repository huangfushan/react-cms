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
  province: [], //省份
  city: [],//市区
  county: [],//区县
  country: [],//国家
});

export default handleActions({
  [Actions.address]: (state, { payload: value }) => state.merge(value),
}, INITIAL_STATE);
