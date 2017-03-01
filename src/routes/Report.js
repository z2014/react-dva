import React, { Component, PropTypes } from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import Layout from '../components/Common/Layout.js';
import TabPage from '../components/Common/TabPage.js';
import FillReport from '../components/Report/FillReport.js';
import MyReport from '../components/Report/MyReport.js';
import ReviewReport from '../components/Report/ReviewReport.js';

class Report extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const msg = nextProps.report.message;
    const oldMsg = this.props.report.message;
    // 利用Symbol类型的key解决消息重复的问题
    if (msg.key !== oldMsg.key) {
      if (msg.type == 'success') {
        message.success(msg.msg, 3);
      } else if (msg.type == 'error') {
        message.error(msg.msg, 3);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.report.shouldUpdate) {
      return true;
    }
    return false;
  }

  // tabpage切换时获取对应数据
  handleTabChange = (key) => {
    switch(key) {
      case 'fill':
        this.props.dispatch({
          type: 'report/fetchStatus'
        });
        break;
      case 'review':
        this.props.dispatch({
          type: 'report/fetchReports'
        });
        break;
      case 'my':
        this.props.dispatch({
          type: 'report/fetchMyReport'
        });
        break;
    }
  }

  // 提交汇报
  submitReport = (payload) => {
    this.props.dispatch({
      type: 'report/submitReport',
      payload: payload
    });
  }

  /* 提交薪资
   * type: 薪资类型：review(部长薪资意见)／ final(最终薪资)
   * value: 薪资数值
   * id: 对应汇报ID
   */
  handleSalaryChange = (type, value, id) => {
    let payload = new Object;
    if (type == 'review') {
      payload = { id, salary_sug: value }
    } else {
      payload = { id, salary: value }
    }
    this.props.dispatch({
      type: 'report/updateReport',
      payload
    });
  }

  // 更新部长回评
  handleCommentChange = (value, id) => {
    this.props.dispatch({
      type: 'report/updateReport',
      payload: { id, comment: value }
    });
  }

  // 提交汇报评分
  handleRateChange = (value, id) => {
    this.props.dispatch({
      type: 'report/updateReport',
      payload: { id, rate: value }
    });
  }

  // 设置汇报过滤条件进行筛选
  setReportsSearch = (payload) => {
    this.props.dispatch({
      type: 'report/fetchReports',
      payload: payload
    });
  }

  // 清空汇报过滤条件
  resetReportsSearch = () => {
    this.props.dispatch({ type: 'report/fetchReports' });
  }

  render() {
    const { loading, reportConditions } = this.props.report;
    const tabItems = [
      {
        text: '我的汇报',
        key: 'my',
        content: <MyReport loading={loading} reportList={this.props.report.myreport} />
      },
      {
        text: '填写汇报',
        key: 'fill',
        content:  <FillReport loading={loading} submitReport={this.submitReport} status={this.props.report.status} />
      }
    ];
    // 部长以上角色有审核权限
    if (OAglobal.user.role > 0) {
      const self = this;
      const handler = {
        handleRateChange: self.handleRateChange,
        handleSalaryChange: self.handleSalaryChange,
        handleCommentChange: self.handleCommentChange,
        setReportsSearch: self.setReportsSearch,
        resetReportsSearch: self.resetReportsSearch
      }
      tabItems.push({
        text: '审核汇报',
        key: 'review',
        content: <ReviewReport loading={loading} conditions={reportConditions} handler={handler} reportList={this.props.report.reports} />
      });
    }
    return (
      <Layout currentNav={this.props.report.currentNav}>
        <TabPage
          items={tabItems}
          defaultActiveKey={'my'}
          onChange={this.handleTabChange}
        />
      </Layout>
    );
  }
}

function mapStateToProps(report) {
  return {...report};
}

export default connect(mapStateToProps)(Report);