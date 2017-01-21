import DataTable from '../member/DataTable.js';
import WriteOnlyMeeting from './WriteOnlyMeeting.js';
import ReadOnlyMeeting from './ReadOnlyMeeting.js';
import React,{ Component,PropTypes } from 'react';
import { Popconfirm,message } from 'antd';
class MeetingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleWritten:false,
      isVisibleRead:false,
      record:null
    };
    this.closeTable = this.closeTable.bind(this);
    this.columns = [
      {
        title:'日期',
        dataIndex:'date',
        key:'time'
      },
      {
        title:'会议',
        dataIndex:'meeting',
        key:'meeting'
      },
      {
        title:'分类',
        dataIndex:'role',
        key:'role'
      },
      {
        title:'状态',
        dataIndex:'status',
        key:'status',
        filters:[
          {
            text:'未召开',
            value:'未召开'
          },
          {
            text:'已召开',
            value:'已召开'
          }
        ],
        onFilter:(value,record) => record.status.indexOf(value) === 0
      },
      {
        title:'操作',
        dataIndex:'operate',
        key:'operate',
        render:(text,record,index) => {
          return (
            <Edit record={record} editMeeting={this.editMeeting} seeMeeting={this.seeMeeting}/>
          )
        }
      }
    ];
    this.editMeeting = this.editMeeting.bind(this);
    this.seeMeeting = this.seeMeeting.bind(this);
  }
  //编辑table
  editMeeting(record) {
    return () => {
      //保证页面上只显示一个table
      const { user } = OAglobal;
      if (user.name !== record.owner) {
        message.error('只有会议发起者才能编辑');
        return;
      }else {
        if (!this.state.isVisibleWritten) {
          this.setState({
            isVisibleWritten:!this.state.isVisibleWritten,
            isVisibleRead:false,
            record:record
          })
        }
      }    
    }
  }
  //查看table
  seeMeeting(record) {
    return () => {
      this.setState({
        record:record
      });
      //保证页面上只显示一个table
      if (!this.state.isVisibleRead) {
        this.setState({
          isVisibleWritten:false,
          isVisibleRead:!this.state.isVisibleRead,
          record:record
        })
      }
    }
  }
  closeTable() {
    this.setState({
      isVisibleRead:false,
      isVisibleWritten:false
    })
  }
  render() {
  	let data = this.props.data;
    const columns = this.columns;
    //测试数据
    const text = {
      key:1,
      date:2016/11/20,
      time:'9:30',
      name:'第一次全员大会',
      people:'张春林',
      role:'部门例会',
      text:'啊哈哈哈哈哈'
    };
  	return (
      <div>
        <DataTable pagesize={5} columns={columns} dataSource={data} 
        style={{width:'50%',display:'inline-block',marginRight:20}}/>
        {
          this.state.isVisibleWritten
            &&
          <WriteOnlyMeeting data={this.state.record} closeTable={this.closeTable} 
          dispatch={this.props.dispatch}/>
        }
        {
          this.state.isVisibleRead
            &&
          <ReadOnlyMeeting data={this.state.record} closeTable={this.closeTable}/>
        }
      </div>
  	)
  }
}
function Edit(props){
  const record = props.record;
  if (record.status == '已召开') {
    return  <a onClick={props.seeMeeting(record)}>查看内容</a>
  }else{
    return  <a onClick={props.editMeeting(record)}>编辑内容</a>
  }
}
export default MeetingPanel;
