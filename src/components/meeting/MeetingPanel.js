import DataTable from '../Common/DataTable.js';
import WriteOnlyMeeting from './WriteOnlyMeeting.js';
import ReadOnlyMeeting from './ReadOnlyMeeting.js';
import MeetingEdit from './MeetingEdit.js';
import React,{ Component,PropTypes } from 'react';
import { Popconfirm,message } from 'antd';
import SelectCell from '../Common/SelectCell.js';
import MeetingFilter from '../meeting/MeetingFilter.js';

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
        key:'date'
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
            <MeetingEdit record={record} editMeeting={this.editMeeting} seeMeeting={this.seeMeeting}/>
          )
        }
      }
    ];
    this.editMeeting = this.editMeeting.bind(this);
    this.seeMeeting = this.seeMeeting.bind(this);
  }
  //编辑table
  editMeeting(record) {
      const { user } = OAglobal;
      if (user.name !== record.owner) {
        message.error('只有会议发起者才能编辑');
        return;
      }else {
        this.props.showPullScreen({
          content:<WriteOnlyMeeting data={record} dispatch={this.props.dispatch} 
                        closePullScreen={this.props.closePullScreen}/>
        })
      }
  }
  //查看table
  seeMeeting(record) {
    this.props.showPullScreen({
      content: <ReadOnlyMeeting data={record}/>
    })
  }

  closeTable() {
    this.props.closePullScreen();
  }

  handleSearch = (param) => {
    this.props.dispatch({
      type:'meeting/fetchAllMeeting',
      payload:param
    })
  }

  render() {
  	let data = this.props.data;
    const columns = this.columns;
  	return (
      <div>
        <MeetingFilter handleSearch={this.handleSearch}/>
        <DataTable pagesize={5} columns={columns} dataSource={data}
        style={{width:'100%',height:'100%',display:'inline-block',marginRight:20}}/>
      </div>
  	)
  }
}

export default MeetingPanel;
