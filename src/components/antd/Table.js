/**
 * Table
 * @Author: huangfs
 * @Date: 2018-11-03
 * @Project: web-manager
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table as AliTable } from 'antd';
import { PAGE_NUMBER_C} from "../../common/constants";
import './index.less';

export default class Table extends React.Component {

  static propTypes = {
    list: PropTypes.array.isRequired, //商品list
    total: PropTypes.number.isRequired, //商品total
    columns: PropTypes.array.isRequired, //栏目
    onChange: PropTypes.func.isRequired, //订单列表获取方法
    isFetching: PropTypes.bool.isRequired, //订单类别获取状态
  };

  static defaultProps = {
    list: [],
    total: 0,
    columns: [],
    isFetching: false, //订单类别获取状态
  };

  state = {
    _page: PAGE_NUMBER_C.PAGE,
  };

  handleTableChange = (pagination) => {
    this.setState({
      _page: pagination.current,
    },() => this.fetchData());
  };

  fetchData = () => {
    const { _page } = this.state;
    const params = {
      _page,
    };
    this.props.onChange(params);
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
    const { isFetching, list, total }  = this.props;
    const dataSource = [ ...list ];
    dataSource.map((item, index) => {
      return item.key = index + 1;
    });

    let { _page } = this.state;
    const pagination = {
      hideOnSinglePage:false,
      showQuickJumper: true,
      defaultCurrent:PAGE_NUMBER_C.PAGE,
      pageSize:PAGE_NUMBER_C.COUNT,
      total: total,
      current:_page,
    };

    return (

      <AliTable
        rowKey={record => record.key}
        dataSource={dataSource}
        columns={this.props.columns}
        loading={isFetching}
        pagination={pagination}
        onChange={this.handleTableChange}
        // expandedRowRender={this.renderExpanded}
      />
    )
  }
}
