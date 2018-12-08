/**
 * 上传多张图片
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message } from 'antd';
import {beforeUpload} from "../../utils/image";
import {connect} from "react-redux";
import { C_API } from "../../common/constants";

@connect (
  state => ({
    session: state.auth.session,
  })
)
export default class Uploaders extends React.Component {
  static defaultProps = {
    data: PropTypes.array.isRequired,
    visible: PropTypes.bool,
  };

  state = {
    imageUrls: undefined,
  };

  beforeUpload = (file) => {
    if ( !beforeUpload(file) ) {
      return false;
    }
  };

  componentWillReceiveProps(nextProps){
    if ('visible' in nextProps){
      if (!nextProps.visible) {
        this.setState({imageUrls:undefined})
      }
    }
  }

  handleImageChange = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      this.setState({
        loading: true,
        imageUrls: fileList,
      });
    }
    if (file.status === 'done') {
      this.setState({
        imageUrls: fileList,
        loading:false
      },()=>this.onChangeImage(fileList, file))
    }
    if (file.status === 'error') {
      this.setState({
        imageUrls: fileList,
        loading:false
      },()=>this.onChangeImage(fileList))
    }
    if (file.status === 'removed') {
      this.setState({
        imageUrls: fileList,
        loading:false
      },()=>this.onChangeImage(fileList))
    }
  };

  onChangeImage = (value) => {
    const images = value.map((item) => {
      let value_item = {
        uid: item.uid,
        name: item.name,
        status: item.status,
        url: item.url || item.thumbUrl
      };
      if (item.response && item.response.status === 0){
        value_item.url = item.response.data[0].webPath
      }
      return value_item

    });

    const imgArr = this.getImageArr(images) || [];

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(imgArr)
    }
  };

  getImageArr = (images) => {
    for(let i=0; i<images.length ; i ++){
      if (images[i].status !== 'done'){
        message.error('图片错误');
        return;
      }
    }
    return images.map(item => item.url);
  };

  render() {

    const props_image = this.props.value || [];
    const number = this.props.number || 8;
    const images = [];
    props_image.map((item, index) => {
      let props_item = {
        uid: index,
        name: `图片${index+1}`,
        status: 'done',
        url: item,
      };
      images.push(props_item);
      return images
    });

    const imageUrls = this.state.imageUrls || images;

    const session = {
      session:this.props.session
    };

    const uploadButton = (
      <div>
        <Icon type={ 'plus'}/>
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <Upload
        name="file"
        headers={session}
        listType="picture-card"
        className="avatar-uploader"
        action={`${C_API.IMAGE}`}
        fileList={imageUrls}
        beforeUpload={this.beforeUpload}
        onChange={this.handleImageChange}
      >
        {imageUrls.length >= number ? null : uploadButton}
      </Upload>
    )
  }
}
