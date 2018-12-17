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

/**
 * 上传图片base64
 * @param params
 * @return {*}
 */
const pushBase64 = (params) => http.post(`${C_API.IMAGE}/base64`, params);


export default {
  pushFile,
  pushBase64
}
