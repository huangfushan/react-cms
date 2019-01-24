/**
 * Table
 * @Author: huangfs
 * @Date: 2018-11-03
 * @Project: cms
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table as AliTable } from 'antd';
import { C_PAGE_NUMBER } from '../../../common/constants';
import './index.less';

export default class Table extends React.Component {

  static propTypes = {
    _page: PropTypes.number.isRequired, //页码
    list: PropTypes.array.isRequired, //商品list
    total: PropTypes.number.isRequired, //商品total
    columns: PropTypes.array.isRequired, //栏目
    onChange: PropTypes.func, //订单列表获取方法
    isFetching: PropTypes.bool.isRequired, //订单类别获取状态
  };

  static defaultProps = {
    _page: C_PAGE_NUMBER.PAGE,
    list: [],
    total: 0,
    columns: [],
    isFetching: false, //订单类别获取状态
  };

  state = {
    _page: C_PAGE_NUMBER.PAGE,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return nextProps;
    }
    return null;
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      return true;
    }
    return false;
  }

  handleChange = (pagination) => {
    this.setState({ _page: pagination._page }, () => this.fetchData(pagination.current));
  };

  fetchData = (_page) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({ _page });
    }
  };

  // renderExpanded = (record) => {
  //   return (
  //     <div>
  //       <p>
  //         详细信息：
  //       </p>
  //       <OrderItem
  //         goods={record.goods || []}
  //         express={record.express || {}}
  //         address={record.address || {}}
  //       />
  //     </div>
  //   )
  // };

  render() {
    const { isFetching, list, total } = this.props;
    const dataSource = [];
    [...list].forEach((item, index) => {
      dataSource.push({ ...item, key: index + 1 });
    });
    let { _page } = this.state;
    const pagination = {
      // hideOnSinglePage: total ? false : true,
      showQuickJumper: true,
      defaultCurrent: C_PAGE_NUMBER.PAGE,
      pageSize: C_PAGE_NUMBER.COUNT,
      total: total,
      current: _page,
    };

    return (
      <AliTable
        defaultExpandAllRows={true}
        rowKey={record => record.id}
        dataSource={dataSource}
        columns={this.props.columns}
        loading={isFetching}
        pagination={total ? pagination : false}
        onChange={this.handleChange}
        // expandedRowRender={this.renderExpanded}
      />
    );
  }
}
