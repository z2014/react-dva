import React,{ Component,PropTypes } from 'react';
import { Input,Button,DatePicker,Select,TimePicker } from 'antd';
import styles from './WriteOnlyMeeting.css';
const Option = Select.Option;
const format = 'HH:mm';
export default class WriteOnlyMeeting extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      key:this.props.data.key,
      date:null,
      time:null,
      name:null,
      people:null,
      role:'部门例会',
  	  text:null
  	};
  	this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
  }
  setRole(value) {
    this.setState({
      role:value
    })
  }
  setPeople(ev) {
    this.setState({
      people:ev.target.value
    })
  }
  setName(ev) {
    this.setState({
      name:ev.target.value
    })
  }
  setDate(date,dateString) {
    this.setState({
      date:dateString
    })
  }
  setText(ev) {
  	this.setState({
  	  text:ev.target.value
  	})
  }
  setTime = (moment) => {
    this.setState({
      time:moment.format('LT')
    })
  }
  //更新table
  submit() {
    console.log(this.state);
    this.props.dispatch({
      type:'meeting/updateContent',
      payload:{
        data:this.state
      }
    });
    this.props.dispatch({
      type:'meeting/updateList',
      payload:{
        key:this.state.key
      }
    })
  }
  reset() {
    console.log(this.props);
    this.props.closeTable();
  }
  render() {
  	// var list = props.list;
  	return (
      <div className={styles.wrapper}>
        <div className={styles.div}>
          <span className={styles.span}>会议时间</span>
          <DatePicker onChange={(date,dateString) => this.setDate(date,dateString)}/>
          <TimePicker onChange={this.setTime}/>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议名称</span>
          <Input defaultValue={this.props.data.meeting} onBlur={(ev) => this.setName(ev)} className={styles.input}/>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议分类</span>
          <Select onChange={(value) => this.setRole(value)} defaultValue="部门例会" style={{width:120}}>
            <Option value="部门例会">部门例会</Option>
            <Option value="全员大会">全员大会</Option>
            <Option value="其他">其他</Option>
          </Select>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>参加人员</span>
          <Input className={styles.input} type="textarea" rows={4} onBlur={(ev) => this.setPeople(ev)}/>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议内容</span>
          <Input className={styles.input} type="textarea" rows={8} onBlur={(ev) => this.setText(ev)}/>
        </div>
        <Button type="primary" onClick={this.submit}>
        保存
        </Button>
        <Button type="primary" onClick={this.reset}>
        取消
        </Button>
      </div>
  	)
  }
}