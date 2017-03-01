import React, { Component, PropTypes } from 'react';
import { Select, Row, Col, Form, Input, Button, DatePicker, Popover } from 'antd';
import moment from 'moment';
import styles from './MemberPanel.less';
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class RecruitFilter extends Component {
  state = {
    conditions: this.props.conditions
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      conditions: nextProps.conditions
    });
  }

  // 提交表单
  handleSearch = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state.conditions);
  }

  handleDateChange = (dates) => {
    const { conditions } = this.state;
    conditions.start_date = dates[0] ? dates[0].format('YYYY-MM-DD') : '';
    conditions.end_date = dates[1] ? dates[1].format('YYYY-MM-DD') : '';
    this.setState({ conditions });
  }

  handleChange = (prop, value) => {
    const { conditions } = this.state;
    conditions[prop] = value;
    this.setState({ conditions });
  }

  render() {
    const { conditions } = this.state;
    const FormItemLayout = {
      labelCol: {span: 6},
      wrapperCol: { span: 18 }
    }
    return (
      <div className={styles.oa_ant_advanced_search_form}>
        <Form inline onSubmit={this.handleSearch} >
          <Row gutter={40} style={{ marginTop: '8px' }}>
            <Col span={9}>
              <FormItem {...FormItemLayout} label="日期范围">
                {
                  (conditions && conditions.start_date && conditions.end_date)
                  ? <RangePicker
                      onChange={this.handleDateChange}
                      value={[moment(conditions.start_date, 'YYYY/MM/DD'), moment(conditions.end_date, 'YYYY/MM/DD')]}
                      format={'YYYY/MM/DD'}
                    />
                  : <RangePicker
                      onChange={this.handleDateChange}
                      format={'YYYY/MM/DD'}
                    />
                }
              </FormItem>
            </Col>

            <Col span={5}>
              <FormItem {...FormItemLayout} label="校区">
                <Select
                  style={{ minWidth: 150 }}
                  onChange={val => this.handleChange('campus', val)}
                  value={conditions ? conditions.campus : ''}
                  placeholder="校区"
                >
                  {
                    OAglobal.campus.map(item => {
                      return <Option key={'campus'+item.key} value={item.value}>{item.text}</Option>;
                    })
                  }
                </Select>
              </FormItem>
            </Col>

            <Col span={5}>
              <FormItem {...FormItemLayout} label="部门">
                <Select
                  style={{ width: 150 }}
                  onChange={val => this.handleChange('depart', val)}
                  value={conditions ? conditions.depart : ''}
                  placeholder="部门"
                >
                  {
                    OAglobal.departs.map(item => {
                      return <Option key={item.key} value={item.value}>{item.text}</Option>;
                    })
                  }
                </Select>
              </FormItem>
            </Col>

            <Col span={5}>
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

const RecruitFilterForm = Form.create()(RecruitFilter);

export default RecruitFilterForm;