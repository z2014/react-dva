import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Steps, Spin, message } from 'antd';
import RecruitHandler from './RecruitHandler.js';
import style from './MemberInfo.less';

const Step = Steps.Step;

class RecruitInfo extends Component {

  componentWillReceiveProps(nextProps) {
    const msg = nextProps.recruit.message;
    const oldMsg = this.props.recruit.message;
    // 利用Symbol类型的key解决消息重复的问题
    if (msg.key !== oldMsg.key) {
      if (msg.type == 'success') {
        message.success(msg.msg, 4);
      } else if (msg.type == 'error') {
        message.error(msg.msg, 4);
      }
    }
  }

  updateStatus = (values) => {
    this.props.dispatch({
      type: 'recruit/updateRecruitStatus',
      payload: {
        id: this.props.recruit.data.key,
        ...values
      }
    });
  }

  renderItem(label, value) {
    return (
      <Row>
        <Col span={6} style={{ fontSize: '16px', fontWeight: 'bold' }}>
        {label}：
        </Col>
        <Col span={18} style={{ fontSize: '16px' }}>
        {value}
        </Col>
      </Row>
    );
  }

  render() {
    const rowStyle = {marginTop: '8pt', paddingTop: '8pt'};
    if (this.props.recruit.loading) {
      return (
        <div className={style.memberinfo_container}>
          <Row gutter={10} style={rowStyle}>
            <Col span={4} offset={10}>
              <Spin tip={'加载中。。。'} size='large' />
            </Col>
          </Row>
        </div>
      )
    } else {
      const item = this.props.recruit.data;
      return(
        <div className={style.memberinfo_container}>
          <Row gutter={10} style={{ marginTop: '8pt', marginBottom: '8pt', padding: '8pt 0px' }}>
            <Col span={22} offset={1}>
              <Steps current={item.status.current} status={item.status.status}>
                {
                  item.status.steps.map((item, index) => {
                    return <Step key={index} title={item.title} description={item.desc} />
                  })
                }
              </Steps>
            </Col>
          </Row>

          <Row gutter={10} style={rowStyle}>
            <Col span={18} offset={3}>
              {this.renderItem('处理申请', <RecruitHandler item={item} updateStatus={this.updateStatus} />)}
            </Col>
          </Row>

          <Row gutter={10} style={rowStyle}>
            <Col span={18} offset={3}>
              {this.renderItem('自我介绍', item.desc)}
            </Col>
          </Row>

          {
            // <Row gutter={10} style={rowStyle}>
            //   <Col span={10} offset={3}>
            //     {this.renderItem('姓名', item.name)}
            //   </Col>

            //   <Col span={10}>
            //     {this.renderItem('学号', item.stuid)}
            //   </Col>
            // </Row>
            // <Row gutter={10} style={rowStyle}>
            //   <Col span={10} offset={3}>
            //     {this.renderItem('电话', item.phone)}
            //   </Col>

            //   <Col span={10}>
            //     {this.renderItem('QQ', item.qq)}
            //   </Col>
            // </Row>

            // <Row gutter={10} style={rowStyle}>
            //   <Col span={10} offset={3}>
            //     {this.renderItem('部门', item.depart)}
            //   </Col>

            //   <Col span={10}>
            //     {this.renderItem('性别', item.sex)}
            //   </Col>
            // </Row>

            // <Row gutter={10} style={rowStyle}>
            //   <Col span={18} offset={3}>
            //     {this.renderItem('所在学院', item.college)}
            //   </Col>
            // </Row>

            // <Row gutter={10} style={rowStyle}>
            //   <Col span={18} offset={3}>
            //     {this.renderItem('专业班级', item.class)}
            //   </Col>
            // </Row>
          }

        </div>
      );
    }

  }
}

function mapStateToProps(recruit) {
  return {...recruit};
}

export default connect(mapStateToProps)(RecruitInfo);