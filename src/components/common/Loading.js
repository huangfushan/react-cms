/**
 * 加载中。。。
 * @Author: huangfs
 * @Date: 2018-11-22
 * @Project: cms
 */

import React from 'react';
import { icon } from '../../images/images';

export default () => {
  return (
    <div style={style.loading}>
      <img src={icon.loading} style={style.img} alt='' />
      <p>LOADING</p>
    </div>
  );
};

const style = {
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',

  img: {
    width: 40,
    height: 40,
    margin: 'auto',
    animation: 'Rotate-Loading infinite 2s linear',
  }
};
