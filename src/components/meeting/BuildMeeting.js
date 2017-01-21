import React,{ Component, PropsType } from 'react';
import styles from './WriteOnlyMeeting.css';
import { DatePicker,Select,Input,Button,Popconfirm,message } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';
import moment from 'moment-timezone/moment-timezone';

const Option = Select.Option; 
export default class BuildMeeting extends Component {
  constructor(props) {
  	super(props);
  	const { user } = OAglobal;
  	this.state = {
  	  key:this.props.data.data.length+1,
  	  date:moment().locale('en').utcOffset(0).format().slice(0,10),
  	  meeting:null,
  	  status:'未召开',
  	  role:'部门例会',
  	  owner: user.name
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
  setDate(date,dateString) {
    this.setState({
      date:dateString
    })
  }
  submit() {
  	const states = this.state;
  	console.log(states);
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
	  this.setState({
        key:null,
  	    date:moment().locale('en').utcOffset(0).format().slice(0,10),
  	    meeting:null,
  	    status:'未召开',
  	    role:'部门例会'
	  });
	  setTimeout(function () {
	  	message.success('会议发起成功');
	  }.bind(this),500)
  	}else {
  	  message.error('填写内容不能为空');
  	}
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
  	  key:nextProps.data.data.length+1
    })
  }
  render() {
  	return (
  	  <div style={{boxShadow: '0 0 6px 3px #ccc',width:600,marginLeft:50,padding:20}}>
        <div className={styles.div}>
          <span className={styles.span}>会议时间</span>
          <DatePicker onChange={(date,dateString) => this.setDate(date,dateString)}
          defaultValue={moment().locale('en').utcOffset(0)}
          locale={enUS}/>
        </div>
        <div className={styles.div}>
          <span className={styles.span}>会议名称</span>
          <Input onChange={(ev) => this.setName(ev)} className={styles.input} 
          value={this.state.meeting}/>
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