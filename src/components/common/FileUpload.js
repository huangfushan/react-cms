/**
 * oss文件上传，暂时不支持多文件上传
 * @Author: huangfs
 * @Date: 2018-12-03
 * @Project: cms
 */

/**
 * type: 文件类型， image图片， video视频，audio音频，file文件，如果不传，默认是file
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
    const { type, multiple } = this.props;
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    switch (type) {
      case 'image':
        input.setAttribute('accept', 'image/png,image/gif,image/jpg,image/jpeg');
        break;
      case 'video':
        input.setAttribute('accept', 'video/mp4');
        break;
      case 'audio':
        input.setAttribute('accept', 'audio/mp3');
        break;
      default:
        break;
    }
    if (multiple) {
      input.setAttribute('multiple', 'multiple');
    }
    input.click();
    input.onchange = () => {
      let file = input.files;
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
    return (type === 'image' ? (
      <Popover placement="top" content={<img alt='' src={url} style={{ height: 40 }} />}>
        <a href={url} target='_blank'>{filename || filePath}</a>
      </Popover>
    ) : (filename || filePath));
  };

  render() {
    const { value } = this.props;
    const filePath = value && value.split('/') && value.split('/')[value.split('/').length - 1];
    const { progress, uploading } = this.state;
    return (
      <div>
        <Button onClick={this.handleChooseFile} style={{ width: 160 }}>
          <Icon type="upload" />{progress === 100 ? '已上传' : (uploading ? `上传中${progress || 0}%` : '选择文件')}
        </Button>
        {value && this.handleShow(filePath)}
      </div>
    );
  }
}
