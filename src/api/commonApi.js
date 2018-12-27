/**
 * commonApi
 * @Author: huangfs
 * @Date: 2018-11
 * @Project: cms
 */

import http from "./http";
import {postData} from "../utils/postData";

/**
 * 上传文件
 * @param params
 * @returns {Promise<*>}
 */
const pushFile = (params) => http.post(`/common/file`, postData(params));

/**
 * 上传图片base64
 * @param params
 * @return {*}
 */
const pushBase64 = (params) => http.post(`/common/file/base64`, params);

export default {
  pushFile,
  pushBase64
}
