/**
 * 评论列表
 * @Author: huangfushan
 * @Date: 2019-03-12 17:48
 * @Project: web-manager-admin
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { message, Spin, Popconfirm, Pagination } from 'antd';
import { C_PAGE_NUMBER, C_RESP } from '../../../../../common/constants';
import { error } from '../../../../../utils';
import { Actions } from '../../../../../redux/actions';
import articleApi from '../../../../api/articleApi';
import { icon } from '../../../../../images/images';
import './index.less';
import NoData from '../../../../../components/common/NoData';

@connect(
  null,
  {
    clearAuth: Actions.auth.clearAuth
  }
)
@withRouter
export default class Comment extends React.Component {

  static propTypes = {
    clearAuth: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  static defaultProps = {
    article: [],
    location: {}
  };

  state = {
    searchValue: {
      _page: C_PAGE_NUMBER.PAGE,
      _count: C_PAGE_NUMBER.COUNT,
    },
    data: {
      list: [],
      total: 0,
    },
    isFetching: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { params } = this.props.match;
    if (!params.id) return;
    const { searchValue } = this.state;
    this.setState({ isFetching: true });
    articleApi.fetchArticleComment(params.id, searchValue).then(resp => {
      switch (resp.status) {
        case C_RESP.OK:
          this.setState({
            data: resp.data,
            isFetching: false
          });
          break;
        case C_RESP.ERR_401:
          this.props.clearAuth();
          break;
        default:
          error(resp);
      }
    });
  };

  handleChangePage = _page => {
    const { searchValue } = this.state;
    const newValue = Object.assign({}, searchValue, { _page });
    this.setState({
        searchValue: newValue
      }, () => this.fetchData()
    );
  };

  handleRemoveComment = id => articleApi.removeArticleComment(id).then(resp => {
    switch (resp.status) {
      case C_RESP.OK:
        message.success('删除成功');
        this.fetchData();
        break;
      case C_RESP.ERR_401:
        this.props.clearAuth();
        break;
      default:
        error(resp);
        break;
    }
  });

  handleRemoveReply = (commentId, replyId) => articleApi.removeArticleCommentReply(replyId).then(resp => {
    switch (resp.status) {
      case C_RESP.OK:
        message.success('删除成功');
        this.updateData(commentId, replyId);
        break;
      case C_RESP.ERR_INVALID:
        this.props.clearAuth();
        break;
      default:
        error(resp);
        break;
    }
  });

  updateData = (commentId, replyId) => {
    const { data } = this.state;
    const item = data.list.find(n => n.id === commentId);
    if (item && item.reply) {
      item.reply = item.reply.filter(i => i.id !== replyId);
    }
    this.setState({ data });
  };

  render() {
    const pathname = this.props.location.pathname.split('/')[1];
    return (
      <React.Fragment>
        {
          (pathname !== 'subject') &&
          <h3 className="comment-title" id="comment-title">{`${this.state.data.total || 0} 条回答`}</h3>
        }
        <Spin spinning={this.state.isFetching}>
          {
            this.state.data.list && this.state.data.list.map((item, index) => (
              <div className="comment-item" key={index}>
                <img alt="头像" src={item.avarar || icon.nothing} />
                <div className="comment-item-content flex-1">
                  <div className="flex" style={{ paddingBottom: '.5rem' }}>
                    <div className="flex-1">
                      <h4>{item.author}</h4>
                      <p style={{ fontSize: '.875rem' }}>{item.content}</p>
                    </div>
                    <Popconfirm
                      placement="top"
                      title="确定删除本条评论"
                      onConfirm={() => this.handleRemoveComment(item.id)}
                      okText="确定"
                      cancelText="取消">
                      <a className="error-color delete">删除</a>
                    </Popconfirm>
                  </div>
                  {
                    item.reply && item.reply.map((n, i) => (
                      <div key={i} className="flex"
                           style={{ borderTop: '1px solid #eee', padding: '.5rem 0 .5rem .5rem' }}>
                        <div className="flex-1">
                          <h5>{`${n.sponsor} 回复 ${n.recipient}`}</h5>
                          <p style={{ fontSize: '.875rem' }}>{n.content}</p>
                        </div>
                        <Popconfirm
                          placement="top"
                          title="确定删除本条回复"
                          onConfirm={() => this.handleRemoveReply(item.id, n.id)}
                          okText="确定"
                          cancelText="取消">
                          <a className="error-color delete">删除</a>
                        </Popconfirm>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
          {
            this.state.data.total ? (
              <Pagination
                style={{ textAlign: 'center', margin: '1rem' }}
                showQuickJumper
                defaultCurrent={1}
                total={this.state.data.total}
                pageSize={this.state.searchValue._count}
                current={this.state.searchValue._page}
                onChange={this.handleChangePage} />
            ) : (
              <NoData />
            )
          }
        </Spin>
      </React.Fragment>
    );
  }
}
