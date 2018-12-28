/**
 * 图片裁剪上传组件，通过base64
 * @Author: huangfs
 * @Date: 2018-12-03
 * @Project: web-service
 */

//https://www.npmjs.com/package/react-cropper
//https://github.com/fengyuanchen/cropperjs#aspectratio
//版本1.0.1

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Cropper from 'react-cropper';
import { beforeUpload, getBase64, isBase64 } from '../../utils/image';
import { error } from '../../utils';
import { C_RESP } from '../../common/constants';
import commonApi from '../../api/commonApi';
import Modal from '../antd/Modal';
import 'cropperjs/dist/cropper.css';

export default class ImageCropper extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    aspectRatio: PropTypes.number,
    value: PropTypes.string,
  };

  static defaultProps = {
    // value: '', // 初始图片
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false, //弹窗可不可见
      confirmLoading: false, //弹窗确认中
      value: this.props.value, //当前的图片地址value
      currentValue: '' // 弹窗内到值
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  //选中图片
  selectImage = (image) => {
    if (image) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        if (beforeUpload(file)) {
          //获取base64
          getBase64(file, base64 => {
            this.setState({ currentValue: base64 });
          });
          //获取base64
          // const reader = new FileReader();
          // reader.onload = () => {
          //   console.log(reader.result)
          //   this.setState({ currentValue: reader.result });
          // };
          // reader.readAsDataURL(file);
          this.handleOpenModal();
        }
      };
    }
  };

  handleOpenModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSuccess = (value) => {
    this.setState({
      visible: false,
      value
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = () => {
    const canvas = this.cropper.getCroppedCanvas();
    if (!canvas || !canvas.toDataURL()) return;
    const base64 = isBase64(canvas.toDataURL());
    if (!base64) return;
    const params = {
      content: base64[2],
      suffix: base64[1],
    };
    this.saveToServer(params, base64[0]);
  };

  /**
   * 上传到服务端
   */
  saveToServer = (params) => {
    this.setState({ confirmLoading: true });
    commonApi.pushBase64(params).then(resp => {
      this.setState({ confirmLoading: false });
      switch (resp.status) {
        case C_RESP.OK:
          this.handleSuccess(resp.data.url);
          break;
        case C_RESP.ERR_INVALID:
          break;
        default:
          error(resp);
      }
    });
  };

  // useDefaultImage = () => {
  //   this.setState({
  //     value: this.props.value,
  //   });
  // };

  render() {
    return (
      <div>
        <div>
          {
            this.state.value ? (
              <img src={this.state.value} alt='' style={style.image} onClick={this.selectImage} />
            ) : (
              <div style={this.props.style || style.image} className="flex-center" onClick={this.selectImage}>
                {
                  this.props.children || <Icon type={this.state.loading ? 'loading' : 'plus'}>上传</Icon>
                }
              </div>
            )
          }
        </div>
        {/*<button onClick={this.useDefaultImage}>上一张</button>*/}
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
            aspectRatio={this.props.aspectRatio}
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
    margin: '0 10px 10px 0',
    width: 100,
    height: 100,
    borderRadius: 4,
    border: '1px solid #eee',
    textAlign: 'center',
    fontSize: 16,
    cursor: 'pointer'
  }
};
