/**
 * 发生错误时待页面
 * @Author: huangfs
 * @Date: 2018-11-13
 * @Project: cms
 */
import React from 'react';
import { icon } from '../../images/images';

export default () => {
  return (
    <div style={style}>
      <img src={icon.error} alt='' style={{ width: '10rem' }} />
      <p>运行错误，请刷新浏览器重试~</p>
    </div>
  );
}

const style = {
  textAlign: 'center',
  paddingTop: '1rem'
};
