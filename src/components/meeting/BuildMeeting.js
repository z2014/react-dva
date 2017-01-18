import React,{ Component, PropsType } from 'react';
import styles from './WriteOnlyMeeting.css';
import { DatePicker,TimePicker,Select,Input,Button,Popconfirm,message } from 'antd';
import moment from 'moment';
const Option = Select.Option; 
export default class BuildMeeting extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  date:null,
  	  time:null,
  	  meeting:null,
  	  status:'未召开',
  	  role:'部门例会'
  	}
  	this.submit = this.submit.bind(this);
  }
  setRole(value) {
    this.setState({
      role:value
    })
  }
  setName(ev) {
    this.setState({
      meeting:ev.target.value
    })
  }
  setTime = (moment) => {
    this.setState({
      time:moment.format('LT')
    })
  }
  setDate(date,dateString) {
    this.setState({
      date:dateString
    })
  }
  submit() {
  	const states = this.state;
  	let val = true;
  	for(let x in states) {
  	  if (states[x] == null) {
  	  	val = false;
  	  	break;
  	  }
  	}
  	if (val) {
  	  this.props.dispatch({
	  	type:'meeting/createMeeting',
	  	payload:this.state
	  });
	  setTimeout(function () {
	  	message.success('会议发起成功');
	  	this.setState({
	  	  date:null,
	  	  time:null,
	  	  meeting:null,
	  	  status:'未召开',
	  	  role:'部门例会'
	  	})
	  }.bind(this),500)
  	}else {
  	  message.error('上面内容不能为空');
  	}
  }
  render() {
  	return (
  	  <div style={{boxShadow: '0 0 6px 3px #ccc',width:600,marginLeft:50,padding:20}}>
        <div className={styles.div}>
          <span className={styles.span}>会议时间</span>
          <DatePicker onChange={(date,dateString) => this.setDate(date,dateString)}/>
          <TimePicker onChange={this.setTime}/>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议名称</span>
          <Input onBlur={(ev) => this.setName(ev)} className={styles.input}/>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议分类</span>
          <Select onChange={(value) => this.setRole(value)} defaultValue="部门例会" style={{width:120}}>
            <Option value="部门例会">部门例会</Option>
            <Option value="全员大会">全员大会</Option>
            <Option value="其他">其他</Option>
          </Select>
        </div>
        <div>
          <Popconfirm title="确定要发起会议吗" onConfirm={this.submit}>
            <Button type="primary">
            提交
            </Button>
          </Popconfirm>
        </div>
      </div>
  	)
  }
}