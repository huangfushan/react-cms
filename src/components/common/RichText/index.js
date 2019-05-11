/**
 * "react-quill": "^1.3.1"
 * 富文本，
 * 自定义了图片上传，先上传到服务器，拿到绝对路径
 * @Author: huangfs
 * @Date: 2018-11-01
 * @Project: cms
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { checkFile } from '../../../utils/file';
import { C_FILE, C_RESP } from '../../../common/constants';
import { error, PushAliOss } from '../../../utils';
import './index.less';

export default class RichText extends React.Component {
  static propTypes = {
    size: PropTypes.number, //文件大小，单位为MB，目前只有 image 生效
    accept: PropTypes.string, //支持的文件类型,默认全部
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  constructor(props) {
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
            [{ 'header': 1 }, { 'header': 2 }],        // 标题
            // [{ 'header': [1, 2, 3, 4, false] }],        // 标题
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // 清单，类似ul，li
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return nextProps;
    }
    return null;
  }

  shouldComponentUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      return true;
    }
    return false;
  }

  imageHandler = (image) => {
    if (image) {
      const input = document.getElementById('rich-text-input');
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        if (checkFile(file, this.props.accept, this.props.size)) {
          this.pushAliOss(file, 'image');
        }
      };
    }
  };

  pushAliOss = (file, type) => {
    this.setState({ confirmLoading: true });
    new PushAliOss(file, type).uploader().then((resp) => {
      this.setState({ confirmLoading: false });
      if (resp.status === C_RESP.OK) {
        this.insertToEditor(resp.url);//上传成功后的逻辑
      } else {
        error(resp);
      }
    });
  };

  // 替换文件
  insertToEditor(url) {
    if (!url) {
      return;
    }
    const range = this.quillRef.getEditor().getSelection();
    this.quillRef.getEditor().insertEmbed(range.index, 'image', url);
  }

  handleChange = (value) => {
    this.setState({
      value
    }, () => {
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(value);
        const input = document.getElementById('rich-text-input');
        input.value = '';
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <ReactQuill
          onChange={this.handleChange}
          modules={this.state.MODULES}
          placeholder={this.props.placeholder || ''}
          theme='snow'
          style={{ minHeight: 200 }}
          value={this.state.value}
          ref={(el) => this.quillRef = el}
        />
        <input type='file' accept={C_FILE.IMAGE_ACCEPT} id='rich-text-input' style={{ display: 'none' }} />
      </React.Fragment>
    );
  }
}
