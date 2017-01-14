import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Layout from '../components/Common/Layout.js';
import TabPage from '../components/TabPage.js';
import MeetingPanel from '../components/meeting/MeetingPanel.js';

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting:props.data,
      currentNav:2
    }
  }
  handlechange = (key) => {
  	if (key == 'todo') {
  	  this.props.dispatch({
  		  type:'meeting/fetchTodo'
  	  })
  	}
  }
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
    console.log('data',this.state.meeting);
    const data = [
      {
        time:'2016',
        meeting:'第一届全员大会',
        role:'全员大会',
        status:'未召开',
        key:'1'
      },
      {
        time:'2016',
        meeting:'第二届全员大会',
        role:'全员大会',
        status:'未召开',
        key:'2'
      },
      {
        time:'2016',
        meeting:'第三届全员大会',
        role:'全员大会',
        status:'已召开',
        key:'3'
      }
    ];
  	const tabItems = [
      {
      	text:'我的会议',
      	key:'done',
      	content:<MeetingPanel data={data} dispatch={this.props.dispatch}/>
      },
      {
      	text:'发起会议',
      	key:'todo',
      	content:<p>11</p>
      }
  	];
    return (
      <Layout currentNav={'2'}>
        <TabPage items={tabItems} defaultActiveKey={'done'} onchange={this.handlechange}/>
      </Layout>)
  }
}
function mapStateToProps(meeting) {
  return {...meeting};
}
export default Meeting;