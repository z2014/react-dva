import React, { Component, PropTypes } from 'react';
import { Select, Row, Col, Form, Input, Button } from 'antd';
import styles from './MemberPanel.less';
const Option = Select.Option;
const FormItem = Form.Item;

class MemberFilter extends Component {

  state = {
    conditions: this.props.conditions
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ conditions: nextProps.conditions });
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

  render() {
    const FormItemLayout = {
      labelCol: {span: 6},
      wrapperCol: { span: 18 }
    }
    const { conditions } = this.state;

    let period = [];
    for (let i = OAglobal.currentPeriod; i >= 0; i--) {
      period[i] = new Object;
      period[i].val = OAglobal.currentPeriod - i;
    }
    return (
      <div className={styles.oa_ant_advanced_search_form}>
        <Form inline onSubmit={this.handleSearch} >
          <Row gutter={20}>
            <Col span={6}>
              <FormItem label="届别" {...FormItemLayout}>
                <Select
                  style={{ minWidth: '150px' }}
                  onChange={val => this.handleChange('period', val)}
                  placeholder="届别"
                  value={conditions.period}
                >
                  {
                    period.map(item => {
                      return <Option key={'period' + item.val} value={item.val.toString()}>第{item.val}届</Option>
                    })
                  }
                </Select>
              </FormItem>
            </Col>

            <Col span={6}>
              <FormItem label="校区" {...FormItemLayout}>
                <Select
                  style={{ minWidth: '150px' }}
                  onChange={val => this.handleChange('campus', val)}
                  placeholder="校区"
                  value={conditions.campus}
                >
                  {
                    OAglobal.campus.map(item => {
                      return <Option key={'campus'+item.key} value={item.value}>{item.text}</Option>;
                    })
                  }
                </Select>
              </FormItem>
            </Col>

            <Col span={6}>
              <FormItem label="部门" {...FormItemLayout}>
                <Select
                  style={{ minWidth: '150px' }}
                  onChange={val => this.handleChange('depart', val)}
                  placeholder="部门"
                  value={conditions.depart}
                >
                  {
                    OAglobal.departs.map(item => {
                      return <Option key={item.key} value={item.value}>{item.text}</Option>;
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

const MemberFilterForm = Form.create()(MemberFilter);

export default MemberFilterForm;