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
import { base64toFile, imageBeforeUpload, getBase64, isBase64 } from '../../utils/image';
import { C_RESP } from '../../common/constants';
import commonApi from '../../api/commonApi';
import Modal from '../antd/Modal';
import { Actions } from '../../redux/actions';
import { pushAliOss } from '../../utils/aliOSS';
import { error } from '../../utils';

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
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      base64: '',
      visible: false, //弹窗可不可见
      confirmLoading: false, //弹窗确认中
      value: '', //当前的图片地址value
      currentValue: '' // 弹窗内到值
    };
  }

  //选中图片
  selectImage = (image) => {
    if (image) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/png,image/gif,image/jpg,image/jpeg');
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        if (imageBeforeUpload(file)) {
          if (!this.props.aspectRatio) { //如果不裁剪，直接上传
            this.fetchOssAccessKey(file);
            return;
          }
          //获取base64
          getBase64(file, base64 => {
            this.setState({ currentValue: base64 });
          });
          this.handleOpenModal();
        } else {
          alert('图片错误，请重新添加，图片仅支持jpg，png，gif，jpeg格式');
        }
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
    const file = base64toFile(base64[0], `image.${base64[1]}`); //base64转文件
    this.pushAliOss(file, 'image', base64[0]);
  };

  pushAliOss = (file, type, base64) => {
    this.setState({ confirmLoading: true });
    commonApi.fetchOssAccessKey().then(resp => {
      pushAliOss(resp, type, file).then((resp) => {
        this.setState({ confirmLoading: false });
        if (resp.status === C_RESP.OK) {
          this.handleSuccess(resp.url, base64); //上传成功后的逻辑
        } else {
          error(resp);
        }
      });
    });
  };

  render() {
    const { aspectRatio } = this.props;
    return (
      <div>
        {
          this.props.value ? (
            <img src={this.state.base64 || this.props.value} alt='' style={style.image} onClick={this.selectImage} />
          ) : (
            <div style={style.image} className="column" onClick={this.selectImage}>
              <Icon type={this.state.confirmLoading ? 'loading' : 'plus'} />
              <span>上传</span>
            </div>
          )
        }
        <Modal
          mode={false}
          title="裁剪"
          handleCancel={this.handleCancel}
          handleSubmit={this.handleSubmit}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
        >
          <Cropper
            style={{ height: 300, width: '100%' }}
            aspectRatio={(aspectRatio && typeof aspectRatio !== 'boolean' && aspectRatio) || 0}
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
      </div>
    );
  }
}

const style = {
  image: {
    margin: '0 .625rem .625rem 0',
    minWidth: 100,
    minHeight: 100,
    height: 100,
    borderRadius: 4,
    border: '1px solid #eee',
    textAlign: 'center',
    fontSize: 16,
    cursor: 'pointer'
  }
};
