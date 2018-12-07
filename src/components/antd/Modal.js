/**
 * 弹窗
 * Created by huangfushan on 18-11-2.
 */


import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AliModal, Form, Button } from 'antd';

@Form.create()
export default class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    confirmLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    visible: false,
    confirmLoading: false,
  };

  state = {
    modalWidth: undefined
  };

  handleCancel = () => {
    this.props.handleCancel();
  };

  handleSubmit = (e) => {
    this.props.handleSubmit(e);
  };

  changeMode = (value) => {
    this.setState({
      modalWidth: !value
    })
  };

  render() {
    return (
      <AliModal
        maskClosable={false}
        visible={this.props.visible}
        title={
          <div>
            <span>{this.props.title || '编辑'}</span>
            {
              ('mode' in this.props && !this.props.mode) ? null : (
                <Button style={{marginLeft: 10}} size='small' onClick={() => this.changeMode(this.state.modalWidth)}>切换模式</Button>
              )
            }
          </div>
        }
        okText="确定"
        cancelText="取消"
        width={this.state.modalWidth ? '80%' : 800}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        {this.props.children}
      </AliModal>
    )
  }
}
