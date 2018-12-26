import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Input } from 'antd';
import { C_PAGE_NUMBER } from '../../../common/constants';

const FormItem = Form.Item;

@Form.create()
export default class SearchHeader extends React.Component {
  static propTypes = {
    handleSearchChange: PropTypes.func.isRequired
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {

      if (err) {
        return;
      }
      const params = {
        filter: values.filter || undefined,
        _page: C_PAGE_NUMBER.PAGE
      };
      this.props.handleSearchChange(params);
    });
  };

  // handleReset = () => {
  //   this.props.form.setFieldsValue({
  //     search: undefined,
  //   });
  // };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form className="form-search" onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          {/*<Col span={16}>*/}
            {/*<Link to={{ pathname: `/merchant/add` }}>*/}
              {/*<Button type="primary">添加店铺</Button>*/}
            {/*</Link>*/}
          {/*</Col>*/}
          <Col span={6}>
            <FormItem>
              {getFieldDecorator('filter', {
                initialValue: undefined
              })(
                <Input placeholder="请输入门店/联系人姓名搜索" style={{width: '100%'}}/>
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
              >
                搜索
              </Button>
            </FormItem>
            {/*<Divider type="vertical" />*/}
            {/*<Button type="dashed" onClick={this.handleReset}>重置</Button>*/}
          </Col>
        </Row>
      </Form>
    );
  }
}
