import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import style from './AvatarUpload.less';

export default class AvatarUpload extends Component {
  state = {
    imageUrl: this.props.member.avatar,
    showTips: false
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.member.avatar !== nextProps.member.avatar) {
      this.setState({ imageUrl: nextProps.member.avatar });
    }
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.setState({ imageUrl });
        // 上传响应数据
        this.props.onUpload(info.file.response);
      });
    }
  }

  onMouseOver = () => {

  }

  onShowTips = (isShow) => {
    if (this.props.disabled) {
      return false;
    } else {
      this.setState({
        showTips: isShow
      });
    }
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isIMG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif');
    if (!isIMG) {
      message.error('我只认识jpg/png/gif格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('照片辣么大我有点接受不了，我们约定2MB以内好不好');
    }
    return isIMG && isLt2M;
  }

  renderImg(imageUrl, name) {
    return (
      <div className={style.avatar_content} onMouseOver={e => this.onShowTips(true)} onMouseOut={e => this.onShowTips(false)}>
        {
          imageUrl == 'default'
          ? <span className={style.avatar_text}>{name.length > 2 ? name.substr(-2, 2) : name}</span>
          : <img src={imageUrl} role="presentation" className={style.avatar_img} />
        }
        { this.state.showTips ? <span className={style.avatar_cover}>点击修改</span> : null}
      </div>
    );
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <Upload
        className={style.avatar_uploader}
        name="avatar"
        showUploadList={false}
        action={this.props.formUrl}
        listType={'picture'}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
        disabled={this.props.disabled}
      >
        {
          imageUrl
          ? this.renderImg(imageUrl, this.props.member.name)
          : <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}