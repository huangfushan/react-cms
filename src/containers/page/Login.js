import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import md5 from 'md5';
import Copyright from '../../components/common/Copyright';
import PropTypes from 'prop-types';
import { C_PROJECT_NAME, C_RESP } from '../../common/constants';
import { common } from '../../images/images';
import actions from '../../redux/actions';

const FormItem = Form.Item;

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  {
    updateAuth: actions.auth.updateAuth,
    signIn: actions.signIn,
  }
)
@Form.create()
export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    isFetching: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const params = {
        username: values.username,
        password: md5(values.password)
      };
      this.setState({ isFetching: true });
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
    return this.props.isAuthenticated ? (
      <Redirect
        to={ {
          pathname: `/`
        } }
      />) : (
      <div className="page page-login vertical-align">
        <div className="page-content vertical-align-middle">
          <div className="brand">
            <img src={ common.logo } alt="..."/>
            <h2 className="brand-text">{ C_PROJECT_NAME }</h2>
          </div>
          <Form style={ { textAlign: 'left' } } onSubmit={ this.handleSubmit }>
            <FormItem>
              {
                getFieldDecorator('username', {
                  initialValue: username,
                  rules: [{ required: true, message: '请输入您的账号!' }]
                })(
                  <Input placeholder="账号"/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: password,
                  rules: [{ required: true, message: '请输入密码!' }]
                })(
                  <Input type="password" placeholder="密码"/>
                )
              }
            </FormItem>
            <FormItem>
              <Button className="btn-login" type="primary" htmlType="submit">
                {
                  this.state.isFetching ? <div>登录中..</div>: '登录'
                }
              </Button>
            </FormItem>
          </Form>
          <Copyright className="page-copyright-inverse"/>
        </div>
      </div>
    )
  }
}
