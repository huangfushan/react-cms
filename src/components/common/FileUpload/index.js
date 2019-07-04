/**
 * oss文件上传
 * @Author: huangfs
 * @Date: 2018-04-24
 * @Project: cms
 */

/**
 * 本组件只支持数组，如果有默认值，需要遍历生产下列对象属性
 * id: // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
 * status： //状态有 0， -1000，其他，只有0是成功的，从父组件传过来的数据需要遍历插入status：0
 * name: // 文件名
 * url: // 文件路径
 * duration： //音视频时长，如果type是video/audio，那么从父组件传过来的数据需要遍历插入duration
 *
 * file：//新文件才有的属性-选择的文件
 * progress： //新文件才有的属性-上传进度
 * @type {{fileList: Array}}
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button, Tooltip, message, Popconfirm } from 'antd';
import { checkFile } from '../../../utils/file';
import { Actions } from '../../../redux/actions';
import { C_FILE, C_RESP } from '../../../common/constants';
import { PushAliOss } from '../../../utils';
import VideoPlay from '../VideoPlay';
import './index.less';

const TYPE = {
  image: '图片',
  video: '视频',
  audio: '音频',
  file: '文件'
};

@connect(
  null,
  {
    clearAuth: Actions.auth.clearAuth
  }
)
export default class FileUpload extends React.Component {

  static propTypes = {
    type: PropTypes.string, //image, video, audio, file, 默认file,
    size: PropTypes.number, //文件大小，单位为MB，目前只有 image 生效
    accept: PropTypes.string, //支持的文件类型,默认全部
    multiple: PropTypes.bool, //多文件上传，默认单文件
    maxLength: PropTypes.number, //限制文件个数，默认不限制
    showType: PropTypes.string, // 图片展示类型,card,text，默认为text，目前只有type为 image, video 时才会生效
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array,
  };

  state = {
    fileList: [], //文件
  };

  componentDidMount() {
    const { size, type, showType } = this.props;
    if (size && type !== 'image') {
      console.warn('FileUpload warn: 文件上传组件，size属性目前只在 type：image 生效');
    }
    if (showType && (type !== 'image' && type !== 'video')) {
      console.warn('FileUpload warn: 文件上传组件，showType属性目前只在 type：image，video 生效');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.fileList) {
      return {
        fileList: nextProps.value
      };
    }
    return null;
  }

  //选择文件
  handleChooseFile = () => {
    const { type, accept, maxLength } = this.props;
    const fileList = this.state.fileList || [];
    if (maxLength && fileList.length >= maxLength) {
      message.error(`最多只能添加${maxLength}个${TYPE[type]}`);
      return;
    }
    const input = document.getElementById('file-upload');
    switch (type) {
      case 'image':
        input.setAttribute('accept', accept || C_FILE.IMAGE_ACCEPT);
        break;
      case 'video':
        input.setAttribute('accept', accept || C_FILE.VIDEO_ACCEPT);
        break;
      case 'audio':
        input.setAttribute('accept', accept || C_FILE.AUDIO_ACCEPT);
        break;
      default:
        input.setAttribute('accept', accept);
        break;
    }
    input.click();

    //因为IE,edge浏览器无法调用onchange方法有兼容问题，所以直接在input组件声明onchange方法
    //即使这样，仍然不一定能完全兼容IE
    // input.onchange = () => {
    //   let files = input.files;
    //   console.log('onchange', files);
    //   // this.inputOnChange(files, fileList);
    //   // input.value = '';
    // };
  };

  handleChangeInput = e => {
    let files = e.target.files;
    this.inputOnChange(files);
    e.target.value = '';
  };

  inputOnChange = (files) => {
    if (!files.length) return;
    const fileList = this.state.fileList || [];
    const { type, accept, maxLength, size } = this.props;

    //如果限制了文件个数，需要检验
    if (maxLength && fileList.length + files.length > maxLength) {
      message.error(`最多只能再添加${maxLength - fileList.length}个${TYPE[type] || '文件'}`);
      return;
    }

    //如果是图片需要先判断图片类型与文件大小
    if (type === 'image' && Object.values(files).some(n => !!checkFile(n, accept, size) !== true)) return;

    //因为files是个对象，所以需要手动去掉length属性
    delete files.length; //删除file对象的length属性
    //实际操作发现，IE浏览器不支持Object.values, 但是支持Object.keys，edge都可以
    const newFiles = Object.values(files).map((item, index) => {
      const n = {
        id: -new Date().getTime() - index,
        name: item.name,
        progress: 0,
        file: item,
      };
      if (type === 'audio' || type === 'video') {
        const url = URL.createObjectURL(item);
        const audioElement = new Audio(url);
        audioElement.addEventListener('loadedmetadata', () => {
          n.duration = Math.ceil(audioElement.duration * 1000); //音视频时长精确到毫秒，因为这里拿到到是秒，所以需要乘以1000
        });
      }
      return n;
    });

    fileList.push(...newFiles);
    this.onChange(fileList);
    this.handlePushFile(newFiles, type);
  };

  //批量上传
  handlePushFile = (files, type) => {
    Promise.all(files.map((item) => {
      switch (type) {
        case 'image':
          return this.pushFile(item, type);
        case 'video':
          return this.pushFile(item, type);
        case 'audio':
          return this.pushFile(item, type);
        case 'file':
          return this.pushFile(item, type);
        default:
          return this.pushFile(item, 'file');
      }
    })).then(resp => {
      console.log('上传成功', resp);
      // this.onChange();
    }).catch(resp => {
      console.log('上传失败', resp);
      // this.onChange();
    });
  };

  //开始上传，会先向后端获取ali oss key
  pushFile = (item, type) => {
    this.aliOssClient = new PushAliOss(item.file, type, p => {
      const fileList = this.state.fileList || [];
      const newFile = fileList.map(n => n.id === item.id ? ({ ...item, progress: parseInt(p * 100, 10) }) : n);
      this.onChange(newFile);
    });

    return this.aliOssClient.uploader().then(resp => {
      const fileList = this.state.fileList || [];
      const newFile = fileList.map(n => n.id === item.id ? ({ ...n, ...resp }) : n);
      this.onChange(newFile);
      if (resp.status === C_RESP.OK) {
        return resp; //success
      } else {
        return Promise.reject(resp); //error
      }
    });
  };

  //删除
  handleRemove = id => {
    //如果当前正在上传，需要暂停上传
    if (this.aliOssClient) {
      this.aliOssClient.cancel();
    }
    const fileList = this.state.fileList || [];
    this.onChange(fileList.filter(n => n.id !== id));
  };

  onChange = (fileList) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(fileList);
    }
  };

  //设置进度
  getRender = (item) => {
    if (item.status === C_RESP.OK) {
      return <span className="success-color file-upload-progress">已上传</span>;
    }
    if (item.status === C_RESP.ERR_FAIL) {
      return <span className="error-color file-upload-progress">上传失败</span>;
    }
    return <span className="file-upload-progress" style={{ color: '#999' }}>{`${item.progress} %`}</span>;
  };

  //设置提示
  getAcceptHint = () => {
    const { accept, type, maxLength, size } = this.props;
    let acceptText = [];
    let sizeText;
    switch (type) {
      case 'image':
        acceptText = (accept || C_FILE.IMAGE_ACCEPT).split(',').map(item => item.split('image/')[1]);
        break;
      case 'video':
        acceptText = (accept || C_FILE.VIDEO_ACCEPT).split(',').map(item => item.split('video/')[1]);
        break;
      case 'audio':
        acceptText = (accept || C_FILE.VIDEO_ACCEPT).split(',').map(item => item.split('audio/')[1]);
        break;
      default:
        break;
    }
    if (size && size < 1) {
      sizeText = `${size * 1000} KB`;
    }
    if (size && size >= 1) {
      sizeText = `${size} MB`;
    }
    if (acceptText.length || maxLength || sizeText) {
      return (
        <p className="normal-color file-upload-hint">
          {`注：${acceptText && `${TYPE[type] || '文件'}支持 ${acceptText} 类型`}${(maxLength || '') && `，最多上传 ${maxLength} 个${TYPE[type] || '文件'}`}${(sizeText || '') && `，每个${TYPE[type] || '文件'}大小不超过${sizeText}`}。`}
        </p>
      );
    }
  };

  getFileRender = () => {
    const { type, showType } = this.props;
    const { fileList } = this.state;
    switch (type) {
      case 'image':
        if (showType && showType === 'card') return (
          <div className="flex file-upload-show">
            {
              fileList && fileList.map((item, index) => (
                <div key={index} className="file-upload-show-item">
                  <div className="file-upload-show-item-box" style={{ height: '6rem' }}>
                    <a target="_blank" href={item.url}>
                      <img src={item.url} alt={item.name} />
                    </a>
                    {item.status !== C_RESP.OK && this.getRender(item)}
                  </div>
                  {
                    item.status === C_RESP.ERR_FAIL ? (
                      <p className="error-color file-upload-show-item-delete"
                         onClick={() => this.handleRemove(item.id)}>删除</p>
                    ) : (
                      <Popconfirm
                        placement="top"
                        title={'确定删除文件？'}
                        onConfirm={() => this.handleRemove(item.id)}
                        okText="确定"
                        cancelText="取消">
                        <p className="error-color file-upload-show-item-delete">删除</p>
                      </Popconfirm>
                    )
                  }
                </div>
              ))
            }
          </div>
        );
        return (
          fileList && fileList.map((item, index) => (
            <div key={index} className="flex file-upload-item">
              <Tooltip placement="top"
                       title={
                         <a target="_blank" href={item.url}>
                           <img src={item.url} alt={item.name} style={{ height: '4rem' }} />
                         </a>
                       }>
                <a className="overflow-1">{item.name}</a>
              </Tooltip>
              {this.getRender(item)}
              {
                item.status === C_RESP.ERR_FAIL ? (
                  <Icon type="close" onClick={() => this.handleRemove(item.id)} />
                ) : (
                  <Popconfirm
                    placement="top"
                    title={'确定删除文件？'}
                    onConfirm={() => this.handleRemove(item.id)}
                    okText="确定"
                    cancelText="取消">
                    <Icon type="close" />
                  </Popconfirm>
                )
              }
            </div>
          ))
        );
      case 'video':
        if (showType && showType === 'card') return (
          <div className="flex file-upload-show">
            {
              fileList && fileList.map((item, index) => (
                <div key={index} className="file-upload-show-item">
                  <div className="file-upload-show-item-box" style={{ height: '9rem' }}>
                    <VideoPlay
                      title={item.name}
                      url={item && item.url}
                      cover={item && item.cover}
                      style={{ height: '9rem', width: '16rem' }}
                    />
                    {item.status !== C_RESP.OK && this.getRender(item)}
                  </div>
                  {
                    item.status === C_RESP.ERR_FAIL ? (
                      <p className="error-color file-upload-show-item-delete"
                         onClick={() => this.handleRemove(item.id)}>删除</p>
                    ) : (
                      <Popconfirm
                        placement="top"
                        title={'确定删除文件？'}
                        onConfirm={() => this.handleRemove(item.id)}
                        okText="确定"
                        cancelText="取消">
                        <p className="error-color file-upload-show-item-delete">删除</p>
                      </Popconfirm>
                    )
                  }
                </div>
              ))
            }
          </div>
        );
        return (
          fileList && fileList.map((item, index) => (
            <div key={index} className="flex file-upload-item">
              <a className="overflow-1">{item.name}</a>
              {this.getRender(item)}
              {
                item.status === C_RESP.ERR_FAIL ? (
                  <Icon type="close" onClick={() => this.handleRemove(item.id)} />
                ) : (
                  <Popconfirm
                    placement="top"
                    title={'确定删除文件？'}
                    onConfirm={() => this.handleRemove(item.id)}
                    okText="确定"
                    cancelText="取消">
                    <Icon type="close" />
                  </Popconfirm>
                )
              }
            </div>
          ))
        );
      case 'audio':
        return (
          fileList && fileList.map((item, index) => (
            <div key={index} className="flex file-upload-item">
              <a className="overflow-1">{item.name}</a>
              {this.getRender(item)}
              {
                item.status === C_RESP.ERR_FAIL ? (
                  <Icon type="close" onClick={() => this.handleRemove(item.id)} />
                ) : (
                  <Popconfirm
                    placement="top"
                    title={'确定删除文件？'}
                    onConfirm={() => this.handleRemove(item.id)}
                    okText="确定"
                    cancelText="取消">
                    <Icon type="close" />
                  </Popconfirm>
                )
              }
            </div>
          ))
        );
      default:
        return (
          fileList && fileList.map((item, index) => (
            <div key={index} className="flex file-upload-item">
              <a className="overflow-1">{item.name}</a>
              {this.getRender(item)}
              {
                item.status === C_RESP.ERR_FAIL ? (
                  <Icon type="close" onClick={() => this.handleRemove(item.id)} />
                ) : (
                  <Popconfirm
                    placement="top"
                    title={'确定删除文件？'}
                    onConfirm={() => this.handleRemove(item.id)}
                    okText="确定"
                    cancelText="取消">
                    <Icon type="close" />
                  </Popconfirm>
                )
              }
            </div>
          ))
        );
    }
  };

  render() {
    const { multiple, type } = this.props;
    return (
      <React.Fragment>
        <Button onClick={this.handleChooseFile}>
          <Icon type="upload" />
          <span>{`选择${TYPE[type] || '文件'}`}</span>
        </Button>
        {this.getAcceptHint()}
        {this.getFileRender()}
        <input id="file-upload" type="file" multiple={multiple} style={{ display: 'none' }}
               onChange={this.handleChangeInput} />
      </React.Fragment>
    );
  }
}
