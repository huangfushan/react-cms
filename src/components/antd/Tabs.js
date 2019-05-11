/**
 * Tabs
 * @Author: huangfs
 * @Date: 2018-11-03
 * @Project: cms
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs as AliTabs } from 'antd';

const TabPane = AliTabs.TabPane;

export default class Tabs extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    keyExtractor: PropTypes.func,
    valueExtractor: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
  };

  handleChange = (key) => {
    const { onChange } = this.props;
    if (onChange){
      this.props.onChange(key);
    }
  };

  render() {
    const { data} = this.props;
    return (
      <AliTabs
        // defaultActiveKey={null}
        onChange={this.handleChange}
        animated={this.props.animated || false}
      >
        {
          data && data.map(item => (
            <TabPane
              tab={item.value}
              key={item.key}>
              {this.props.children}
            </TabPane>
          ))
        }
      </AliTabs>
    );
  }
}
