import React,{ Component,PropTypes } from 'react';
import styles from './WriteOnlyMeeting.css';
export default class ReadOnlyMeeting extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  text:null
  	};
  }
  render() {
  	const inline = {display:'inline-block'};
  	return (
      <div className={styles.wrapper}>
        <div className={styles.div}>
          <span className={styles.span}>会议时间</span>
          <div style={inline}>{`${this.props.data.date}:${this.props.data.time}`}</div>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议名称</span>
          <div style={inline}>{this.props.data.name}</div>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议分类</span>
          <div style={inline}>{this.props.data.role}</div>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>参加人员</span>
          <div style={inline}>{this.props.data.people}</div>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议内容</span>
          <div style={inline}>{this.props.data.text}</div>
        </div>
      </div>
  	)
  }
}