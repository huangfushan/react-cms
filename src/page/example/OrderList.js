/**
 * @Author: huangfs
 * @Date: 2018-11-25
 * @Project: cms
 */

import React from 'react';
import { connect } from 'react-redux';
import Table from '../../components/antd/Table/index';
import Tabs from '../../components/antd/Tabs';
import SearchHeader from '../../components/page/order/SearchHeader';
import { C_PAGE_NUMBER, C_RESP, C_TIME } from '../../common/constants';
import { error, timeFmt } from '../../utils/index';
import orderApi from '../../api/orderApi';
import Selector from '../../components/antd/Selector';
import { Actions } from '../../redux/actions';

@connect(
  null,
  {
    clearAuth: Actions.auth.clearAuth
  }
)

export default class orderList extends React.Component {

  state = {
    data: {
      total: 0,
      list: []
    },
    searchValue: {
      state: undefined,
      orderNumber: undefined,
      recipient: undefined,
      _page: C_PAGE_NUMBER.PAGE,
      _count: C_PAGE_NUMBER.COUNT
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { searchValue } = this.state;
    this.setState({ isFetching: true });
    orderApi.fetchOrderList(searchValue).then(resp => {
      this.setState({ isFetching: false });
      switch (resp.status) {
        case C_RESP.OK:
          this.setState({
            data: resp.data
          });
          break;
        case C_RESP.ERR_INVALID:
          this.props.clearAuth();
          break;
        default:
          error(resp);
      }
    });
  };

  handleChange = (value) => {
    const { searchValue } = this.state;
    const newValue = Object.assign({}, searchValue, value);
    this.setState({
        searchValue: newValue
      }, () => this.fetchData()
    );
  };

  handleChangeTag = (value) => {
    this.handleChange({ type: value, _page: C_PAGE_NUMBER.PAGE });
  };

  handleChangeSelect = (value) => {
    this.handleChange({ state: value.key, _page: C_PAGE_NUMBER.PAGE });
  };


  render() {
    const columns = [
      { title: '序列', dataIndex: 'key', key: 'key' },
      { title: '下单时间', dataIndex: 'time', render: text => timeFmt(text, C_TIME.D) },
      { title: '实付金额(¥)', dataIndex: 'total', key: 'total' },
      { title: '操作', dataIndex: 'remark', render: text => '无' }
    ];
    return (
      <div>
        <Selector
          data={['1', 2, { key: 3, value: '苹果' }, { id: 4, name: '栗子' }]}
          onChange={this.handleChangeSelect}
        />
        <SearchHeader handleSearchChange={this.handleChange} />
        <Tabs onChange={this.handleChangeTag} data={['1', 2, { key: 3, value: '苹果' }, { id: 4, name: '栗子' }]}>
          <Table
            _page={this.state.searchValue._page}
            list={this.state.data.list}
            total={this.state.data.total}
            columns={columns}
            onChange={this.handleChange}
            isFetching={this.state.isFetching} />
        </Tabs>

      </div>
    );
  }
}
