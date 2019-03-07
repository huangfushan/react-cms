/**
 * 注册
 * @Author: huangfushan
 * @Date: 2019-03-07 09:44
 * @Project: react-cms
 */


import React from 'react';
import { message, Divider, Button } from 'antd';
import { C_SCENE, C_RESP } from '../../common/constants';
import authApi from '../../api/authApi';
import { error, RegExp } from '../../utils';
import commonApi from '../../api/commonApi';
import './register.less';

export default class Register extends React.Component {

  state = {
    errorHint: '',
    phone: '',
    isPhoneHint: false, //手机提示

    captcha: '',
    captchaFetching: false,
    captchaText: '发送验证码', //验证码时间
    time: 59,

    isCaptchaHint: false, //验证码提示

    password: '', //密码
    isPasswordHint: false, //密码提示
    passwordHint: '请输入由英文、数字或下划线组成的6-16位数密码', //提示语

    confirmPassword: '', //新密码
    isConfirmPasswordHint: false, //新密码
    confirmPasswordHint: '请输入由英文、数字或下划线组成的6-16位数密码', //提示语
  };

  componentWillUnmount() {
    clearInterval(this.Timer);
  }

  //提交表单
  handleSubmit = () => {
    const { phone, captcha, password, confirmPassword } = this.state;
    if (!RegExp.phone.test(phone)) {
      this.setState({
        isPhoneHint: true,
      });
      return;
    }
    if (!captcha) {
      this.setState({
        isCaptchaHint: true
      });
      return;
    }
    if (!RegExp.password.test(password)) {
      this.setState({
        isPasswordHint: true,
      });
      return;
    }

    if (!RegExp.password.test(confirmPassword) || password !== confirmPassword) {
      this.setState({
        isConfirmPasswordHint: true,
      });
      return;
    }

    authApi.changePassword({ captcha, phone, password }).then(resp => {
      switch (resp.status) {
        case C_RESP.OK:
          message.success('注册成功', 6);
          this.goBack();
          break;
        default:
          if (resp.notice) {
            this.setState({
              errorHint: resp.notice
            });
          }
          error(resp);
      }
    });
  };

  //手机
  handleChangePhone = (e) => {
    this.setState({
      phone: e.target.value,
      isPhoneHint: false
    });
  };

  //验证码
  handleChangeCaptcha = (e) => {
    this.setState({
      captcha: e.target.value,
      isCaptchaHint: false,
    });
  };

  //密码
  handleChangePassword = (e) => {
    if (!this.state.confirmPassword){
      this.setState({
        password: e.target.value,
        isPasswordHint: false,
      })
    }else {
      if (e.target.value !== this.state.confirmPassword){
        this.setState({
          password: e.target.value,
          isConfirmPasswordHint: true,
          isPasswordHint: false,
          confirmPasswordHint: '两次密码不一致',
        });
        return;
      }
      this.setState({
        password: e.target.value,
        isPasswordHint: false,
        isConfirmPasswordHint: false,
      })
    }
  };

  //确认密码
  handleChangeConfirmPassword = e => {
    if (this.state.password && e.target.value !== this.state.password) {
        this.setState({
          confirmPassword: e.target.value,
          isConfirmPasswordHint: true,
          confirmPasswordHint: '两次密码不一致',
        })
    }else {
      this.setState({
        confirmPassword: e.target.value,
        isConfirmPasswordHint: false,
      })
    }
  };

  //验证码倒计时
  sendCaptcha = () => {
    this.Timer = setInterval(() => {
      const { time } = this.state;
      this.setState({
        time: time - 1,
        captchaText: `已发送(${time}s)`,
      }, () => {
        if (time === 0) {
          this.setState({
            captchaFetching: false,
            time: 59,
            captchaText: '重新发送'
          });
          clearInterval(this.Timer);
        }
      });
    }, 1000);
  };

  /**
   * 获取验证码
   */
  fetchCaptcha = () => {
    const { phone } = this.state;
    if (!RegExp.phone.test(phone)) {
      this.setState({ isPhoneHint: true });
      return;
    }
    if (this.state.captchaFetching) {
      return;
    }
    this.setState({ captchaFetching: true });
    commonApi.fetchCaptcha(phone, C_SCENE.REGISTER).then(resp => {
      if (resp.status === C_RESP.OK) {
        message.success('发送成功');
        this.sendCaptcha();
      } else {
        this.setState({ captchaFetching: false });
        error(resp);
      }
    });
  };

  goBack = () => this.props.history.goBack();

  render() {
    return (
      <React.Fragment>
        <div className="password-forget-header">
          <h1>注册</h1>
        </div>
        <div className="password-forget-content">
          <div className="form-row">
            <div className="flex">
              <p className="title">手机</p>
              <input
                type="text"
                maxLength={11}
                className="phone"
                placeholder="请输入您的手机号"
                onChange={this.handleChangePhone} />
            </div>
            {this.state.isPhoneHint && <div className="error-color form-hint">请输入正确的手机号码</div>}
          </div>
          <div className="form-row">
            <div className="flex">
              <p className="title">验证码</p>
              <input
                type="text"
                maxLength={6}
                placeholder="请输入您的验证码"
                name="code"
                value={this.state.captcha}
                onChange={this.handleChangeCaptcha} />
              <span className={`code code-${this.state.time}`}
                    onClick={this.fetchCaptcha}>{this.state.captchaText}</span>
            </div>
            {this.state.isCaptchaHint && <div className="error-color form-hint">请输入验证码</div>}
          </div>
          <div className="form-row">
            <div className="flex">
              <p className="title">密码</p>
              <input
                type="text"
                maxLength={16}
                className="password"
                placeholder="请输入由英文、数字或下划线组成的6-16位数密码"
                onChange={this.handleChangePassword} />
            </div>
            {this.state.isPasswordHint && <div className="error-color form-hint">{this.state.passwordHint}</div>}
          </div>
          <div className="form-row">
            <div className="flex">
              <p className="title">确认密码</p>
              <input
                type="text"
                maxLength={16}
                className="confirmPassword"
                placeholder="请输入由英文、数字或下划线组成的6-16位数密码"
                onChange={this.handleChangeConfirmPassword} />
            </div>
            {this.state.isConfirmPasswordHint && <div className="error-color form-hint">{this.state.confirmPasswordHint}</div>}
          </div>
          <div className="form-row error-color">{this.state.errorHint}</div>
          <div className="flex-center form-row password-forget-footer">
            <Button className="btn-login" onClick={this.goBack}>返回登录</Button>
            <Divider type="vertical" />
            <Button className="btn-login" type="primary" onClick={this.handleSubmit}>注册</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
