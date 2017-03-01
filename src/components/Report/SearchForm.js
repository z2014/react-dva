import React, { Component, PropTypes } from 'react';
import { Select, Row, Col, Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;

class SearchForm extends Component {

  state = {
    conditions: this.props.conditions
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ conditions: nextProps.conditions });
  }

  // 提交表单,设置筛选条件
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      const { conditions } = this.state;
      values.contact = values.contact || '';
      // values.date = values.date ? [values.date[0].format('YYYY-MM-DD'), values.date[1].format('YYYY-MM-DD')] : null;
      Object.assign(values, conditions);
      this.props.setReportsSearch(values);
    });
  }

  handleDateChange = (dates) => {
    const { conditions } = this.state;
    conditions.start_date = dates[0] ? dates[0].format('YYYY-MM-DD') : '';
    conditions.end_date = dates[1] ? dates[1].format('YYYY-MM-DD') : '';
    this.setState({ conditions });
  }

  handleConditionsChange = (prop, value) => {
    const { conditions } = this.state;
    conditions[prop] = value;
    this.setState({ conditions });
  }

  // // 重置表单,清空筛选条件
  // handleReset = () => {
  //   this.props.form.resetFields();
  //   this.props.resetReportsSearch();
  // }

  render() {
    const {getFieldDecorator} = this.props.form;
    const { conditions } = this.state;
    const FormItemLayout = {
      wrapperCol: { span: 24 }
    }
    return (
      <div style={{padding: '5px 15px'}}>
        <Form inline onSubmit={this.handleSearch} >
          <Row gutter={20}>
            <Col span={5}>
              <FormItem {...FormItemLayout} label="日期">
                <RangePicker
                  format={'YYYY/MM/DD'}
                  onChange={this.handleDateChange}
                  value={[moment(conditions.start_date, 'YYYY/MM/DD'), moment(conditions.end_date, 'YYYY/MM/DD')]}
                />
              </FormItem>
            </Col>

            <Col span={5}>
              <FormItem {...FormItemLayout} label="校区">
                <Select
                  style={{ minWidth: '150px' }}
                  value={conditions.campus}
                  onChange={val => this.handleConditionsChange('campus', val)}
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
                  style={{ minWidth: '150px' }}
                  value={conditions.depart}
                  onChange={val => this.handleConditionsChange('depart', val)}
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
              <FormItem {...FormItemLayout} label="姓名/学号">
                {getFieldDecorator('contact', {
                })(
                  <Input placeholder="姓名/学号" />
                )}
              </FormItem>
            </Col>

            <Col span={4}>
              <FormItem {...FormItemLayout} label="搜索">
                <Button type="primary" htmlType="submit" size="default">搜索</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const ReportSearchForm = Form.create()(SearchForm);

export default ReportSearchForm;