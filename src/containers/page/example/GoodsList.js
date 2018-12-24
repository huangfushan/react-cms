/**
 * 轮播图
 * @Author: huangfs
 * @Date: 2018-11-02
 * @Project: web-manager
 */

import React from 'react';
import { message, Spin, Button } from 'antd';
import { connect } from 'react-redux';
import orderApi from '../../../api/orderApi';
import { Actions } from '../../../redux/actions';
import { C_PAGE_NUMBER } from '../../../common/constants';
import Cards from '../../../components/common/Cards';
import { Converter, error } from '../../../utils';

@connect(
  state => ({
    session: state.auth.session
  }),
  {
    clearAuth: Actions.auth.clearAuth
  }
)

export default class Carousel extends React.Component {

  state = {
    data: {
      total: 0,
      list: []
    },
    searchValue: {
      _page: C_PAGE_NUMBER.PAGE,
      _count: 12
    },
    currentValue: {}
  };

  componentDidMount() {
    this.fetchData();
  }

  handleChange = (value) => {
    const searchValue = Object.assign({}, this.state.searchValue, value);
    this.setState({
      searchValue
    }, () => this.fetchData());
  };

  /**
   * 分页获取轮播图列表
   */
  fetchData = () => {
    const { searchValue } = this.state;
    this.setState({ isFetching: true });
    orderApi.fetchOrderList( searchValue).then(resp => {
      this.setState({ isFetching: false });
      switch (resp.status) {
        case 0:
          this.setState({
            data: resp.data
          });
          break;
        case 401:
          this.props.clearAuth();
          break;
        default:
          error(resp)
      }
    });
  };

  handleEdit = (value) => {
    if (value && value.oldData && value.oldData.id) {
      this.props.history.push(`/goods/${value.id}`);
    } else {
      this.props.history.push('/goods/add');
    }
  };

  handleRemove = (value) => {
    this.setState({
      removeModalVisible: true,
      currentValue: value
    })
  };
  //
  // //关闭弹窗
  // handleCancel = () => {
  //   this.setState({
  //     removeModalVisible: false
  //   });
  // };
  //
  // handleSuccess = () => {
  //   this.setState({
  //     removeModalVisible: false
  //   });
  //   this.handleChange({ _page: C_PAGE_NUMBER.PAGE });
  // };

  // handleSubmit = () => {
  //   const { session } = this.props;
  //   const { currentValue } = this.state;
  //   this.setState({ confirmLoading: true });
  //   newsApi.removeCarousel(session, currentValue.id).then(resp => {
  //     this.setState({ confirmLoading: false });
  //     if (resp.status !== 200) return;
  //     switch (resp.data.status) {
  //       case 0:
  //         message.success('操作成功');
  //         this.handleSuccess();
  //         break;
  //       case 401:
  //         this.props.authError();
  //         break;
  //       default:
  //         if (resp.data.notice) {
  //           message.error(resp.data.notice);
  //         }
  //         console.error(resp);
  //     }
  //   });
  // };
  render() {
    const { data } = this.state;
    const map = {
      cover: null,
      refId: null,
      title: null,
      refType: Converter.enum('类型', {
        NEWS: '文章',
        COMPETITION: '赛事',
        QUIZ: '竞猜',
        NONE: '无',
      }),
      isAdv: Converter.enum('广告', {
        1: '是',
        0: '否',
      })
    };
    const pagination = {
      _page: this.state.searchValue._page,
      _count: this.state.searchValue._count,
    };
    const actions = [
      { name: '编辑', onClick: this.handleEdit },
      { name: '删除', onClick: this.handleRemove },
    ];
    return (
      <Spin spinning={this.state.isFetching}>
        <div style={{ background: '#fff', margin: 16, padding: 10 }}>
          <Button onClick={() => this.handleEdit()}>新建</Button>
          <Cards
            columns={4}
            data={data}
            action={actions}
            map={map}
            pagination={pagination}
            onChange={this.handleChange}
          />
        </div>
        {/*<Modal*/}
          {/*width={600}*/}
          {/*mode={false}*/}
          {/*handleCancel={this.handleCancel}*/}
          {/*handleSubmit={this.handleSubmit}*/}
          {/*visible={this.state.removeModalVisible}*/}
          {/*confirmLoading={this.state.confirmLoading} >*/}
          {/*<p>确定删除本条轮播图？</p>*/}
        {/*</Modal>*/}
      </Spin>
    );
  }
}
