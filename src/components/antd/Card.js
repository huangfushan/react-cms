import React from 'react';
import PropTypes from 'prop-types';
import { Card as AliCard } from 'antd';
import './card.less';


export default class Card extends React.Component {
  static propTypes = {
    action: PropTypes.array,
    value: PropTypes.shape({
      title: PropTypes.string,
      cover: PropTypes.string,
      detail: PropTypes.array,
    }),
  };


  render() {

    const { value, action } = this.props;
    const actionRender = action.map((item, index) => {
      return (
        <span key={index} style={{ width: '100%', height: '100%' }} onClick={() => item.onClick(value)}>
          {item.name}
        </span>
      )
    });

    return (
      <AliCard
        cover={value.cover ? <img alt="" style={{ backgroundImage: `url(${value.cover})` }} /> : null}
        actions={actionRender}
      >
        <h3 className="card-title overflow-1">{value.title}</h3>
        <div className="card-content-list">
          {
            value.detail && value.detail.map((item, index) => (
              <div className="card-item-block" key={index}>
                <h4 className="card-item-title">{item.key}</h4>
                <p className="card-item-value">{item.value} </p>
              </div>
            ))
          }
        </div>
      </AliCard>
    );
  }
}
