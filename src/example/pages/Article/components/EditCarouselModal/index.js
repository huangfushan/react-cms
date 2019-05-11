// 轮播弹窗，课程与文章的本页，首页轮播都是拿的这个组件
import React, { Component } from 'react';
import { Form } from 'antd';
import Modal from '../../../../../components/antd/Modal';
import ImageUpload from '../../../../../components/common/ImageUpload';

const FormItem = Form.Item;

@Form.create()
export default class AddCurrentPageCarouselModal extends Component {

  state = {
    isConfirmLoading: false
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.setState({ isConfirmLoading: true });
      const { value, carouselType } = this.props;
      this.props.handleSubmit(value.id, values, carouselType).then(() => this.setState({ isConfirmLoading: false }));
    });
  };

  handleCancel = () => {
    this.setState({ isConfirmLoading: false });
    this.props.handleCancel();
  };

  render() {
    const { isConfirmLoading } = this.state;
    const { visible, form, carouselType } = this.props;
    const { getFieldDecorator } = form;

    const type = {
      isCurrentPageCarousel: '本页',
      isHomepageCarousel: '首页',
    };
    return (
      <Modal
        width={600}
        title={`添加${type[carouselType]}轮播`}
        handleCancel={this.handleCancel}
        handleSubmit={this.handleSubmit}
        isVisible={visible}
        isConfirmLoading={isConfirmLoading}
      >
        <Form>
          <FormItem style={{textAlign: 'center' }}>
            {getFieldDecorator('cover', {
              rules: [
                { required: true, message: `请上传${type[carouselType]}轮播图` }
              ],
            })(
              <ImageUpload aspectRatio={16 / 9} aspectRatioHint="16 / 9" size={5}
                           style={{ maxWidth: 200, margin: '0 auto 1rem auto' }} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
