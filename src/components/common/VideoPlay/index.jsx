/**
 * 视频播放组件
 * @Author: huangfushan
 * @Date: 2019-03-16 16:24
 * @Project: web-manager-admin
 */
import React from 'react';
import './index.less';

export default ({ url, cover, style, loop }) => {

  return (
    <div className="media-video" style={{ ...style, backgroundImage: `url(${cover})` }}>
      <video
        src={url} //视频地址
        controls="controls" //允许用户播放
        poster={cover} //封面
        preload="metadata" //抓取元数据（比如：长度）
        loop={loop} //循环播放
        width='100%'
        height='100%'
      >
        抱歉，您的浏览器不支持内嵌视频，
      </video>
    </div>
  );
}
