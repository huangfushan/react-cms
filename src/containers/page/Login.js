import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Spin } from 'antd';
import Copyright from '../../components/common/Copyright';
import PropTypes from 'prop-types';
import { PROJECT_NAME_C, RESP_C, STORAGE_C } from '../../common/constants';
import { common } from '../../images/images';
import actions from '../../redux/actions';
import { getStorage } from '../../utils/storage';

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
    password: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const username = getStorage(STORAGE_C.KEY_USER);
    const password = getStorage(STORAGE_C.KEY_PASSWORD);
    this.setState({ username, password });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ isFetching: true });
      this.props.signIn(values).then(resp => {
          if (resp.status !== RESP_C.OK){
            this.setState({ isFetching: false })
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
            <h2 className="brand-text">{ PROJECT_NAME_C }</h2>
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
                  this.state.isFetching ? <div><Spin/>登录中..</div>: '登录'
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
