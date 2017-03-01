import React,{ Component,PropTypes } from 'react';
import styles from './WriteOnlyMeeting.css';
export default class ReadOnlyMeeting extends Component {
  constructor(props) {
  	super(props);
  }
  render() {
  	const inline = {display:'inline-block'};
  	return (
      <div className={styles.wrapper}>
        <div className={styles.div}>
          <span className={styles.span}>会议时间</span>
          <div style={inline}>{this.props.data.date}</div>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议名称</span>
          <div style={inline}>{this.props.data.meeting}</div>
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
          <div style={inline} dangerouslySetInnerHTML={{__html:this.props.data.text}}></div>
        </div>
      </div>
  	)
  }
}