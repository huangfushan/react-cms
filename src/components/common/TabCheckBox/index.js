/**
 * 多选框tab
 * @Author: huangfushan
 * @Date: 2019-03-15 09:36
 * @Project: web-manager-admin
 */
import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class TabCheckBox extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
  };

  selectTab = (data) => {
    let value = this.props.value || [];

    //已被选中
    if (value.find(n => n === data.key)) {
      value = value.filter(n => n !== data.key);
    } else {
      value.push(data.key);
    }

    const { onChange } = this.props;
    if (onChange) {
      this.props.onChange(value);
    }
  };

  render() {
    const { data, value, defaultValue } = this.props;
    return (
      <div className='tab-check-box'>
        {
          data && data.map((item, index) => {
            //被选中
            if (value && value.find(n => n === item.key)) {
              return <span key={index} className='tab-item tab-item-active'
                           onClick={() => this.selectTab(item)}>{item.value}</span>;
            }
            //默认选中
            if (!value && defaultValue && defaultValue.find(n => n === item.key)) {
              return <span key={index} className='tab-item tab-item-active'
                           onClick={() => this.selectTab(item)}>{item.value}</span>;
            }
            //未被选中
            return <span key={index} className='tab-item' onClick={() => this.selectTab(item)}>{item.value}</span>;
          })
        }
      </div>
    );
  }
}
