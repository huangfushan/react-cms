/**
 * 没有数据
 * @Author: huangfs
 * @Date: 2018-11-22
 * @Project: cms
 */

import React from 'react';
import { icon } from '../../images/images';

const Nothing = () => {
  return (
    <div className="text-align-center">
      <img  src={icon.nothing} alt=''/>
      <p>暂无数据</p>
    </div>
  )
};

export default Nothing;
