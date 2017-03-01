import React, { Component, PropTypes } from 'react';
import { Select, Row, Col, Form, Input, Button ,DatePicker } from 'antd';
import styles from './MeetingFilter.less';
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class MeetingFilter extends Component {

  state = {
    conditions: {
      depart:OAglobal.user.depart
    }
  }

  handleChange = (prop, value) => {
    const { conditions } = this.state;
    conditions[prop] = value;
    this.setState({ conditions });
  }

  // 提交表单
  handleSearch = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state.conditions);
  }

  handleTime = (dates,dateString,e) => {
    this.state.conditions['time1'] = dateString[0];
    this.state.conditions['time2'] = dateString[1];
  }

  render() {
    const FormItemLayout = {
      labelCol: {span: 6},
      wrapperCol: { span: 18 }
    };
    return (
      <div className={styles.oa_ant_advanced_search_form}>
        <Form inline onSubmit={this.handleSearch} >
          <Row gutter={20}>
 
            <Col span={6}>
              <FormItem label="会议分类" {...FormItemLayout}>
                <Select
                  style={{ minWidth: '150px' }}
                  onChange={val => this.handleChange('role', val)}
                  placeholder="会议分类"
                >
                  {
                    OAglobal.meetingRoles.map(item => {
                      return <Option key={item.key} value={item.value}>{item.text}</Option>
                    })
                  }
                </Select>
              </FormItem>
            </Col>

            <Col span={6}>
              <FormItem label="时间" {...FormItemLayout}>
                <RangePicker size="default" onChange={(dates,dateString) => this.handleTime(dates,dateString)}/>
              </FormItem>
            </Col>

            <Col span={6}>
              <FormItem label="部门" {...FormItemLayout}>
                <Select
                  style={{ minWidth: '150px' }}
                  onChange={val => this.handleChange('depart', val)}
                  placeholder="部门"
                >
                  {
                    OAglobal.departs.map(item => {
                      return <Option key={item.key} value={item.key}>{item.text}</Option>;
                    })
                  }
                </Select>
              </FormItem>
            </Col>

            <Col span={6}>
              <FormItem>
                <Button type="primary" htmlType="submit" size="default">搜索</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const MeetingFilterForm = Form.create()(MeetingFilter);

export default MeetingFilterForm;