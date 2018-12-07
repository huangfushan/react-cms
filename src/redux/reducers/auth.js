/**
 * user
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */
import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import Actions from "../actions";

const INITIAL_STATE = Immutable({
  session: null,
  isAuthenticated: false
});

export default handleActions({
  [Actions.auth.updateAuth]: (state, {payload: user}) => state.merge(user),
  [Actions.auth.signOut]: (state, {payload: user}) => state.merge(user),
}, INITIAL_STATE);
