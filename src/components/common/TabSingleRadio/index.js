/**
 * 单选框tab
 * @Author: huangfushan
 * @Date: 2019-03-15 09:36
 * @Project: web-manager-admin
 */
//单选
import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class TabSingleRadio extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
  };

  selectTab = (data) => {
    const { value } = this.props;
    //已被选中
    if (data.key === value) {
      return;
    }
    const { onChange } = this.props;
    if (onChange) {
      this.props.onChange(data.key);
    }
  };

  render() {
    const { data, value, defaultValue } = this.props;

    return (
      <div className='tab-single-radio'>
        {
          data && data.map((item, index) => {
            //被选中
            if (value && value === item.key) {
              return <span key={index} className='tab-item tab-item-active'
                           onClick={() => this.selectTab(item)}>{item.value}</span>;
            }
            //默认选中
            if (!value && defaultValue && defaultValue === item.key) {
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
