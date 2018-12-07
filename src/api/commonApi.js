/**
 * commonApi
 * @Author: huangfs
 * @Date: 2018-11
 * @Project: cms
 */

import { API_C } from '../common/constants';
import http from "./http";
import {postData} from "../utils/postData";

/**
 * 上传文件
 * @param params
 * @returns {Promise<*>}
 */
const pushFile = (params) => http.post(API_C.IMAGE, postData(params));

export default {
  pushFile
}
