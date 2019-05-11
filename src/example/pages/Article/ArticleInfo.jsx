/**
 * 文章详情
 * @Author: huangfushan
 * @Date: 2019-03-12 16:37
 * @Project: web-manager-admin
 */

import React from 'react';
import ArticleInfoItem from './components/ArticleInfoItem';
import Comments from './components/Comment';


export default () => {
  return (
    <React.Fragment>
      <ArticleInfoItem />
      <Comments />
    </React.Fragment>
  );
};
