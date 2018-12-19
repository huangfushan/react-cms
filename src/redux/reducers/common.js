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
  badge:{}
});

export default handleActions({
  [Actions.common.updateBadge]: (state, { payload: badge }) => state.merge(badge),
}, INITIAL_STATE);
