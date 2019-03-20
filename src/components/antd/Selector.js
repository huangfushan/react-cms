/**
 *
 * @Author: huangfs
 * @Date: 2019-01-15
 * @Project: cms-common
 */

import React from 'react';
import { Select } from 'antd';
import { PropTypes } from 'prop-types';

const Option = Select.Option;
let timeout;

export default class Selector extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    filterData: PropTypes.func,
    onChange: PropTypes.func,
    allowClear: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
  };

  state = {
    isFetching: false,
  };

  handleChange = (value) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  handleSearch = (value) => {
    if (!value) return;
    if (!this.props.filterData) return;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => this.filterData({ filter: value }), 300);
  };

  filterData = (params) => {
    this.setState({ isFetching: true });
    this.props.filterData(params).then(() => {
      this.setState({
        isFetching: false,
      });
    });
  };

  render() {
    const { placeholder, mode, value, data, allowClear, style } = this.props;
    //不传 mode 的时候，代表单选，value为key，
    //如果mode为 multiple 代表多选，那么value对应是key的数组
    //如果mode为 tags 代表多选，那么value对应是key的数组,并且key需要为字符串，不能为int
    return (
      <Select
        allowClear={allowClear}
        mode={mode}
        showSearch
        optionFilterProp="children"
        notFoundContent={this.state.isFetching ? <span style={{ marginLeft: '.875rem' }}>检索中..</span> : undefined}
        placeholder={placeholder}
        loading={this.state.isFetching}
        value={value}
        style={style}
        showArrow={true}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        getPopupContainer={triggerNode => triggerNode.parentNode}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {
          data && data.map((item, index) => {
              return (
                <Option key={index} value={mode === 'tags' ? `${item.key}` : item.key}>
                  {item.value}
                </Option>
              );
            }
          )
        }
      </Select>
    );
  }
}
