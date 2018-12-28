/**
 * 图片上传(单张)
 * @Author: huangfs
 * @Date: 2018-11-12
 * @Project: cms
 */

import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { Upload, Icon } from 'antd';
import { beforeUpload, getBase64 } from "../../utils/image";
import { C_API } from "../../common/constants";
import './index.less';

@connect (
  state => ({
    session: state.auth.session,
  }),
  null
)
export default class Uploader extends React.Component {
  static defaultProps = {
    data: PropTypes.array.isRequired,
  };

  state = {
    value: undefined,
    loading: false
  };

  componentWillReceiveProps(nextProps){
    if ('visible' in nextProps){
      if (!nextProps.visible) {
        this.setState({value:undefined})
      }
    }
    if ('value' in nextProps) {
      this.setState({value:nextProps.value})
    }
  }

  beforeUpload = (file) => {
    if ( !beforeUpload(file) ) {
      return false;
    }
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true, value: undefined });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, value => this.setState({
        value,
        loading: false,
      }));
      this.onChangeImage(info)
    }
  };

  onChangeImage = (info) => {
    let url;
    if (info.file.response && info.file.response.status === 0){
      url = info.file.response.data[0].url
    }
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(url)
    }
  };

  render() {

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const session = {
      session:this.props.session
    };

    return (
      <Upload
        headers={session}
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        action={`${C_API.IMAGE}`}
        showUploadList={false}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {this.state.value ? <img src={this.state.value} alt="cover" /> : uploadButton}
      </Upload>
    )
  }
}
