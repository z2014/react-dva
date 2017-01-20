import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Layout from '../components/Common/Layout.js';
import TabPage from '../components/Common/TabPage.js';
import MeetingPanel from '../components/meeting/MeetingPanel.js';
import BuildMeeting from '../components/meeting/BuildMeeting.js';

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting:props.meeting.data,
      currentNav:2
    }
  }
  // handlechange = (key) => {
  // 	if (key == 'done') {
  // 	  this.props.dispatch({
  // 		  type:'meeting/fetchAllMeeting',
  //       payload:{}
  // 	  })
  // 	}
  // }
  shouldComponentUpdate(nextProps) {
    if (nextProps.meeting.message.type == 'error') {
      message.error(nextProps.meeting.message.msg, 3);
    }
    if (nextProps.meeting.shouldUpdate) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      meeting: nextProps.meeting.data
    });
  }
  render() {
  	const tabItems = [
      {
      	text:'我的会议',
      	key:'done',
      	content:<MeetingPanel data={this.state.meeting} dispatch={this.props.dispatch}/>
      },
      {
      	text:'发起会议',
      	key:'todo',
      	content:<BuildMeeting dispatch={this.props.dispatch}/>
      }
  	];
    return (
      <Layout currentNav={this.props.meeting.currentNav}>
        <TabPage items={tabItems} defaultActiveKey={'done'} onChange={this.handlechange}/>
      </Layout>)
  }
}
function mapStateToProps(meeting) {
  return {...meeting};
}
export default connect(mapStateToProps)(Meeting);