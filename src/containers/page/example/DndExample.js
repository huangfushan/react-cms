/**
 * Example
 * @Author: huangfs
 * @Date: 2018-12-07
 * @Project: cms
 */

import React from 'react';
import Dnd from '../../../components/common/Dnd/index';

const cardList= [{ //定义卡片内容
  title: 'first Card',
  id: 1,
  content: 'this is first Card'
}, {
  title: 'second Card',
  id: 2,
  content: 'this is second Card'
}, {
  title: 'Third Card',
  id: 3,
  content: 'this is Third Card'
}];

export default class DndExample extends React.Component {

  handleChange = (value) => {
    console.log(value)
  };

  render() {
    return (
        <div style={{width: 300, backgroundColor: 'red'}}>
          <Dnd data={cardList} onChange={this.handleChange}>
          </Dnd>
        </div>
    );
  }
}
