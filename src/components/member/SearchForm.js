import React, { Component, PropTypes } from 'react';
import { Select, Row, Col, Form, Input, Button } from 'antd';
import styles from './MemberPanel.less';
const Option = Select.Option;
const FormItem = Form.Item;

class SearchForm extends Component {

  // 提交表单
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      this.props.handleSearch(values);
    });
  }

  // 重置表单
  handleReset = () => {
    this.props.form.resetFields();
    this.props.handleReset();
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={styles.oa_ant_advanced_search_form}>
        <Form inline onSubmit={this.handleSearch} >
          <Row gutter={40}>
            <Col span={4}>
              <FormItem label="姓名">
                {getFieldDecorator('username', {
                })(
                  <Input placeholder="姓名" />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="学号">
                {getFieldDecorator('stuid', {
                })(
                  <Input placeholder="学号" />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="手机">
                {getFieldDecorator('phone', {
                })(
                  <Input placeholder="手机" />
                )}
              </FormItem>
            </Col>

            <Col span={4}>
              <FormItem label="部门">
                {getFieldDecorator('depart', {
                })(
                <Select style={{ width: 150 }} placeholder="部门">
                  {
                    OAglobal.departs.map(item => {
                      return <Option key={item.key} value={item.value}>{item.text}</Option>;
                    })
                  }
                </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="校区">
                {getFieldDecorator('campus', {
                })(
                <Select style={{ width: 150 }} placeholder="校区">
                  <Option key={'campus-1'} value={'屯溪路校区'}>屯溪路校区</Option>
                  <Option key={'campus-2'} value={'翡翠湖校区'}>翡翠湖校区</Option>
                </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="搜索">
                <Button type="primary" htmlType="submit" size="default">搜索</Button>
              </FormItem>
              <FormItem label="重置">
                <Button type="primary" htmlType="reset" size="default" onClick={this.handleReset}>重置</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const MemberSearchForm = Form.create()(SearchForm);

export default MemberSearchForm;