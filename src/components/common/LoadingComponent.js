/**
 * 按需加载
 * @Author: huangfs
 * @Date: 2018-11-22
 * @Project: cms
 */

import React from 'react';
import Loading from './Loading';

const LoadingComponent = (props) => {
  if (props.error) {
    return <div>Sorry, there was a problem loading the page.</div>
  } else if (props.pastDelay) {
    //300ms之后显示
    return <Loading />
  } else {
    return null
  }
};

export default LoadingComponent
