import React, { Component } from 'react';
import { connect } from 'dva';
import { message, Card } from 'antd';
import Layout from '../components/Common/Layout.js';
import PullScreen from '../components/Common/PullScreen.js';
import TabPage from '../components/Common/TabPage.js';
import MemberPanel from '../components/member/MemberPanel.js';
/*
 * 成员管理页
 */

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldUpdate: false,
      memberData: props.member.data,
      pullScreen: {
        isShow: false,
        title: null,
        content: null
      }
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.member.message.type == 'error') {
      message.error(nextProps.member.message.msg, 3);
    }
    if (nextProps.member.shouldUpdate || nextState.shouldUpdate) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      memberData: nextProps.member.data
    });
  }

  showPullScreen = (pullScreen) => {
    this.setState({
      pullScreen: {
        isShow: true,
        title: pullScreen.title,
        content: pullScreen.content
      }
    });
  }

  closePullScreen = () => {
    this.setState({
      pullScreen: {
        isShow: false,
        title: null,
        content: null
      }
    });
  }

  render() {
    const { pullScreen } = this.state;
    const tabItems = [
      {
        text: '成员管理',
        key: 'member',
        content:  <MemberPanel
                    showPullScreen={this.showPullScreen}
                    closePullScreen={this.closePullScreen}
                    dispatch={this.props.dispatch}
                    role={'member'}
                    data={this.state.memberData}
                  />
      },
      {
        text: '招新管理',
        key: 'recruit',
        content: <MemberPanel role={'recruit'} data={this.props.member.recruit}/>
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
        />
      </Layout>
    );
  }
}

function mapStateToProps(member) {
  return {...member};
}

export default connect(mapStateToProps)(Member);