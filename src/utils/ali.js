/**
 * 阿里相关服务
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */

/**
 * oss,  * "ali-oss": "^6.1.0",
 * @param  type: 文件类型， image图片， video视频，audio音频，file文件，如果不传，默认是file
 * @param file //文件
 * @param onProgress //progress
 * @return {*}
 */
import AliOss from 'ali-oss';
import { C_RESP } from '../common/constants';
import commonApi from '../api/commonApi';

const path = require('../common/config');

//ali oss对象存储
export class PushAliOss {

  constructor(file, type = 'file', onProgress) {
    this.file = file;
    this.type = type;
    this.onProgress = onProgress;
  }

  //开始上传
  uploader() {
    return fetchAliOssKey().then(ossKey => {
      if (ossKey.status !== C_RESP.OK) {
        return ossKey;
      }
      return new Promise(resolve => {
        this.client = new AliOss(ossKey.data);
        const suffix = /.*\.(\w+)$/.exec(this.file.name);
        if (!suffix && !suffix[1]) return;
        this.client.multipartUpload(`${folder(this.type)}/${new Date().getTime()}-${parseInt(Math.random() * 1000000000, 10)}.${suffix[1]}`, this.file, {
          progress: p => {
            if (this.onProgress) {
              this.onProgress(p);
            }
          },
        }).then(resp => {
          if (!resp.res || resp.res.status !== C_RESP.SUCCESS) {
            resolve({
              status: C_RESP.ERR_FAIL,
              notice: '上传失败，请稍后再试',
              msg: '上传到ali oss失败，可能因为网络等问题',
            });
          }
          const ossUrl = `https://${resp.bucket}.${ossKey.data.region}.aliyuncs.com/${resp.name}`;
          resolve({
            status: 0,
            url: ossUrl,
            name: this.file.name,
          });
        });
      }).catch(() => ({
        status: C_RESP.ERR_FAIL,
        notice: '上传失败，请稍后再试',
        msg: '向后端获取key成功，但是创建aliOss对象失败，需要检测后端给的key是否正确',
      }));
    });
  }

  //取消上传进程，不过前提是当前进程在进行时
  cancel() {
    if (this.client) {
      this.client.cancel();
    }
  }

}

//获取oss key
const fetchAliOssKey = () => commonApi.fetchOssAccessKey().then(ossKey => {

  if (ossKey.status !== C_RESP.OK) {
    return {
      status: C_RESP.ERR_FAIL,
      notice: 'oss参数错误',
      msg: '向后端获取oss签名失败',
    };
  }

  return ossKey;
});

//获取文件夹路径
const folder = type => {
  const host = `${path.PROJECT_CODE}/${process.env.PRODUCTION_ENV || 'dev'}/${path.PROJECT_PORT}`;
  switch (type) {
    case 'image':
      return `${host}/image`;
    case 'video':
      return `${host}/video`;
    case 'audio':
      return `${host}/audio`;
    case 'file':
      return `${host}/file`;
    default:
      return `${host}/file`;
  }
};
