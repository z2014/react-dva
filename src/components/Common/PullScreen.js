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
    this.setState({
      isShow: nextProps.isShow,
      title: nextProps.title,
      content: nextProps.content
    });
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
      <div className={style.pullscreen_wrap} style={{right: right, width: this.props.width, height: this.props.height}}>
        <div className={style.pullscreen_action} >
          <span className={style.pullscreen_action_close} >
            <Icon onClick={this.close} type="close-square" />
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