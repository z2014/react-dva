import React, { Component } from 'react';
import { Form, Row, Col, Input, DatePicker, Button, Spin } from 'antd';
import moment from 'moment';
import style from './FillReport.less';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class FillReport extends Component {

  // 提交工作汇报
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 将换行符替换为br标签以便后端存储
        values.content = values.content.replace(/\n|\r\n/g,'<br>');
        this.props.submitReport(values);
      } else {
        console.log('err', err);
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 4,
      },
    };
    const { loading, status } = this.props;
    // 判断是否开启汇报
    if (loading) { // 正在加载数据
      return(
        <div className={style.fill_notice_loading}>
          <Spin tip={'正在加载。。。'} />
        </div>
      );
    } else if (status.stat == 'close') { // 汇报尚未开始
      return(
        <div className={style.fill_notice_close}>
          <h3 className={style.fill_notice_h3}>本轮汇报尚未开始</h3>
          <p className={style.fill_notice_word}>１、汇报时间一般为每个月15号左右，届时会有通知</p>
          <p className={style.fill_notice_word}>２、如通知汇报开启，请及时提交工作汇报</p>
        </div>
      );
    } else if (status.stat == 'done') { // 本期汇报已经提交
      return(
        <div className={style.fill_notice_close}>
          <h3 className={style.fill_notice_h3}>本轮汇报你已经填写过了哦</h3>
        </div>
      );
    } else {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className={style.fill_wrap}>
          <Row gutter={0}>
            <Col span={14}>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="汇报时间"
                  hasFeedback
                >
                  <RangePicker
                    value={[moment(status.start_date, 'YYYY/MM/DD'), moment(status.end_date, 'YYYY/MM/DD')]}
                    format={'YYYY/MM/DD'}
                    disabled
                  />
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="工作陈述"
                  hasFeedback
                >
                  {getFieldDecorator('content', {
                    rules: [{
                      required: true, message: '这个月一点事都没干可不行哦'
                    }],
                  })(
                    <Input
                      type="textarea" rows={6}
                      placeholder={'本月工作内容，请简明分点陈述，格式如下\n１、参与XXX项目，完成了首页和Logo设计\n２、参与XXX项目，完成前端技术实现'}
                    />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="意见建议"
                  hasFeedback
                >
                  {getFieldDecorator('suggestion', {
                  })(
                    <Input
                      type="textarea" rows={4}
                      placeholder={'工作中发现的问题\n对工作室／部门的意见建议'}
                    />
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" size="large">提交</Button>
                </FormItem>
              </Form>
            </Col>
            <Col span={8}>
              <h3 className={style.fill_notice_h3}>汇报说明：</h3>
              <p className={style.fill_notice_word}>１、工作汇报不必提及值班、值日、开会等常规工作</p>
              <p className={style.fill_notice_word}>２、工作汇报中不要填写与工作室无关的工作，如组织班级活动等</p>
              <p className={style.fill_notice_word}>３、汇报时间一般为每个月15号左右，请及时提交工作汇报</p>
              <p className={style.fill_notice_word}>４、另外有任何想说的话请填写在`意见建议`中</p>
              <p className={style.fill_notice_word}>５、提交后暂不支持修改，请慎重提交</p>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

const FillReportForm = Form.create()(FillReport);

export default FillReportForm;