/**
 * 面包屑
 * @Author: huangfs
 * @Date: 2018-11-22
 * @Project: cms
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Crumbs = (value) => {

  let arr = [];
  for (let key in value.value) {
    arr.push({
      key:key,
      value:value.value[key],
    })
  }

  const item = arr.map((item, index) => {
    return (
      <span key={index}>
        <Link to={`/${item.key}`} >{item.value}</Link>
        <span>{' > '}</span>
      </span>
    )
  });

  return (
    <div style={style} className={value.className}>
      {
        item
      }
      <span>{value.title || "详情"}</span>
    </div>
  )
};

export default Crumbs;

const style = {

  // margin: '30px 0 30px 0'
};
