import React,{ Component,PropTypes } from 'react';
import { Input,Button,DatePicker,Select,TimePicker,message,Popconfirm } from 'antd';
import styles from './WriteOnlyMeeting.css';
const Option = Select.Option;
const format = 'HH:mm';
export default class WriteOnlyMeeting extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      infor:{
        id:this.props.data.id,
        date:null,
        status:'已召开',
        meeting:this.props.data.meeting,
        people:null,
        role:'部门例会',
        text:null
      },
      show:false
  	};
  	this.submit = this.submit.bind(this);
  }
  setRole(value) {
    const { infor } = this.state;
    infor.role = value;
  }
  setPeople(ev) {
    const { infor } = this.state;
    infor.people = ev.target.value
  }
  setName(ev) {
    const { infor } = this.state;
    infor.meeting = ev.target.value;
  }
  setDate(date,dateString) {
    const { infor } = this.state;
    infor.date = dateString;
    this.setState({
      show:true
    })
  }
  setText(ev) {
    let text = ev.target.value;
    let text2 = text.replace(/\s/g,'<br>');
  	const { infor } = this.state;
    infor.text = text2;
  }
  setTime = (time,timeString) => {
    if (this.state.infor.date != null) {
      const { infor } = this.state;
      infor.date = this.state.infor.date + ' ' + timeString;
    }else{
      message.error('请先选择日期');
    }
  }
  //更新table
  submit() {
    let { infor } = this.state;
    let val = true;
    for ( let x in infor) {
      if (infor[x] == null) {
        message.error('填写的内容不能为空');
        val = false;
        break;
      }
    }
    if (val) {
      this.props.dispatch({
        type:'meeting/updateList',
        payload:{
          meeting:infor
        }
      });
      message.success("保存成功");
      setTimeout(function () {
        this.props.closePullScreen();
      }.bind(this),500);
    }
  }
  render() {
  	return (
      <div className={styles.wrapper}>
        <div className={styles.div}>
          <span className={styles.span}>会议时间</span>
          <DatePicker onChange={(date,dateString) => this.setDate(date,dateString)}/>
          {this.state.show && <TimePicker onChange={this.setTime}/>}
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
          <Input className={styles.input} type="textarea" rows={8} 
          onBlur={(ev) => this.setText(ev)} placeholder="每条记录之间用回车换行"/>
        </div>
        <Button type="primary" onClick={this.submit}>
        保存
        </Button>
      </div>
  	)
  }
}

WriteOnlyMeeting.PropTypes = {
  text: PropTypes.string
}