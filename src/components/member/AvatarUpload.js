import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import style from './AvatarUpload.less';

export default class AvatarUpload extends Component {
  state = {
    imageUrl: this.props.imgUrl,
    showTips: false
  };

  handleChange = (info) => {
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  onMouseOver = () => {
    this.setState({
      showTips: true
    });
  }

  onMouseOut = () => {
    this.setState({
      showTips: false
    });
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

  renderImg(imageUrl) {
    return (
      <div className={style.avatar_content} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <img src={imageUrl} role="presentation" className={style.avatar_img} />
        { this.state.showTips ? <span className={style.avatar_cover}>点击修改</span> : null}
      </div>
    );
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className={style.avatar_uploader}
        name="avatar"
        showUploadList={false}
        action={this.props.formUrl}
        listType={'picture'}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl
          ? this.renderImg(imageUrl)
          : <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}