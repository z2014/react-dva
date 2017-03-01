import React, { Component } from 'react';
import { connect } from 'dva';
import { message, Card } from 'antd';
import Layout from '../components/Common/Layout.js';
import PullScreen from '../components/Common/PullScreen.js';
import TabPage from '../components/Common/TabPage.js';
import MemberPanel from '../components/Member/MemberPanel.js';
import RecruitPanel from '../components/Member/RecruitPanel.js';
/*
 * 成员管理页
 */

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldUpdate: false,
      memberData: props.member.members.members,
      pullScreen: {
        isShow: false,
        title: null,
        content: null
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.pullScreen.isShow !== this.state.pullScreen.isShow) {
      return true;
    } else if (nextProps.member.shouldUpdate || nextState.shouldUpdate) {
      return true;
    } else {
      return false;
    }
  }

  componentWillReceiveProps(nextProps) {
    const msg = nextProps.member.message;
    const oldMsg = this.props.member.message;
    // 利用Symbol类型的key解决消息重复的问题
    if (msg.key !== oldMsg.key) {
      if (msg.type == 'success') {
        message.success(msg.msg, 4);
      } else if (msg.type == 'error') {
        message.error(msg.msg, 4);
      }
    }
    this.setState({
      memberData: nextProps.member.members.members
    });
  }

  // 推屏展示
  showPullScreen = (pullScreen) => {
    this.setState({
      pullScreen: {
        isShow: true,
        title: pullScreen.title || '',
        content: pullScreen.content
      }
    });
  }

  // 关闭推屏
  closePullScreen = () => {
    this.setState({
      pullScreen: {
        isShow: false,
        title: null,
        content: null
      }
    });
  }

  // tab切换时请求数据
  handleTabChange = (key) => {
    if (key == 'recruit') {
      this.props.dispatch({
        type: 'member/fetchRecruits'
      });
    };
  }

  // 更新用户信息
  updateMemberInfo = (member) => {
    this.props.dispatch({
      type: 'member/updateMember',
      payload: member
    });
  }

  searchMembersData = (payload) => {
    this.props.dispatch({
      type: 'member/fetchMembers',
      payload
    });
  }

  queryRecruitData = (conditions) => {
    this.props.dispatch({
      type: 'member/fetchRecruits',
      payload: {
        ...conditions
      }
    });
  }

  showRecruitInfo = (item, content) => {
    // 获取应聘数据
    this.props.dispatch({
      type: 'recruit/fetchRecruit',
      payload: {
        id: item.key
      }
    });
    this.showPullScreen({ title: '应聘详情：' + item.name + ' ' + item.stuid, content });
  }

  resetRecruitData = () => {
    this.props.dispatch({
      type: 'member/fetchRecruits'
    });
  }

  render() {
    const { pullScreen } = this.state;
    const { loading } = this.props.member;
    const tabItems = [
      {
        text: '成员管理',
        key: 'member',
        content:  <MemberPanel
                    loading={loading.member}
                    showPullScreen={this.showPullScreen}
                    closePullScreen={this.closePullScreen}
                    updateMemberInfo={this.updateMemberInfo}
                    searchMembersData={this.searchMembersData}
                    role={'member'}
                    members={this.state.memberData}
                    conditions={this.props.member.members.conditions || new Object}
                  />
      },
      {
        text: '招新管理',
        key: 'recruit',
        content: <RecruitPanel
                   loading={loading.recruit}
                   showRecruitInfo={this.showRecruitInfo}
                   closePullScreen={this.closePullScreen}
                   role={'recruit'}
                   recruit={this.props.member.recruit}
                   queryRecruitData={this.queryRecruitData}
                   resetRecruitData={this.resetRecruitData}
                 />
      }
    ];
    if (OAglobal.user.role < 1) {
      return (
        <Layout currentNav={this.props.member.currentNav}>
          <Card style={{width: '50%', margin: '0px auto', textAlign: 'center'}}>
            <h2>啊哦，迷路了</h2>
          </Card>
        </Layout>
      );
    }
    return (
      <Layout currentNav={this.props.member.currentNav}>
        <TabPage
          items={tabItems}
          defaultActiveKey={'member'}
          onChange={this.handleTabChange}
        />
        <PullScreen
          isShow={pullScreen.isShow}
          onClose={this.closePullScreen}
          title={pullScreen.title}
          content={pullScreen.content}
          width={'60%'}
        />
      </Layout>
    );
  }
}

function mapStateToProps(member) {
  return {...member};
}

export default connect(mapStateToProps)(Member);