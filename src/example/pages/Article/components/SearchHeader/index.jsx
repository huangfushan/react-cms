/**
 * 文章搜索组件
 * @Author: huangfushan
 * @Date: 2019-03-12 10:57
 * @Project: web-manager-admin
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
import { C_PAGE_NUMBER } from '../../../../../common/constants';
import Selector from '../../../../../components/antd/Selector';
import { AsyncActions } from '../../../../../redux/actions';
import './index.less';

@Form.create()
@withRouter
@connect(
  state => ({
    category: state.common.category,
  }),
  {
    fetchAllArticleCategoryList: AsyncActions.fetchAllArticleCategoryList,
  }
)
export default class SearchHeader extends React.Component {
  static propTypes = {
    fetchAllArticleCategoryList: PropTypes.func.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    selectData: PropTypes.array.isRequired,
  };

  static defaultProps = {
    category: [],
    selectData: [],
    fetchAllArticleCategoryList: () => console.warn('获取发现分类列表，这个方法会放在redux里面')
  };

  componentDidMount() {
    if (!this.props.category || !this.props.category.length) {
      this.props.fetchAllArticleCategoryList();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {

      if (err) {
        return;
      }

      const params = {
        filter: values.filter || undefined,
        categoryId: values.categoryId === 'ALL' ? undefined : values.categoryId,
        _page: C_PAGE_NUMBER.PAGE,
      };
      if (values.serviceId) {
        params.serviceId = values.serviceId === 'ALL' ? undefined : values.serviceId;
      }
      this.props.handleSearchChange(params);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { pathname } = this.props.location;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form className="form-search" onSubmit={this.handleSubmit}>
        {
          (pathname === '/article' || pathname === '/recommend/article') && (
            <Form.Item {...formItemLayout} label="栏目" style={{ width: 200 }}>
              {getFieldDecorator('serviceId', {
                initialValue: 'ALL'
              })(
                <Selector data={[{ key: 'ALL', value: '全部' }, ...this.props.selectData]} />
              )}
            </Form.Item>
          )
        }
        {/*只有用户发布的才有发现分类*/}
        {
          !this.props.isPlatform && <Form.Item {...formItemLayout} label="发现分类" style={{ width: 200 }}>
            {getFieldDecorator('categoryId', {
              initialValue: 'ALL'
            })(
              <Selector data={[{ key: 'ALL', value: '全部' }, ...this.props.category]} />
            )}
          </Form.Item>
        }
        <Form.Item>
          {getFieldDecorator('filter', {
            initialValue: undefined
          })(
            <Input placeholder="请输入文章标题搜索" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
      </Form>
    );
  }
}
