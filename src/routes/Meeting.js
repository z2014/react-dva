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

  componentWillReceiveProps(nextProps) {
    this.setState({
      meeting: nextProps.meeting.data
    });
  }
  render() {
    const { user } = OAglobal;
  	const tabItems1 = [
      {
      	text:'我的会议',
      	key:'done',
      	content:<MeetingPanel data={this.state.meeting} dispatch={this.props.dispatch}/>
      },
      {
        text:'发起会议',
        key:'todo',
        content:<BuildMeeting dispatch={this.props.dispatch} data={this.props.meeting}/>
      }
  	];
    const tabItems2 = [
      {
        text:'我的会议',
        key:'done',
        content:<MeetingPanel data={this.state.meeting} dispatch={this.props.dispatch}/>
      }
    ];
    const tabItems = user.role > 1 ? tabItems1:tabItems2;
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