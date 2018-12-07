/**
 * 选择器
 * @Author: huangfs
 * @Date: 2018-11-23
 * @Project: cms
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;

export default class Selector extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    keyExtractor: PropTypes.func,
    valueExtractor: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    keyExtractor: item => (typeof item === 'string' || typeof item === 'number') ? item : (item.id || item.key),
    valueExtractor: item => (typeof item === 'string' || typeof item === 'number') ? item : (item.name || item.value)
  };

  state = {
    value: undefined, //选中的值
  };

  handleChange = (value) => {
    this.setState({ value });
    const {onChange, keyExtractor, data} = this.props;
    if (onChange) {
      onChange(data.find(n => keyExtractor(n) === value))
    }
  };

  render() {
    const { keyExtractor, data, valueExtractor } = this.props;
    return (
      <Select
        showSearch
        style={{ width: this.props.width || 100 }}
        placeholder={this.props.placeholder || '请选择'}
        value={this.state.value || this.props.value}
        optionFilterProp="children"
        onChange={this.handleChange}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        getPopupContainer={triggerNode => triggerNode.parentNode}
      >
        {
          data && data.map((item, index) => (
            <Option key={index} value={keyExtractor(item)}>
              {valueExtractor(item)}
            </Option>
          ))
        }

      </Select>
    )
  }
}
