import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Layout from '../components/Common/Layout.js';
import TabPage from '../components/TabPage.js';
import MemberPanel from '../components/member/MemberPanel.js';
/*
 * 成员管理页
 */

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: props.member.data
    }
  }

  // tab切换时请求数据
  handleTabChange = (key) => {
    if (key == 'recruit') {
      this.props.dispatch({
        type: 'member/fetchRecruit'
      });
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.member.message.type == 'error') {
      message.error(nextProps.member.message.msg, 3);
    }
    if (nextProps.member.shouldUpdate) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      memberData: nextProps.member.data
    });
  }

  render() {
    const self = this;
    const tabItems = [
      {
        text: '成员管理',
        key: 'member',
        content: <MemberPanel dispatch={this.props.dispatch} role={'member'} data={this.state.memberData}/>
      },
      {
        text: '招新管理',
        key: 'recruit',
        content: <MemberPanel role={'recruit'} data={this.props.member.recruit}/>
      }
    ];
    // console.log('member',this.props.member.data)
    return (
      <Layout currentNav={this.props.member.currentNav}>
        <TabPage items={tabItems} defaultActiveKey={'member'} onChange={this.handleTabChange} />
      </Layout>
    );
  }
}

Member.propTypes = {
};

function mapStateToProps(member) {
  return {...member};
}

export default connect(mapStateToProps)(Member);