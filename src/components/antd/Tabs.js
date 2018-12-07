/**
 * Tabs
 * @Author: huangfs
 * @Date: 2018-11-03
 * @Project: web-manager
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
    keyExtractor: item => (typeof item === 'string' || typeof item === 'number') ? item : (item.id || item.key),
    valueExtractor: item => (typeof item === 'string' || typeof item === 'number') ? item : (item.name || item.value)
  };
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps._page) {
  //     this.setState({
  //       _page: nextProps._page
  //     });
  //   }
  // }

  handleChange = (key) => {
    const { onChange } = this.props;
    if (onChange){
      this.props.onChange(key);
    }
  };

  render() {
    const { data, keyExtractor, valueExtractor } = this.props;
    return (
      <AliTabs
        defaultActiveKey="activeKey"
        onChange={this.handleChange}
        animated={false}
      >
        {
          data && data.map(item => (
            <TabPane
              tab={valueExtractor(item)}
              key={keyExtractor(item)}>
              {this.props.children}
            </TabPane>
          ))
        }
      </AliTabs>
    );
  }
}
