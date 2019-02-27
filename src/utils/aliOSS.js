/**
 * 日期
 * @Author: huangfs
 * @Date: 2018-10-27
 * @Project: cms
 */
import AliOss from 'ali-oss';
import { C_OSS, C_RESP } from '../common/constants';

/**
 * oss,  * "ali-oss": "^6.1.0",
 * @param ossKey 从后端拿到的osskey
 * @param  type: 文件类型， image图片， video视频，audio音频，file文件，如果不传，默认是file
 * @param file //文件
 * @param onProgress //progress
 * @return {*}
 */
export const pushAliOss = (ossKey, type = 'file', file, onProgress) => {

  if (ossKey.status !== C_RESP.OK) {
    return Promise.resolve({
      status: ossKey.status,
      notice: 'oss参数错误',
      msg: '获取oss签名失败',
    });
  }

  const folder = type => {
    switch (type) {
      case 'image':
        return C_OSS.IMAGE;
      case 'video':
        return C_OSS.VIDEO;
      case 'audio':
        return C_OSS.AUDIO;
      default:
        return C_OSS.FILE;
    }
  };
  //暂时不支持多文件上传
  return new Promise(resolve => {
    const client = new AliOss(ossKey.data);
    const suffix = /.*\.(\w+)$/.exec(file.name);
    if (!suffix && !suffix[1]) return;
    client.multipartUpload(`${folder(type)}/${new Date().getTime()}-${parseInt(Math.random() * 1000000000, 10)}.${suffix[1]}`, file, {
      progress: p => {
        if (!onProgress) {
          return;
        }
        onProgress(p);
      },
    }).then(resp => {
      if (!resp.res || resp.res.status !== 200) {
        resolve({
          status: -1000,
          notice: '服务异常，请稍后再试',
          msg: '上传到alioss失败',
        });
      }
      const ossUrl = `http://${resp.bucket}.${ossKey.data.region}.aliyuncs.com/${resp.name}`;
      resolve({
        status: 0,
        url: ossUrl,
      });
    });
  });
};


