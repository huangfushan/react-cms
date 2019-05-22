/**
 * 富文本 quill "^1.3.6"
 * 文档：https://quilljs.com/docs/formats/
 * 例子：https://huxiansheng.net/2018/05/19/%E5%BC%BA%E5%A4%A7%E7%9A%84quilljs%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8%E5%9C%A8React%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8/
 * @Author: huangfushan
 * @Date: 2019-05-17 12:19
 * @Project: cms-common
 */
import React from 'react';
import Quill from 'quill';
import PropTypes from 'prop-types';
import 'quill/dist/quill.snow.css';
import { checkFile, error, PushAliOss } from '../../../utils';
import { C_FILE, C_RESP } from '../../../common/constants';
import './index.less';

export default class RichText extends React.Component {

  static propTypes = {
    size: PropTypes.number, //文件大小，单位为MB，目前只有 image 生效
    accept: PropTypes.string, //支持的文件类型,默认全部
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  state = {
    value: '',
    toolbarOptions: [
      // ['bold', 'italic', 'underline', 'strike'],        // 加粗、斜体、下划线、删除线
      ['bold', 'italic', 'underline'],        // 加粗、斜体、下划线、删除线
      // [{ 'color': [] }, { 'background': [] }],          // 颜色、背景
      // [{ 'font': [] }],                                 // 字体大小
      // [{ 'align': [] }],                                // 文字对齐
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // 大小

      // ['blockquote', 'code-block'],                     // blockquote、代码块
      // ['code'],                                         // 内联代码
      [{ 'header': 1 }, { 'header': 2 }],               // 标题
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // 标题
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // 清单
      // [{ 'script': 'sub' }, { 'script': 'super' }],     // 上标/下标
      // [{ 'indent': '-1' }, { 'indent': '+1' }],         // 缩进
      // [{ 'direction': 'rtl' }],                         // 文字方向

      ['image'],                                        // 图片
      // ['video'],                                        // 视频
      ['clean']                                         // remove formatting button
    ],
  };

  componentDidMount() {
    // 配置项，在Quill 官网上有详细说明
    const options = {
      debug: 'warn',
      theme: 'snow',
      syntax: true,
      modules: {
        toolbar: {
          container: this.state.toolbarOptions,
          handlers: {
            'image': this.imageHandler,
          }
        },
      },
      placeholder: this.props.placeholder
    };
    // 实例化 Quill 并且储存在实例原型上
    this.editor = new Quill(this.refs.myQuillEditor, options);
    // 实现输入受控，从state中读取html字符串写入编辑器中
    const { value } = this.state;
    // 判断value中是否有值，如果有那么就写入编辑器中
    if (value) this.editor.clipboard.dangerouslyPasteHTML(value);
    // 设置事件，change事件，
    this.editor.on('text-change', this.handleChange);
    this.editor.blur();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.value !== nextProps.value) {
      if (!this.state.value && !this.editor.hasFocus()) {
        this.editor.clipboard.dangerouslyPasteHTML(nextProps.value);
        this.editor.blur();
        return true;
      }
      return false;
    }
    return false;
  }

  handleChange = () => {
    const html = this.editor.root.innerHTML;
    this.setState({
      value: html,
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(html === '<p><br></p>' ? undefined : html);
    }
  };

  imageHandler = (image) => {
    const range = this.editor.getSelection();
    this.editor.addContainer('dt-img');

    if (image) {
      const input = document.getElementById('dt-react-quill-input');
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        if (checkFile(file, this.props.accept, this.props.size)) {
          this.pushAliOss(file, 'image', range.index);
        }
        input.value = '';
      };
    }
  };

  pushAliOss = (file, type, index) => {
    this.setState({ confirmLoading: true });
    new PushAliOss(file, type).uploader().then((resp) => {
      this.setState({ confirmLoading: false });
      if (resp.status === C_RESP.OK) {
        this.insertToEditor(resp.url, index);//上传成功后的逻辑
      } else {
        error(resp);
      }
    });
  };

  // 替换文件
  insertToEditor(url, index) {
    if (!url) {
      return;
    }
    this.editor.insertEmbed(index, 'image', url);
    this.editor.setSelection(index + 1);
  }

  render() {
    return (
      <React.Fragment>
        <div ref="myQuillEditor" />
        <input type='file' accept={C_FILE.IMAGE_ACCEPT} id='dt-react-quill-input' style={{ display: 'none' }} />
      </React.Fragment>
    );
  }
}
