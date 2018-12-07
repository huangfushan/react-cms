/**
 * statistics
 * @Author: huangfs
 * @Date: 2018-11-25
 * @Project: cms
 */

import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../components/antd/Table';
import Tabs from '../../../components/antd/Tabs';
import SelectorHeader from '../../../components/page/order/SearchHeader';
import { PAGE_NUMBER_C, RESP_C, TIME_C } from '../../../common/constants';
import { error, timeFmt } from '../../../utils/index';
import orderApi from '../../../api/orderApi';
import Selector from '../../../components/antd/Selector';
import actions from '../../../redux/actions';

@connect(
  null,
  {
    signOut: actions.auth.signOut
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
      _page: PAGE_NUMBER_C.PAGE,
      _count: PAGE_NUMBER_C.COUNT
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
        case RESP_C.OK:
          this.setState({
            data: resp.data
          });
          break;
        case RESP_C.ERR_INVALID:
          this.props.signOut();
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
    this.handleChange({ type: value, _page: PAGE_NUMBER_C.PAGE });
  };

  handleChangeSelect = (value) => {
    this.handleChange({ state: value.key, _page: PAGE_NUMBER_C.PAGE });
  };



  render() {
    const columns = [
      { title: '序列', dataIndex: 'key', key: 'key' },
      { title: '下单时间', dataIndex: 'time', render: text => timeFmt(text, TIME_C.D) },
      { title: '实付金额(¥)', dataIndex: 'total', key: 'total' },
      { title: '操作', dataIndex: 'remark', render: text => '无' }
    ];
    return (
      <div>
        <Selector
          data={['1', 2, { key: 3, value: '苹果' }, { id: 4, name: '栗子' }]}
          onChange={this.handleChangeSelect}
        />
        <SelectorHeader handleSearchChange={this.handleChange} />
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
