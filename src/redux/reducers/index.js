/**
 * index
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */

import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';

export default combineReducers({
  auth,
  common
});
