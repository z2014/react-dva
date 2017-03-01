import React, { Component } from 'react';
import { Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import style from './PullScreen.less';

export default class PullScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: props.isShow,
      title: props.title,
      content: props.content
    }
  }

  static defaultProps = {
    isShow: false,
    width: '50%',
    height: '100%',
    title: '',
    onClose: function() {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShow) {
      // 监听点击事件，点击推屏以外区域时收起推屏
      document.getElementById('root').addEventListener('click', this.handleClick);
    } else {
      // 收起推屏时取消事件监听
      document.getElementById('root').removeEventListener('click', this.handleClick);
    }
    this.setState({
      isShow: nextProps.isShow,
      title: nextProps.title,
      content: nextProps.content
    });
  }

  handleClick = (e) => {
    // 点击推屏以外区域收起推屏
    if (this.refs.fullscreen_wrap && !this.refs.fullscreen_wrap.contains(e.target)) {
      this.close();
    }
  }

  close = () => {
    this.setState({
      isShow: false,
      title: null,
      content: null
    });
    this.props.onClose();
  }

  render() {
    const { title, content, isShow } = this.state;
    const right = isShow ? '0px' : '-' + this.props.width;
    return(
      <div ref="fullscreen_wrap" className={style.pullscreen_wrap} style={{right: right, width: this.props.width, height: this.props.height}}>
        <div className={style.pullscreen_action} >
          <span onClick={this.close} className={style.pullscreen_action_close} >
            <Icon type="close" />
          </span>
          <span className={style.pullscreen_title}>
            {this.props.title}
          </span>
        </div>
        <div className={style.pullscreen_container}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            {
              this.props.content
            }
          </Scrollbars>
        </div>
      </div>
    );
  }
}