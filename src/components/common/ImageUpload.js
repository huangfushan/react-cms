/**
 * 图片上传组件，通过图片裁剪后转为文件再上传
 * @Author: huangfs
 * @Date: 2018-12-03
 * @Project: cms
 */

/**
 * 有aspectRatio字段：代表可以裁剪，如果有比例会按照比例裁剪，没有比例则自定义裁剪，
 * onChange，提供onChange方法，
 * oss：用到ali oss文件上传服务，
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { base64ToFile, checkFile, fileToBase64, isBase64, error, PushAliOss, blobToFile, base64ToBlob, isIE } from '../../utils';
import { C_FILE, C_RESP } from '../../common/constants';
import Modal from '../antd/Modal';
import { Actions } from '../../redux/actions';

//https://www.npmjs.com/package/react-cropper
//https://github.com/fengyuanchen/cropperjs#aspectratio

@connect(
  null,
  {
    clearAuth: Actions.auth.clearAuth
  }
)
export default class ImageUpload extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    aspectRatio: PropTypes.number, //裁剪比例，如果存在并等于0，则是提供裁剪，不限制比例
    aspectRatioHint: PropTypes.string, //裁剪比例提示
    value: PropTypes.string,
    accept: PropTypes.string, //支持的文件类型,默认全局定义属性
    size: PropTypes.number, //文件大小，单位为MB
  };

  state = {
    base64: '',
    visible: false, //弹窗可不可见
    confirmLoading: false, //弹窗确认中
    value: '', //当前的图片地址value
    currentValue: '' // 弹窗内到值
  };

  componentDidMount() {
    if (this.props.aspectRatio && !this.props.aspectRatioHint) {
      console.error('ImageUpload error： 图片裁剪组件定义了裁剪，需要提供裁剪比例提示');
    }
  }

  //选中图片
  selectImage = (image) => {
    if (image) {
      const input = document.getElementById('image-input');
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        input.value = '';
        if (!checkFile(file, this.props.accept, this.props.size)) return;
        if (!this.props.aspectRatio && this.props.aspectRatio !== 0) { //如果不裁剪，直接上传
          this.pushAliOss(file, 'image');
          return;
        }
        //获取base64
        fileToBase64(file, base64 => {
          this.setState({ currentValue: base64 });
        });
        this.handleOpenModal();
      };
    }
  };

  handleOpenModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSuccess = (value, base64) => {
    this.setState({
      visible: false,
      value,
      base64
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  handleCancel = () => {
    //如果当前正在上传，需要暂停上传
    if (this.aliOssClient) {
      this.aliOssClient.cancel();
    }
    this.setState({
      visible: false,
      confirmLoading: false
    });
  };

  handleSubmit = () => {
    const canvas = this.cropper.getCroppedCanvas();
    if (!canvas || !canvas.toDataURL()) return;
    const base64 = isBase64(canvas.toDataURL());
    if (!base64) return;
    // const file = base64ToFile(base64[0], `image.${base64[1]}`); //base64转文件
    let file;
    // 如果是IE浏览器，单独处理
    // 因为IE下无File对象，需要先吧base64转为blob，再转为file
    if (isIE()) {
      file = blobToFile(base64ToBlob(base64[0]), `image.${base64[1]}`);
    } else {
      file = base64ToFile(base64[0], `image.${base64[1]}`); //base64转文件
    }
    this.pushAliOss(file, 'image', base64[0]);
  };

  pushAliOss = (file, type, base64) => {
    this.setState({ confirmLoading: true });

    this.aliOssClient = new PushAliOss(file, type);
    this.aliOssClient.uploader().then((resp) => {
      this.setState({ confirmLoading: false });
      if (resp.status === C_RESP.OK) {
        console.log(resp);
        this.handleSuccess(resp.url, base64); //上传成功后的逻辑
      } else {
        error(resp);
      }
    });
  };

  getAcceptHint = () => {
    const { accept, aspectRatioHint, size } = this.props;
    let sizeText;

    if (size && size < 1) {
      sizeText = `${size * 1000} KB`;
    }
    if (size && size >= 1) {
      sizeText = `${size} MB`;
    }
    const acceptText = (accept || C_FILE.IMAGE_ACCEPT).split(',').map(item => item.split('image/')[1]);
    return (
      <p className="normal-color" style={{ fontSize: '.875rem', lineHeight: '1.5' }}>
        {`注：${(aspectRatioHint || '') && `图片裁剪比例为 ${aspectRatioHint}，`}${`图片支持 ${acceptText} 类型`}${(sizeText || '') && `，大小不超过${sizeText}`}。`}
      </p>
    );
  };

  render() {
    const { aspectRatio, accept } = this.props;
    return (
      <React.Fragment>
        {
          this.props.value ? (
            <img src={this.state.base64 || this.props.value} alt='' style={{ ...style.image, ...this.props.style }}
                 onClick={this.selectImage} />
          ) : (
            <div style={{ ...style.image, ...this.props.style }} className="column" onClick={this.selectImage}>
              <Icon type={this.state.confirmLoading ? 'loading' : 'plus'} />
              <span>上传</span>
            </div>
          )
        }
        <input id="image-input"
               type="file"
               accept={accept || C_FILE.IMAGE_ACCEPT}
               style={{ display: 'none' }} />
        <Modal
          mode={false}
          title="裁剪"
          handleCancel={this.handleCancel}
          handleSubmit={this.handleSubmit}
          isVisible={this.state.visible}
          isConfirmLoading={this.state.confirmLoading}
        >
          <Cropper
            style={{ height: 300, width: '100%' }}
            aspectRatio={aspectRatio}
            viewMode={2}
            dragMode='move'
            guides={true}
            // rotatable={true}
            autoCropArea={1}
            src={this.state.currentValue}
            ref={cropper => {
              this.cropper = cropper;
            }}
          />
        </Modal>
        {this.getAcceptHint()}
      </React.Fragment>
    );
  }
}

const style = {
  image: {
    // margin: '0 .5rem .5rem 0',
    minWidth: '6rem',
    minHeight: '6rem',
    height: '6rem',
    borderRadius: 4,
    border: '1px solid #eee',
    textAlign: 'center',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};
