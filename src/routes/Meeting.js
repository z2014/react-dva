import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Layout from '../components/Common/Layout.js';
import TabPage from '../components/Common/TabPage.js';
import MeetingPanel from '../components/Meeting/MeetingPanel.js';
import BuildMeeting from '../components/Meeting/BuildMeeting.js';
import PullScreen from '../components/Common/PullScreen.js';

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting:props.meeting.data,
      currentNav:2,
      pullScreen:{
        isShow:false,
        title:null,
        content:null
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      meeting: nextProps.meeting.data
    });
  }
  
  showPullScreen = (pullScreen) => {
    this.setState({ 
      pullScreen :{
        isShow:true,
        title:pullScreen.title || '',
        content:pullScreen.content
      }
    })
  }
  handlechange = () => {
    this.props.dispatch({
      type:'fetchAllMeeting',
      payload:{
        depart:OAglobal.user.depart
      }
    })
  }
  closePullScreen = () => {
    this.setState({
      pullScreen:{
        isShow:false,
        title:null,
        content:null
      }
    })
  }

  render() {
    const { user } = OAglobal;
    // console.log('meeting',this.state.meeting);
    const tabItems1 = [
      {
        text:'我的会议',
        key:'done',
        content:<MeetingPanel data={this.state.meeting} dispatch={this.props.dispatch} 
                  closePullScreen={this.closePullScreen} showPullScreen={this.showPullScreen}/>
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
    const pullScreen = this.state.pullScreen;
    return (
      <Layout currentNav={this.props.meeting.currentNav}>
        <TabPage items={tabItems} defaultActiveKey={'done'} onChange={this.handlechange}/>
        <PullScreen
          isShow = {pullScreen.isShow} 
          onClose = {this.closePullScreen}
          title = {pullScreen.title}
          content = {pullScreen.content}
        />
      </Layout>)
  }
}
function mapStateToProps(meeting) {
  return {...meeting};
}
export default connect(mapStateToProps)(Meeting);