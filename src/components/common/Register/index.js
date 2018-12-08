/**
 * Register
 * @Register: huangfs
 * @Date: 2018-11-30
 * @Project: web-service
 */

import React from 'react';
import PropTypes from 'prop-types';
import { message, Button } from 'antd';
import Rules from '../../../utils/validate/rules';
import { C_RESP } from '../../../common/constants';
import { error } from '../../../utils';
import './index.less';

export default class Register extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired, //提交注册
    fetchCaptcha: PropTypes.func.isRequired, //获取验证码
  };

  state = {
    errorHint: '',
    phone: '',
    phoneHint: '', //手机提示

    captcha: '',
    captchaFetching: false,
    captchaText: '发送验证码', //验证码时间
    time: 59,

    captchaHint: '', //验证码提示
  };

  componentWillUnmount() {
    clearInterval(this.Timer);
  }

  //提交表单
  handleSubmit = () => {
    const { phone, captcha } = this.state;
    if (!Rules.tel(phone)) {
      this.setState({
        phoneHint: '请输入正确的手机号码',
      });
      return;
    }
    if (!captcha) {
      this.setState({
        captchaHint: '请输入验证码'
      });
      return;
    }
    this.props.handleSubmit({ captcha, phone }).then(resp => {
      if (resp && resp.notice) {
        this.setState({
          errorHint: resp.notice
        });
      }
    });
  };

  //手机
  handleChangePhone = (e) => {
    this.setState({
      phone: e.target.value,
      phoneHint: ''
    });
  };

  //验证码
  handleChangeCaptcha = (e) => {
    this.setState({
      captcha: e.target.value,
      captchaHint: ''
    });
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
    if (!Rules.tel(phone)) {
      this.setState({ phoneHint: '请输入正确的手机号码' });
      return;
    }
    if (this.state.captchaFetching) {
      return;
    }
    this.setState({ captchaFetching: true });
    this.props.fetchCaptcha(phone).then(resp => {
      if (resp.status === C_RESP.OK) {
        message.success('发送成功');
        this.sendCaptcha();
      } else {
        this.setState({ captchaFetching: false });
        error(resp);
      }
    });

  };

  render() {

    return (
      <div>
        <div className="captcha">
          <div className="flex-center form-row">
            <p className="title">手机</p>
            <input type="text" maxLength={ 11 } className="phone" placeholder="请输入您的手机号"
                   onChange={ this.handleChangePhone }/>
          </div>
          <div className="status-warning form-hint">{ this.state.phoneHint }</div>
          <div className="flex-center form-row">
            <p className="title">验证码</p>
            <input type="text" maxLength={ 55 } placeholder="请输入您的验证码" name="code" value={ this.state.captcha }
                   onChange={ this.handleChangeCaptcha }/>
            <span className={ `code code-${this.state.time}` }
                  onClick={ this.fetchCaptcha }>{ this.state.captchaText }</span>
          </div>
          <div className="status-warning form-hint">{ this.state.captchaHint }</div>
          { /*<div className="flex-center">*/ }
          { /*<span>首次登录将自动注册得道科技技账户且同意</span>*/ }
          { /*<Link style={{color: 'blue'}} to={'/provision'} target="_blank">《得道科技》</Link>*/ }
          { /*</div>*/ }
          <div className="captcha-footer flex-center form-row">
            <Button className="btn-login" type="primary" onClick={ this.handleSubmit }>{this.props.text || '下一步'}</Button>
          </div>
          <div className="status-warning form-hint">{ `${this.state.errorHint}` }</div>
        </div>
      </div>
    );
  }
}

