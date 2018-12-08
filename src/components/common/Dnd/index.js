/**
 * 拖拽组件，需要版本兼容
 *"react": "^16.4.0",
 "react-dnd": "^7.0.2",
 "react-dnd-html5-backend": "^7.0.2",
 "react-dom": "^16.4.0",
 */

import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import './index.less';


@DragDropContext(HTML5Backend)
export default class Dnd extends React.Component {

  static propTypes = {
    data: PropTypes.array.isPrototypeOf,
  };

  static defaultProps = {
    data: []
  };

  state = {
    data: []
  };

  componentWillMount() {
    if (this.props.data) {
      this.setState({
        data: this.props.data
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('data' in nextProps) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  handleDND = (dragIndex, hoverIndex) => {
    let data = this.state.data;
    let tmp = data[dragIndex]; //临时储存文件
    data.splice(dragIndex, 1); //移除拖拽项
    data.splice(hoverIndex, 0, tmp); //插入放置项
    this.setState({
      data
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };

  render() {
    return (
      <div className='card'>
        {
          this.state.data.map((item, index) => {
              return (
                <CardItem //向次级界面传递参数
                  key={item.id}
                  title={item.title}
                  content={item.content}
                  index={index}
                  onDND={this.handleDND}
                />
              );
            }
          )
        }
      </div>
    );
  }
}
