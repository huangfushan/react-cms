/**
 * 文章编辑
 * @Author: huangfushan
 * @Date: 2019-03-13 14:49
 * @Project: web-manager-admin
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Spin, message, Divider } from 'antd';
import { error, getUrlParams } from '../../../utils';
import TabSingleBox from '../../../components/common/TabSingleRadio';
import ImageUpload from '../../../components/common/ImageUpload';
import articleApi from '../../api/articleApi';
import { Actions } from '../../../redux/actions';
import { C_RESP } from '../../../common/constants';
import FileUpload from '../../../components/common/FileUpload';
import Selector from '../../../components/antd/Selector';
import AddressSelector from '../../../components/common/AddressSelector';
import ReactQuill from '../../../components/common/RichText';

@Form.create()
@connect(
  state => ({
    service: state.common.service
  }),
  {
    clearAuth: Actions.auth.clearAuth
  }
)
export default class ArticleEdit extends React.Component {

  static propTypes = {
    service: PropTypes.array.isRequired,
    clearAuth: PropTypes.func.isRequired,
  };

  static defaultProps = {
    service: [
      { 'group': [{ 'id': 1, 'name': '高考精选' }], 'id': 'S009', key: 'S009', 'name': '高考直通车' },
      {
        'group': [
          { 'id': 2, 'name': '名师推荐' },
          { 'id': 3, 'name': '院校资讯' },
          { 'id': 4, 'name': '研招信息' },
          { 'id': 5, 'name': '机构介绍' },
          { 'id': 6, 'name': '复习规划' }],
        'id': 'S010',
        key: 'S010',
        'name': '考研驿站'
      },
      { 'group': [{ 'id': 7, 'name': '留学攻略' }], 'id': 'S011', 'name': '出国留学', key: 'S011', },
      {
        'group': [{ 'id': 8, 'name': '公考资讯' }, { 'id': 9, 'name': '上岸经验' }],
        'id': 'S012',
        key: 'S012',
        'name': '考公务员'
      },
      {
        'group': [{ 'id': 10, 'name': '就业精选' }, { 'id': 11, 'name': '就业政策' }, { 'id': 12, 'name': '企业访谈' }],
        'id': 'S013',
        key: 'S013',
        'name': '求职社区'
      },
      {
        'group': [{ 'id': 13, 'name': '创业政策' }, { 'id': 14, 'name': '商业案例' }, { 'id': 15, 'name': '人物访谈' }],
        'id': 'S014',
        key: 'S014',
        'name': '创业资讯'
      },
    ]
  };

  state = {
    data: {},
    isFetching: false,
    isPushing: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { params } = this.props.match;
    if (!params.id) return;
    this.setState({
      isFetching: true
    });
    articleApi.fetchArticle(params.id).then(resp => {
      switch (resp.status) {
        case C_RESP.OK:
          const data = resp.data;
          if (data.type === 'VIDEO') {
            data.video = data.media && [{ id: -1, status: 0, name: data.media, url: data.media }];
          }
          if (data.type === 'AUDIO') {
            data.audio = data.media && [{ id: -1, status: 0, name: data.media, url: data.media }];
          }
          this.setState({
            data,
            isFetching: false
          });
          break;
        case C_RESP.ERR_401:
          this.props.clearAuth();
          break;
        default:
          error(resp);
          break;
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return;
      }
      const { params } = this.props.match;
      const serviceId = getUrlParams('service');
      if (!serviceId) return;
      const newValue = {
        groupId: values.groupId,
        title: values.title,
        cover: values.cover,
        content: values.content,
        type: values.type,
        serviceId: !params.id ? serviceId : undefined, //id存在是修改数据，serviceId无法修改。不存在说明是新加数据，需要传serviceId，
      };
      if (values.type === 'AUDIO') {
        if (values.audio && values.audio.some(n => n.status !== 0)) return;
        newValue.media = values.audio && values.audio[0] && {
          duration: values.audio[0].duration,
          url: values.audio[0].url
        };
      }
      if (values.type === 'VIDEO') {
        if (values.video && values.video.some(n => n.status !== 0)) return;
        newValue.media = values.video && values.video[0] && {
          duration: Math.ceil(values.video[0].duration / 1000),
          url: values.video[0].url
        };
      }

      this.pushData(params.id, newValue);

    });
  };

  pushData = (id, params) => {
    this.setState({
      isPushing: true
    });
    articleApi.pushArticle(id, params).then(resp => {
      switch (resp.status) {
        case C_RESP.OK:
          message.success('操作成功');
          this.goBack();
          break;
        case C_RESP.ERR_401:
          this.props.clearAuth();
          break;
        default:
          this.setState({
            isPushing: false,
          });
          error(resp);
          break;
      }
    });
  };

  //如果是三级联动必须全部选择需要检测
  handleValidatorAddress = (rule, value, callback) => {
    if (value && (!value.province || !value.city || !value.county)) {
      callback('请选择完整地址！');
    }
    callback();
  };

  goBack = () => this.props.history.goBack();

  render() {
    const { data } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { params } = this.props.match;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 }, sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 }, sm: { span: 18 },
      },
    };
    const service = this.props.service.find(n => n.key === getUrlParams('service'));
    const group = service && service.group.map(item => ({ key: item.id, value: item.name }));
    return (
      <Spin spinning={this.state.isFetching}>
        <Form onSubmit={this.handleSubmit} className="post-form">
          <Form.Item label="请选择投稿类型" {...formItemLayout}>
            {
              (!params.id || data.isPlatform === 1) ? getFieldDecorator('groupId', {
                initialValue: (data.group && data.group.id) || undefined,
                rules: [{ required: true, message: '请选择投稿类型' }]
              })(
                <TabSingleBox data={group || []} />
              ) : (data.group && data.group.name)
            }
          </Form.Item>
          <Form.Item label="标题" {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: data.title,
              rules: [
                { required: true, message: '请输入标题' },
                { min: 1, max: 30, message: '标题最多30个字符' }
              ]
            })(
              <Input placeholder="请输入标题" style={{ maxWidth: 400 }} />
            )}
          </Form.Item>
          <Form.Item label="标题" {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: data.address,
              rules: [
                { required: true, message: '请输入地址' },
                { validator: this.handleValidatorAddress }
              ]
            })(
              <AddressSelector />
            )}
          </Form.Item>
          <Form.Item label="添加封面" {...formItemLayout}>
            {getFieldDecorator('cover', {
              initialValue: data.cover,
            })(
              <ImageUpload style={{ maxWidth: 400 }} aspectRatio={16 / 9} aspectRatioHint="16/9" />
            )}
          </Form.Item>
          <Form.Item label="文章类型" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: data.type,
              rules: [
                { required: true, message: '请选择文章类型' },
              ],
            })(
              <Selector
                placeholder="请选择文章类型"
                style={{ maxWidth: 400 }}
                data={[
                  { key: 'NOTE', value: '文本' },
                  { key: 'VIDEO', value: '视频+文本' },
                  { key: 'AUDIO', value: '音频+文本' }
                ]}
              />
            )}
          </Form.Item>
          {
            form.getFieldValue('type') === 'VIDEO' && (
              <React.Fragment>
                <Form.Item label="添加视频" {...formItemLayout}>
                  {getFieldDecorator('video', {
                    initialValue: data.video,
                    rules: [
                      { required: true, message: '请添加视频' },
                    ]
                  })(
                    <FileUpload type="video" maxLength={1} />
                  )}
                </Form.Item>
                <Form.Item label="请输入正文" {...formItemLayout}>
                  {getFieldDecorator('content', {
                    initialValue: data.content,
                    rules: [
                      { required: true, message: '请输入正文' },
                    ]
                  })(
                    <ReactQuill />
                  )}
                </Form.Item>
              </React.Fragment>
            )
          }
          {
            form.getFieldValue('type') === 'AUDIO' && (
              <React.Fragment>
                <Form.Item label="添加音频" {...formItemLayout}>
                  {getFieldDecorator('audio', {
                    initialValue: data.audio,
                    rules: [
                      { required: true, message: '请添加音频' },
                    ]
                  })(
                    <FileUpload type='audio' maxLength={1} showType="card" />
                  )}
                </Form.Item>
                <Form.Item label="请输入正文" {...formItemLayout}>
                  {getFieldDecorator('content', {
                    initialValue: data.content,
                    rules: [
                      { required: true, message: '请输入标题' },
                    ]
                  })(
                    <ReactQuill size={0.1} />
                  )}
                </Form.Item>
              </React.Fragment>
            )
          }
          {
            form.getFieldValue('type') === 'NOTE' && (
              <React.Fragment>
                <Form.Item label="请输入正文" {...formItemLayout}>
                  {getFieldDecorator('content', {
                    initialValue: data.content,
                    rules: [
                      { required: true, message: '请输入标题' },
                    ]
                  })(
                    <ReactQuill placeholder="请输入标题" />
                  )}
                </Form.Item>
              </React.Fragment>
            )
          }
          <Form.Item style={{ textAlign: 'center' }}>
            <Button onClick={this.goBack} type='danger'>取消</Button>
            <Divider type="vertical" />
            <Button htmlType="submit" type='primary' loading={this.state.isPushing}>确定</Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}
