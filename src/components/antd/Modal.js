/**
 * 弹窗
 * Created by huangfushan on 18-11-2.
 */


import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AliModal, Form } from 'antd';

@Form.create()
export default class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
    confirmLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    title: '',
    visible: false,
    width: 0,
    confirmLoading: false,
  };

  handleCancel = () => {
    this.props.handleCancel();
  };

  handleSubmit = (e) => {
    this.props.handleSubmit(e);
  };

  render() {
    return (
      <AliModal
        maskClosable={false}
        destroyOnClose={true}
        visible={this.props.visible}
        title={
          <span>{this.props.title || '编辑'}</span>
        }
        okText="确定"
        cancelText="取消"
        width={this.props.width || 800}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
        footer={this.props.footer}
      >
        {this.props.children}
      </AliModal>
    );
  }
}
