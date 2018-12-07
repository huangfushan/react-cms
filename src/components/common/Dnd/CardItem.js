//相关文档查看 http://react-dnd.github.io/react-dnd/docs/api/drop-target
//demo参考了 https://github.com/wzb0709/CardSwitch---react-dnd/tree/master/src
/**
 *"react": "^16.4.0",
 "react-dnd": "^7.0.2",
 "react-dnd-html5-backend": "^7.0.2",
 "react-dom": "^16.4.0",
 */

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Card } from 'antd';
import { DragSource, DropTarget, } from 'react-dnd';

const Types = { CARD: 'CARD' };
const specSource = {
  /**
   * 组件发生拖拽时调用，返回的内容是有关拖动源的放置目标可用的唯一信息
   * @param props 当前拖拽组件的item信息
   * @param monitor 当前拖拽状态的信息，如坐标，偏移，是否已被删除等
   * @param component 组件的实例，使用它来访问底层DOM节点以进行位置或大小测量
   * @return {{index: Number}}
   */
  beginDrag(props, monitor, component) {
    return {
      index: props.index
    };
  }
};
const specTarget = {
  hover(props, monitor, component) { //组件在target上方时触发的事件
    // if(!component) return null;
    // const dragIndex = monitor.getItem().index;//当前拖拽目标的Index
    // const hoverIndex = props.index; //目标Index
    // if(dragIndex === props.lastIndex || hoverIndex === props.lastIndex) return null;
    // if(dragIndex === hoverIndex) {return null}//如果拖拽目标和目标ID相同不发生变化
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();//获取卡片的边框矩形
    // console.log(hoverBoundingRect)
    // const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;//获取X轴中点
    // const clientOffset = monitor.getClientOffset();//获取拖拽目标偏移量
    // const hoverClientX = clientOffset.x - hoverBoundingRect.left;
    // if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
    //   return null
    // }
    // if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
    //   return null
    // }
    // props.onDND(dragIndex,hoverIndex);
    // monitor.getItem().index = hoverIndex;
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.onDND(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

/**
 *
 * @param connect 连接器允许您将节点连接到DnD后端
 * @param monitor 监视器用于查询有关拖动状态的信息
 * @return {{connectDragSource: ConnectDragSource | * | undefined, isDragging: boolean | *}}
 */
const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
};


/**
 * types：必填（数组，字符串，字符等）。此放置目标仅对指定类型的拖动源生成的项目作出反应
 * spec：必填（对象）。描述了放置目标如何对拖放事件做出操作反应
 * collect：必填，收集功能。应该返回一个普通的道具对象注入你的组件，接收两个参数：connect和monitor
 */
@DragSource(Types.CARD, specSource, collectSource) //包裹组件使其可拖动
@DropTarget(Types.CARD, specTarget, collectTarget) //将组件包裹起来，提供对组件的拖动，悬停或掉落的兼容项目做出反应。

export default class CardItem extends Component {

  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    let opacity = isDragging ? 0.1 : 1;

    return (
      connectDragSource(
        connectDropTarget(
          <div>
            <Card
              title={this.props.title}
              style={{ width: 300, opacity }}
            >
              <p>{this.props.content}</p>
            </Card>
          </div>
        )
      )
    );
  }
}
