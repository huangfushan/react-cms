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
import { Converter } from '../../utils';

export default class Cards extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired, //页码改变触发
    pagination: PropTypes.shape({
      _page: PropTypes.number, // 当前页码
      _count: PropTypes.number, //每页条数
    }),
    action: PropTypes.array, //action方法
    data: PropTypes.shape({
      list: PropTypes.array.isRequired, //数据list
      total: PropTypes.number.isRequired, //数据总条数
    }),
    map: PropTypes.object.isRequired, //格式数据
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

  componentWillReceiveProps(nextprops) {
    if (nextprops.pagination) {
      const pagination = Object.assign({}, this.state.pagination, nextprops.pagination);
      this.setState({
        pagination
      });
    }
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
    const { map, action, data, columns } = this.props;
    const { pagination } = this.state;

    const name = (item, value) => {
      if (item.name[Object.keys(item.name)] === undefined && value[Object.keys(item.name)] === undefined) return item.name;
      if (item.name[Object.keys(item.name)] === undefined) return 'error';
      if (value[Object.keys(item.name)] === undefined) return 'error';
      return item.name[Object.keys(item.name)][value[Object.keys(item.name)]] || 'error';
    };

    const Action = (action, value) => action.map(item => {
      return {
        name: name(item, value),
        onClick: item.onClick
      };
    });
    return (
      data.list && data.list.length ? (
        <div>
          <Row gutter={24} style={{ margin: 16 }}>
            {
              data.list && data.list.map((item, index) => (
                <Col
                  span={24 / columns}
                  key={index}
                  style={{ padding: 10 }}
                >
                  <Card
                    value={{ oldData: item, ...Converter.map(item, map) }}
                    action={Action(action, item)}
                  />
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
                  marginTop: '30px'
                }}
              />
            ) : null
          }
        </div>
      ) : (
        <div style={{ margin: 10, textAlign: 'center', padding: 10 }}>
          暂无数据
        </div>
      )
    );
  }
}
