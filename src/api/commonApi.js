/**
 * commonApi
 * @Author: huangfs
 * @Date: 2018-11
 * @Project: cms
 */

import { C_API } from '../common/constants';
import http from "./http";
import {postData} from "../utils/postData";

/**
 * 上传文件
 * @param params
 * @returns {Promise<*>}
 */
const pushFile = (params) => http.post(C_API.IMAGE, postData(params));

export default {
  pushFile
}
