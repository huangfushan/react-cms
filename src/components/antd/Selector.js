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
    const {onChange} = this.props;
    if (onChange) {
      onChange(value)
    }
  };

  render() {
    const { keyExtractor, data, valueExtractor, mode, notFoundContent } = this.props;
    return (
      <Select
        mode={mode}
        showSearch
        notFoundContent={notFoundContent || '无匹配内容'}
        style={{ width: this.props.width || '100%' }}
        placeholder={this.props.placeholder || '请选择'}
        value={this.state.value || this.props.value}
        optionFilterProp="children"
        onChange={this.handleChange}
        getPopupContainer={triggerNode => triggerNode.parentNode}
      >
        {
          data && data.map((item, index) => (
            <Option key={index} value={mode && mode === 'tags' ? `${keyExtractor(item)}` : keyExtractor(item)}>
              {valueExtractor(item)}
            </Option>
          ))
        }
      </Select>
    )
  }
}
