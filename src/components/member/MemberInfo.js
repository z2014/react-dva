import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Button } from 'antd';
import AvatarUpload from './AvatarUpload.js';
import style from './MemberInfo.less';
const FormItem = Form.Item;
const Option = Select.Option;

class MemberInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depart: props.member.depart,
      role: props.member.role,
      status: props.member.status
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      depart: nextProps.member.depart,
      role: nextProps.member.role,
      status: nextProps.member.status
    });
  }

  changeDepart = (value) => {
    this.setState({
      depart: value
    });
  }

  changeRole = (value) => {
    this.setState({
      role: value
    });
  }

  changeStatus = (value) => {
    this.setState({
      status: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.assign(values, this.state, {stuid: this.props.member.stuid});
        this.props.dispatch({
          type: 'member/updateMember',
          payload: values
        });
      } else {
        console.log('err', error);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 8,
      },
    };
    return(
      <div className={style.memberinfo_container}>
        <Form horizontal onSubmit={this.handleSubmit}>
          <Row gutter={0}>
            <Col span={18}>

              <FormItem
                {...formItemLayout}
                label="学号/性别"
                hasFeedback
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Input disabled={true} value={this.props.member.stuid} />
                  </Col>
                  <Col span={12}>
                    <Input disabled={true} value={'男'} />
                  </Col>
                </Row>

              </FormItem>

              <FormItem
                {...formItemLayout}
                label="学院/班级"
                hasFeedback
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Input value={'仪器科学与光电工程学院'} disabled={true} />
                  </Col>
                  <Col span={12}>
                    <Input value={'光电信息科学与工程13-1班'} disabled={true} />
                  </Col>
                </Row>
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="状态"
                hasFeedback
              >
                <Select onChange={this.changeStatus} value={this.state.status}>
                  {
                    OAglobal.memberStatus.map(item => {
                      return <Option key={item.key} value={item.text}>{item.text}</Option>
                    })
                  }
                </Select>
              </FormItem>
            </Col>

            <Col span={6}>
              <AvatarUpload imgUrl={'http://online.hfut.edu.cn/online_logo.png'} formUrl={'/'} />
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="部门"
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Select onChange={this.changeDepart} value={this.state.depart}>
                      {
                        OAglobal.departs.map(item => {
                          return <Option key={item.key} value={item.text}>{item.text}</Option>
                        })
                      }
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Select onChange={this.changeRole} value={this.state.role}>
                      {
                        OAglobal.memberRole.map(item => {
                          return <Option key={item.key} value={item.text}>{item.text}</Option>
                        })
                      }
                    </Select>
                  </Col>
                </Row>
              </FormItem>
            </Col>
            <Col span={6}>
              <div className={style.memberinfo_name}>{this.props.member.name}</div>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="电话"
              >
                {getFieldDecorator('phone', {
                  rules: [{
                    required: true, message: '连电话号码都舍不得告诉我吗？'
                  }],
                })(
                  <Input type={'number'} addonBefore={'+86'} placeholder={this.props.member.phone} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="ＱＱ"
              >
                {getFieldDecorator('qq', {
                  rules: [{ required: true, message: '难道你的ＱＱ号不是数字？' }],
                })(
                  <Input type={'number'} placeholder={this.props.member.qq} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="邮箱"
                hasFeedback
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: '注意邮箱格式，填写你常用的邮箱地址哦',
                  }, {
                    required: true, message: '建议，哦不，是你必须填一下邮箱地址',
                  }],
                })(
                  <Input placeholder={this.props.member.email} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="银行卡号"
              >
                {getFieldDecorator('creditcode', {
                  rules: [{
                    required: true, message: '没有卡号怎么发工资？'
                  }],
                })(
                  <Input type={'number'} placeholder={this.props.member.creditcode} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label={(<span>
                  密码&nbsp;
                <Tooltip title="如果你填了我就修改密码；如果你留空白就不修改啊">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>)}
                hasFeedback
              >
                {getFieldDecorator('password', {
                })(
                  <Input type="password" placeholder="若无需修改请留空" />
                )}
              </FormItem>
            </Col>
          </Row>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">更新信息</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const MemberInfo = Form.create()(MemberInfoForm);

export default MemberInfo;