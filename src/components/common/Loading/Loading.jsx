/**
 * 加载中。。。
 * @Author: huangfs
 * @Date: 2018-11-22
 * @Project: cms
 */

import React from 'react';
import { icon } from '../../../images/images';
import './index.less';

export default () => {
  return (
    <div className="loading">
      <img src={icon.loading} alt='' />
      <p>LOADING</p>
    </div>
  );
};
