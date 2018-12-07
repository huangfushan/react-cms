
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Divider, Input} from 'antd';
import {PAGE_NUMBER_C} from "../../../common/constants";

const FormItem = Form.Item;

@Form.create()
export default class SelectorHeader extends React.Component {
  static propTypes = {
    handleSearchChange: PropTypes.func.isRequired
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {

      if (err) {
        return ;
      }
      const params = {
        _page: PAGE_NUMBER_C.PAGE,
        orderNumber: values.orderNumber || undefined,
        recipient: values.recipient || undefined,
      };

      this.props.handleSearchChange(params)
    })
  };

  handleReset = () => {
    this.props.form.setFieldsValue({
      orderNumber: undefined,
      recipient: undefined,
    })
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form className="form-search" onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="订单编号：">
              {getFieldDecorator('orderNumber', {
                initialValue: undefined
              })(
                <Input placeholder="请输入订单编号"/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="收件人：">
              {getFieldDecorator('recipient', {
                initialValue: undefined
              })(
                <Input placeholder="请输入收件人"/>
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{textAlign: 'right'}}>
            <Button
              type="primary"
              htmlType="submit"
            >
              搜索
            </Button>
            <Divider type="vertical"/>
            <Button type="dashed" onClick={this.handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
