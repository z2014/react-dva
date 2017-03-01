import React, { Component } from 'react';
import { Row, Col, Steps, Spin, message, Form, Select, Input, Button } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class RecruitHandler extends Component {

  state = {
    isDepartShow: false
  }

  handleStatusChange = (val) => {
    if ('5' == val) {
      this.setState({ isDepartShow: true });
    } else {
      this.setState({ isDepartShow: false });
    }
  }

  // 提交表单
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      this.props.updateStatus(values);
    });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    const { getFieldDecorator } = this.props.form;
    const { isDepartShow } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="更新状态">
          {getFieldDecorator('status', {
          })(
          <Select onChange={this.handleStatusChange} style={{ marginBottom: '8pt', minWidth: '150px' }} placeholder="处理简历">
            <Option value="0">已回绝</Option>
            <Option value="1">一面中</Option>
            <Option value="2">一面已通过,进入二面</Option>
            <Option value="3">二面已通过，进入考核</Option>
            <Option value="4">考核通过,正式入职</Option>
            <Option value="5">转给其他部门</Option>
          </Select>
          )}
        </FormItem>

        {
          isDepartShow
          ? <FormItem {...formItemLayout} label="转部门">
              {getFieldDecorator('depart', {
                initialValue: '技术部'
              })(
              <Select>
                {
                  OAglobal.departs.map(item => {
                    return <Option key={item.key} value={item.text}>{item.text}</Option>
                  })
                }
              </Select>
              )}
            </FormItem>
          : null
        }

        <FormItem {...formItemLayout} label="操作备注">
          {getFieldDecorator('desc', {
          })(
          <Input
            type='textarea'
            rows={3}
            placeholder={'如：有编程经验，掌握前端基础,一面通过\n考核期间没有主动学习，无进步表现,考核不通过'}
          />
          )}
        </FormItem>

        <FormItem wrapperCol={{span: 4, offset: 4}} >
          <Button type="primary" htmlType="submit" size="default">更新</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RecruitHandler);