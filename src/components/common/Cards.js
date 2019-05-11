/**
 * 类似商品卡片式列表
 * @Author: huangfs
 * @Date: 2018-11-02
 * @Project: cms
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'antd';
import Card from '../antd/Card/Card';
import Nothing from './NoData';

export default class Cards extends React.Component {

  static propTypes = {
    onChange: PropTypes.func, //页码改变触发
    pagination: PropTypes.shape({
      _page: PropTypes.number, // 当前页码
      _count: PropTypes.number, //每页条数
    }),
    action: PropTypes.array, //action方法
    data: PropTypes.shape({
      list: PropTypes.array.isRequired, //数据list
      total: PropTypes.number.isRequired, //数据总条数
    }),
    columns: PropTypes.number, //每行条数
  };

  static defaultProps = {
    pagination: {
      _page: 1,
      _count: 8
    },
    columns: 4,
    data: {
      list: [],
      total: 0
    }
  };

  state = {
    pagination: {
      _page: 1,
      _count: 8
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pagination !== prevState.pagination) {
      return {
        pagination: nextProps.pagination
      };
    }
    return null;
  }

  handlePageChange = (_page) => {
    const pagination = Object.assign({}, this.state.pagination, { _page });
    this.setState({ pagination });
    const { onChange } = this.props;
    if (onChange) {
      onChange({ _page });
    }
  };

  render() {
    const { action, data, columns } = this.props;
    const { pagination } = this.state;

    return (
      data.list && data.list.length ? (
        <div>
          <Row gutter={24} style={{ margin: 16 }}>
            {
              data.list && data.list.map((item, index) => (
                <Col span={24 / columns} key={index} style={{ padding: 10 }}>
                  <Card value={item} action={action} />
                </Col>
              ))
            }
          </Row>
          {
            data.total ? (
              <Pagination
                current={pagination._page}
                pageSize={pagination._count}
                total={data.total}
                onChange={this.handlePageChange}
                style={{
                  textAlign: 'center',
                  marginTop: '2rem'
                }}
              />
            ) : null
          }
        </div>
      ) : (
        <Nothing />
      )
    );
  }
}
