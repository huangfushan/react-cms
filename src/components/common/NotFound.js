/**
 * 404页面
 * @Author: huangfs
 * @Date: 2018-11-13
 * @Project: cms
 */

import React from 'react';
import { icon } from '../../images/images';

export default class NotFound extends React.Component {

  render() {
    return (
      <div style={style}>
        <img src={icon['404']} alt=''/>
        <p>未找到页面！</p>
      </div>
    )
  }
}

const style = {
  textAlign: 'center',
  marginTop: 100
};
