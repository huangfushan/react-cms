import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Icon } from 'antd';
import md5 from 'md5';
import { C_RESP, C_STORAGE } from '../../common/constants';
import { Actions, AsyncActions } from '../../redux/actions';
import { getStorage, removeStorage, setStorage } from '../../utils';
import './login.less';

const FormItem = Form.Item;

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  {
    updateAuth: Actions.auth.updateAuth,
    signIn: AsyncActions.signIn,
  }
)
@Form.create()
export default class Login extends React.Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  state = {
    username: '',
    password: '',
    isFetching: false
  };

  componentWillMount() {

    const username = getStorage(C_STORAGE.USERNAME);
    const password = getStorage(C_STORAGE.PASSWORD);

    this.setState({
      username,
      password
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (this.state.isFetching) return;
      const params = {
        username: values.username,
        password: md5(values.password)
      };
      this.setState({ isFetching: true });

      if (values.remember === true) {
        setStorage(C_STORAGE.USERNAME, values.username);
        setStorage(C_STORAGE.PASSWORD, values.password);
      } else {
        removeStorage(C_STORAGE.USERNAME, values.username);
        removeStorage(C_STORAGE.PASSWORD, values.password);
      }

      this.props.signIn(params).then(resp => {
          if (resp.status !== C_RESP.OK) {
            this.setState({ isFetching: false });
          }
        }
      );
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { username, password } = this.state;
    return this.props.isAuthenticated ? <Redirect to='/' /> : (
      <div className="page-login">
        <div className="page-content">
          <h1>登录</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {
                getFieldDecorator('username', {
                  initialValue: username,
                  rules: [{ required: true, message: '请输入您的账号!' }]
                })(
                  <Input placeholder="账号" prefix={<Icon type="user" />} />
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: password,
                  rules: [{ required: true, message: '请输入密码!' }]
                })(
                  <Input type="password" placeholder="密码" prefix={<Icon type="lock" />} />
                )
              }
            </FormItem>
            <FormItem>
              <div className="flex-between">
                {
                  getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(
                    <Checkbox>记住密码</Checkbox>
                  )
                }
                <Link  to="/password/forget">忘记密码</Link>
              </div>
            </FormItem>
            <FormItem>
              <Button className="btn-login" type="primary" htmlType="submit">
                {
                  this.state.isFetching ? <div>登录中..</div> : '登录'
                }
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className="page-footer">
          <Link to="/register" className="normal-color">立即注册</Link>
        </div>
      </div>
    );
  }
}
