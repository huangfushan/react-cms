/**
 * 富文本，
 * 自定义了图片上传，先上传到服务器，拿到绝对路径
 * @Author: huangfs
 * @Date: 2018-11-01
 * @Project: cms
 */

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import commonApi from "../../../api/commonApi";
import {beforeUpload} from "../../../utils/image";
import { C_RESP } from "../../../common/constants";
import {error} from "../../../utils";
import './index.less';

export default class Index extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: '',
      MODULES: {
        toolbar: {
          container: [
            // ['bold', 'italic', 'underline', 'strike'],        // 加粗、斜体、下划线、中划线
            ['bold', 'italic', 'underline'],        // 加粗、斜体、下划线
            [{ 'align': [] }],                                // 字体方向，左对齐，右对齐，居中等
            // [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景
            // [{ 'font': [] }],                                 // 字体类型
            // [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
            // [{ 'header': 1 },{ 'header': 2 }, { 'header': [1, 2, 3, 4, 5, 6, false] }],        // 标题
            [{ 'header': [1, 2, 3, 4, false] }],        // 标题
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 清单，类似ul，li
            // [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进，不过是整体锁进
            // [{ 'direction': 'rtl' }],                         // 文字方向
            // ['blockquote', 'code-block'],                     // 代码块
            ['image'],                                        // 图片
            // ['video'],                                        // 视频
            ['clean'],                                        // 删除格式
          ],
          handlers: {
            'image': this.imageHandler,
          }
        },
        // clipboard: {
        //   matchVisual: false,
        // }
      }
    };
  }

  imageHandler = (image) => {
    if (image) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        let bool = beforeUpload(file);
        if (bool) {
          this.saveToServer(file);
        }
      };
    }
  };

  // 上传到服务端
  saveToServer = (file) =>{
    commonApi.pushFile({file}).then(resp => {
      if (resp.status === C_RESP.OK) {
        this.insertToEditor(resp.data[0] && resp.data[0].webPath)
      }else {
        error(resp)
      }
    });
  };

  // 替换文件
  insertToEditor(url){
    if (!url){
      return
    }
    const range = this.quillRef.getEditor().getSelection();
    this.quillRef.getEditor().insertEmbed(range.index, 'image', url);
  }

  handleChange = (value) => {
    this.setState({
      value
    });
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value)
    }
  };

  render() {
    return (
      <ReactQuill
        onChange={this.handleChange}
        modules={this.state.MODULES}
        placeholder={this.props.placeholder || ''}
        theme='snow'
        style={{minHeight:200}}
        value={this.state.value}
        ref={(el) => this.quillRef = el}
      />
    )
  }
}
