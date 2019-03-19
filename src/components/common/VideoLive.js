/**
 * 视频播放器
 * @Author: huangfs
 * @Date: 2018-11-16
 * @Project: cms
 */

import React from 'react';
import ReactPlayer from 'react-player'

export default class VideoLive extends React.Component {
    render () {
        return (
            <ReactPlayer
                url='http://3891.liveplay.myqcloud.com/live/3891_user_e991b83a_36ab.m3u8'
                playing
                width={'100%'}
                loop={true}
                controls={true}
            />
        )
    }
}


