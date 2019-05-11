/**
 * 文章列表
 * 平台没有设为精选和取消精选，改为置顶
 * 用户有设为精选和取消精选，设为精选会绑定平台相关类型，取消精选也取消绑定平台类别。也有置顶。取消精选，置顶也没了。
 * 用户发布文章平台不能编辑
 * @Author: huangfushan
 * @Date: 2019-03-12
 * @Project: cms
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popconfirm, message, Button, Dropdown, Menu, Modal, Tag } from 'antd';
import { C_PAGE_NUMBER, C_RESP, C_SERVICE, C_STATE, C_TIME } from '../../../common/constants';
import Tabs from '../../../components/antd/Tabs';
import Table from '../../../components/antd/Table';
import { error, objToArr, timeFmt } from '../../../utils';
import SearchHeader from './components/SearchHeader';
import { Actions } from '../../../redux/actions';
import articleApi from '../../api/articleApi';
import EditCarouselModal from './components/EditCarouselModal';

const ARTICLE = {
  S009: '高考直通车',
  S010: '考研驿站',
  S011: '出国留学',
  S012: '考公务员',
  S013: '求职社区',
  S014: '创业资讯',
};

@connect(
  state => ({
    service: state.common.service,
  }),
  {
    clearAuth: Actions.auth.clearAuth,
  }
)
export default class ArticleList extends React.Component {

  static propTypes = {
    clearAuth: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    service: PropTypes.array.isRequired,
  };

  static defaultProps = {
    location: {},
    service: []
  };

  state = {
    searchValue: {
      _page: C_PAGE_NUMBER.PAGE,
      _count: C_PAGE_NUMBER.COUNT,
      state: C_STATE.CERTIFICATION_PASS, // 文章状态，IN_CERTIFICATION审核中，CERTIFICATION_PASS通过，CERTIFICATION_FAIL未通过，undefined获取全部
      isPlatform: 1, //是否平台发布， 1平台，0用户，undefined全部
      filter: undefined, //检索
      serviceId: this.props.location.pathname.split('/article/')[1] || undefined, //类型，
      isFeatured: this.props.location.pathname === '/recommend/article' ? 1 : undefined, //是否精选， 1精选，0不精选，undefined全部
    },
    data: {
      list: [],
      total: 0,
    },
    isFetching: false,
    currentValue: {},
    carouselType: '', //轮播类型
    isEditCarouselModal: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { searchValue } = this.state;
    this.setState({ isFetching: true });
    articleApi.fetchArticleList(searchValue).then(resp => {
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

  handleChange = value => {
    const { searchValue } = this.state;
    const newValue = Object.assign({}, searchValue, value);
    this.setState({
        searchValue: newValue
      }, () => this.fetchData()
    );
  };

  handleChangeTag = value => {
    this.handleChange({ isPlatform: parseInt(value, 10), _page: C_PAGE_NUMBER.PAGE });
  };

  handleRemove = id => articleApi.removeArticle(id).then(resp => {
    switch (resp.status) {
      case C_RESP.OK:
        message.success('操作成功');
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

  //精选
  handleChangeIsFeatured = (articleId, groupId) => articleApi.updateArticleIsFeatured(articleId, { groupId }).then(resp => {
    switch (resp.status) {
      case C_RESP.OK:
        message.success('操作成功');
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

  //置顶反选
  handleChangeIsRecommend = id => articleApi.updateArticleIsRecommend(id).then(resp => {
    switch (resp.status) {
      case C_RESP.OK:
        message.success('操作成功');
        this.updateData(id, 'isRecommend');
        break;
      case C_RESP.ERR_401:
        this.props.clearAuth();
        break;
      default:
        error(resp);
        break;
    }
  });

  //修改本页轮播
  handleChangeCurrentPageCarousel = (id, params) => articleApi.updateArticleIsCurrentPageCarousel(id, params).then(resp => {
    switch (resp.status) {
      case C_RESP.OK:
        message.success('操作成功');
        this.updateData(id, 'isCurrentPageCarousel');
        this.handleCloseCarouselModal();
        break;
      case C_RESP.ERR_401:
        this.props.clearAuth();
        break;
      default:
        error(resp);
        break;
    }
  });

  //修改首页轮播
  handleChangeHomepageCarousel = (id, params) => articleApi.updateArticleIsHomepageCarousel(id, params).then(resp => {
    switch (resp.status) {
      case C_RESP.OK:
        message.success('操作成功');
        this.updateData(id, 'isHomepageCarousel');
        this.handleCloseCarouselModal();
        break;
      case C_RESP.ERR_401:
        this.props.clearAuth();
        break;
      default:
        error(resp);
        break;
    }
  });

  updateData = (id, field) => {
    const { data } = this.state;
    (data.list.find(n => n.id === id)[field] === 1) ? (data.list.find(n => n.id === id)[field] = 0) : (data.list.find(n => n.id === id)[field] = 1);
    this.setState({ data });
  };

  addArticle = () => {
    const { pathname } = this.props.location;
    const serviceId = pathname.split('/article/')[1] || undefined;
    if (pathname === '/recommend/article') {
      return '推荐文章';
    }
    if (serviceId) {
      return (
        <Button>
          <Link to={`/article/add?service=${serviceId}`}>发布文章</Link>
        </Button>
      );
    }

    const menu = (
      <Menu>
        {
          Object.keys(ARTICLE).map((item, index) => (
            <Menu.Item key={index}>
              <Link to={`/article/add?service=${item}`}>{ARTICLE[item]}</Link>
            </Menu.Item>
          ))
        }
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button>发布文章</Button>
      </Dropdown>
    );
  };

  //根据文章的serviceId判断单曲的类型，去匹配对于的子类型group
  //设为精选时，需要先选择某种子类型，才能提交
  handleGetIsFeaturedMenu = (record, service, key) => (
    <Menu>
      {
        service.map(item => {
          if (!item.id) return null;
          const path = key ? `${key}_${item.id}` : item.id;
          if (item.group && item.group.length > 0) {
            return (
              <Menu.SubMenu
                key={path}
                title={item.name}>
                {
                  this.handleGetIsFeaturedMenu(record, item.group, path)
                }
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item key={path}>
                <a onClick={() => this.openIsFeaturedModal(record, item)}>{item.name}</a>
              </Menu.Item>
            );
          }
        })
      }
    </Menu>
  );

  openIsFeaturedModal = (record, group) => {
    Modal.confirm({
      title: `确定设置 '${record.title}' 为精选？`,
      content: `类型：${group.name}`,
      onOk: () => this.handleChangeIsFeatured(record.id, group.id),
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  handleOpenCarouselModal = (record = {}, carouselType) => {
    this.setState({
      isEditCarouselModal: true,
      currentValue: record,
      carouselType: carouselType
    });
  };

  handleCloseCarouselModal = () => {
    this.setState({ isEditCarouselModal: false });
  };

  handleChangeCarousel = (id, params, carouselType) => {
    if (carouselType === 'isCurrentPageCarousel') return this.handleChangeCurrentPageCarousel(id, params);
    if (carouselType === 'isHomepageCarousel') return this.handleChangeHomepageCarousel(id, params);
  };

  handleCertifyCationArticle = (id, state) => articleApi.updateArticleState(id, { state }).then(resp => {
    switch (resp.status) {
      case C_RESP.OK:
        message.success('操作成功');
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

  render() {
    const colors = {
      S009: 'green',
      S010: 'blue',
      S011: 'orange',
      S012: 'red',
      S013: 'cyan',
      S014: 'magenta',
    };
    const columns = [
      { title: '文章标题', dataIndex: 'title', key: 'title' },
      {
        title: '类别',
        dataIndex: 'serviceId',
        render: text => text && <Tag color={colors[text]}>{ARTICLE[text] || '暂无'}</Tag>
      },
      { title: '投稿类型', dataIndex: 'group', render: text => (text && text.name) || '暂无' },
      { title: '发现分类', dataIndex: 'category', render: text => (text && text.name) || '暂无' },
      { title: '发布者', dataIndex: 'author', key: 'author' },
      { title: '发布时间', dataIndex: 'publishTime', render: text => text ? timeFmt(text, C_TIME.s) : '无' },
      {
        title: '状态', dataIndex: 'state', render: text => {
          switch (text) {
            case C_STATE.IN_CERTIFICATION:
              return '待审核';
            case C_STATE.CERTIFICATION_PASS:
              return '已通过';
            case C_STATE.CERTIFICATION_FAIL:
              return '未通过';
            default:
              return null;
          }
        }
      },
      {
        title: '操作', dataIndex: 'remark', render: (text, record) => (
          <React.Fragment>
            {
              record.isPlatform === 1 && <Link to={`/article/${record.id}/update?service=${record.serviceId}`}>编辑</Link>
            }
            <Link to={`/article/${record.id}`}>查看详情</Link>
            {
              record.state === C_STATE.CERTIFICATION_PASS && (
                <React.Fragment>
                  <Popconfirm
                    placement="top"
                    title={record.isRcommend ? '确定取消置顶？' : '确定设为置顶？'}
                    onConfirm={() => this.handleChangeIsRecommend(record.id)}
                    okText="确定"
                    cancelText="取消">
                    <a>{record.isRcommend ? '取消置顶' : '置顶'}</a>
                  </Popconfirm>
                  {
                    !record.isPlatform && (
                      !record.isFeatured ? (
                        <Dropdown
                          overlay={() => this.handleGetIsFeaturedMenu(record, this.props.service.map(item => Object.keys(C_SERVICE).some(n => n === item.id) && item))}
                          placement="bottomCenter">
                          <a>设为精选</a>
                        </Dropdown>
                      ) : (
                        <Popconfirm
                          placement="top"
                          title={record.isFeatured ? `确定取消精选？` : `确定设为精选？`}
                          onConfirm={() => this.handleChangeIsFeatured(record.id)}
                          okText="确定"
                          cancelText="取消">
                          <a>{record.isFeatured ? '取消精选' : '设为精选'}</a>
                        </Popconfirm>
                      )
                    )
                  }
                  {
                    record.isCurrentPageCarousel ? (
                      <Popconfirm
                        placement="top"
                        title='确定取消本页轮播？'
                        onConfirm={() => this.handleChangeCurrentPageCarousel(record.id)}
                        okText="确定"
                        cancelText="取消">
                        <a>取消本页轮播</a>
                      </Popconfirm>
                    ) : (
                      <a onClick={() => this.handleOpenCarouselModal(record, 'isCurrentPageCarousel')}>设为本页轮播</a>
                    )
                  }
                  {
                    record.isHomepageCarousel ? (
                      <Popconfirm
                        placement="top"
                        title='确定取消首页轮播？'
                        onConfirm={() => this.handleChangeHomepageCarousel(record.id)}
                        okText="确定"
                        cancelText="取消">
                        <a>取消首页轮播</a>
                      </Popconfirm>
                    ) : (
                      <a onClick={() => this.handleOpenCarouselModal(record, 'isHomepageCarousel')}>设为首页轮播</a>
                    )
                  }
                </React.Fragment>
              )
            }
            <Popconfirm
              placement="top"
              title="确定删除该数据"
              onConfirm={() => this.handleRemove(record.id)}
              okText="确定"
              cancelText="取消">
              <a className="error-color">删除</a>
            </Popconfirm>
            {
              !record.isPlatform && record.state === C_STATE.IN_CERTIFICATION && (
                <React.Fragment>
                  <a className="success-color"
                     onClick={() => this.handleCertifyCationArticle(record.id, C_STATE.CERTIFICATION_PASS)}>通过</a>
                  <a className="error-color"
                     onClick={() => this.handleCertifyCationArticle(record.id, C_STATE.CERTIFICATION_PASS)}>不通过</a>
                </React.Fragment>
              )
            }
          </React.Fragment>
        )
      }
    ];
    return (
      <React.Fragment>
        <div className="flex-between">
          {this.addArticle()}
          <SearchHeader
            isPlatform={this.state.searchValue.isPlatform}
            handleSearchChange={this.handleChange}
            selectData={objToArr(ARTICLE) || []} />
        </div>
        <Tabs onChange={this.handleChangeTag} data={[{ key: 1, value: '平台发布' }, { key: 0, name: '用户发布' }]}>
          <Table
            _page={this.state.searchValue._page}
            list={this.state.data.list}
            total={this.state.data.total}
            columns={columns}
            onChange={this.handleChange}
            isFetching={this.state.isFetching} />
        </Tabs>
        <EditCarouselModal
          carouselType={this.state.carouselType}
          value={this.state.currentValue}
          visible={this.state.isEditCarouselModal}
          handleSubmit={this.handleChangeCarousel}
          handleCancel={this.handleCloseCarouselModal}
        />
      </React.Fragment>
    );
  }
}
