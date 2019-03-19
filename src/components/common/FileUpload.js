/**
 * oss文件上传，暂时不支持多文件上传
 * @Author: huangfs
 * @Date: 2018-12-03
 * @Project: cms
 */

/**
 * type: 文件类型， image图片， video视频，audio音频，file文件，如果不传，默认是file
 * accept: 接受类型
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button, Popover } from 'antd';
import { imageBeforeUpload } from '../../utils/image';
import commonApi from '../../api/commonApi';
import { Actions } from '../../redux/actions';
import { pushAliOss } from '../../utils/aliOSS';
import { C_RESP } from '../../common/constants';

@connect(
  null,
  {
    clearAuth: Actions.auth.clearAuth
  }
)
export default class FileUpload extends React.Component {

  static propTypes = {
    type: PropTypes.string, //image, video, audio, file
    multiple: PropTypes.string, //如果有这个属性，代表多文件上传，但是目前还不支持
    onChange: PropTypes.func,
  };

  state = {
    progress: '', //上传进度
    url: '', //上传成功返回url
    filename: '', //上传文件名
    uploading: false, //上传状态
  };

  handleChooseFile = () => {
    const { type, multiple, accept } = this.props;
    // const input = document.createElement('input');
    const input = document.getElementById('image-input');
    let acceptType = accept;
    switch (type) {
      case 'image':
        acceptType = accept || 'image/png,image/gif,image/jpg,image/jpeg';
        input.setAttribute('accept', acceptType);
        break;
      case 'video':
        acceptType = accept || 'video/mp4';
        input.setAttribute('accept', acceptType);
        break;
      case 'audio':
        acceptType = accept || 'audio/mp3';
        input.setAttribute('accept', acceptType);
        break;
      default:
        input.setAttribute('accept', accept);
        break;
    }
    if (multiple) {
      input.setAttribute('multiple', 'multiple');
    }
    input.click();
    input.onchange = () => {
      let file = input.files;
      input.value = '';
      if (!multiple) {
        file = input.files[0];
        let beforeUpload = true;
        if (type === 'image') {
          beforeUpload = imageBeforeUpload(file);
        }
        if (!beforeUpload) return;
      }
      this.pushAliOss(file, type);
    };
  };

  pushAliOss = (file, type) => {
    this.setState({ uploading: true });
    commonApi.fetchOssAccessKey().then(resp => {
      pushAliOss(resp, type, file, (p) => {
        this.setState({
          progress: parseInt(p * 100, 10)
        });
      }).then((resp) => {
        this.setState({ uploading: false });
        if (resp.status !== C_RESP.OK) return;
        const { onChange } = this.props;
        if (onChange) {
          this.setState({ filename: file.name, url: resp.url });
          onChange(resp.url);
        }
      });
    });
  };

  handleShow = (filePath) => {
    const { url, filename } = this.state;
    const { type } = this.props;
    const name = filename || filePath;
    return (type === 'image' ? (
      <Popover placement="top" content={<img alt='' src={url} style={{ height: 40 }} />}>
        <a href={url} target='_blank' style={{ display: 'inline-block' }}>{name}</a>
      </Popover>
    ) : <span style={{ display: 'inline-block' }}>{name}</span>);
  };

  render() {
    const { value } = this.props;
    const filePath = value && value.split('/') && value.split('/')[value.split('/').length - 1];
    const { progress, uploading } = this.state;
    return (
      <React.Fragment>
        <Button onClick={this.handleChooseFile} style={{ width: 160 }}>
          <Icon type="upload" />{progress === 100 ? '已上传' : (uploading ? `上传中${progress || 0}%` : '选择文件')}
          <input id="file-input" type="file" style={{ display: 'none' }} />
        </Button>
        {value && this.handleShow(filePath)}
      </React.Fragment>
    );
  }
}
