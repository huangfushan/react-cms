/**
 * 文章详情
 * @Author: huangfushan
 * @Date: 2019-03-12 17:23
 * @Project: web-manager-admin
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Spin } from 'antd';
import articleApi from '../../../../api/articleApi';
import { C_RESP, C_TIME } from '../../../../../common/constants';
import { error, timeFmt } from '../../../../../utils';
import { Actions } from '../../../../../redux/actions';
import { icon } from '../../../../../images/images';
import VideoPlay from '../../../../../components/common/VideoPlay';
import AudioPlay from '../../../../../components/common/AudioPlay';
import './index.less';

@connect(
  null,
  {
    clearAuth: Actions.auth.clearAuth
  }
)
@withRouter
export default class ArticleInfoItem extends React.Component {

  static proptypes = {
    clearAuth: PropTypes.func.isRequired,
  };

  state = {
    data: {},
    isFetching: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { params } = this.props.match;
    if (!params.id) return;
    this.setState({ isFetching: true });
    articleApi.fetchArticle(params.id).then(resp => {
      switch (resp.status) {
        case C_RESP.OK:
          this.setState({
            data: resp.data,
            isFetching: false,
          });
          break;
        case C_RESP.ERR_401:
          this.props.clearAuth();
          break;
        default:
          error(resp);
          break;
      }
    });
  };

  //滚动到指定元素
  handleGoComment = () => {
    let anchorElement = document.getElementById('comment-title');  // 定位到评论列表
    // 设置滚动行为改为平滑的滚动
    if (anchorElement) {
      window.scrollTo({ top: anchorElement.offsetTop, behavior: 'smooth' });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <Spin spinning={this.state.isFetching}>
        <div id="article-info">
          <div className="article-info-row row-1">
            <h3>{data.title}</h3>
            <img alt="" src={data.cover || icon.nothing} className="avatar" />
            <span>{data.author}</span>
            <span>{data.publishTime && timeFmt(data.publishTime, C_TIME.m)}</span>
          </div>
          <div className="article-info-row row-2">
            <Icon type="eye" />
            <span>{`${data.views || 0}次阅读`}</span>

            <Icon type="like" />
            <span>{`${data.praises || 0}个赞`}</span>

            <a onClick={this.handleGoComment}>
              <Icon type="sound" />
              <span>{`${data.comments || 0}条评论`}</span>
            </a>

            <Icon type="share-alt" />
            <span>{`${data.shares || 0}次分享`}</span>
          </div>
          {
            data.type === 'VIDEO' && data.media && (
              <VideoPlay
                title={data.media}
                url={data.media}
                style={{ height: '9rem', width: '16rem' }}
              />
            )
          }
          {
            data.type === 'AUDIO' && data.media && (
              <AudioPlay
                title={data.media}
                url={data.media}
                style={{ height: '9rem', width: '16rem' }}
              />
            )
          }
          <div className="article-info-row row-3" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </Spin>
    );
  }
}
