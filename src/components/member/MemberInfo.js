import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Button, message } from 'antd';
import AvatarUpload from './AvatarUpload.js';
import style from './MemberInfo.less';
import md5 from 'md5';
const FormItem = Form.Item;
const Option = Select.Option;

class MemberInfoForm extends Component {
  state = {
    member: this.props.member
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ member: nextProps.member });
  }

  handleAvatarUpload = (resp) => {
    if (resp && resp.success == 'true') {
      message.success('头像更新成功', 3);
    } else {
      message.error('头像更新失败，有点尴尬', 3);
    }
  }

  handleChange = (type, value) => {
    const { member } = this.state;
    // 解决对象引用的问题，改变属性值会引起上层数据改变
    const newMember = {
      key: member.key,
      name: member.name,
      campus: member.campus,
      class: member.class,
      college: member.college,
      stuid: member.stuid,
      sex: member.sex,
      avatar: (type == 'avatar') ? value : member.avatar,
      debitcard: (type == 'debitcard') ? value: member.debitcard,
      depart: (type == 'depart') ? value: member.depart,
      email: (type == 'email') ? value: member.email,
      phone: (type == 'phone') ? value: member.phone,
      qq: (type == 'qq') ? value: member.qq,
      role: (type == 'role') ? value: member.role,
      status: (type == 'status') ? value: member.status,
    }
    this.setState({ member: newMember });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { member } = this.state;
        // 提交前校验
        if (!member.phone) {
          return message.error('我觉得电话号码是肯定要填的');
        }
        if (!member.qq) {
          return message.error('QQ号别忘了');
        }
        if (!member.email) {
          return message.error('邮箱地址填一下吧，说不定哪天会发邮件呢');
        }
        if (!member.debitcard) {
          return message.error('银行卡号都不填，怎么发工资？');
        }
        // 密码一次加密
        values.password = values.password ? md5(values.password) : '';
        Object.assign(values, member);
        this.props.updateMemberInfo(values);
      } else {
        console.log('err', err);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { member } = this.state;
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
                    <Input disabled={true} value={member.stuid} />
                  </Col>
                  <Col span={12}>
                    <Input disabled={true} value={member.sex} />
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
                    <Input value={member.college} disabled={true} />
                  </Col>
                  <Col span={12}>
                    <Input value={member.class} disabled={true} />
                  </Col>
                </Row>
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="状态"
                hasFeedback
              >
                <Select onChange={value => this.handleChange('status', value)} value={member.status}>
                  {
                    OAglobal.memberStatus.map(item => {
                      return <Option key={item.key} value={item.text}>{item.text}</Option>
                    })
                  }
                </Select>
              </FormItem>
            </Col>

            <Col span={6}>
              <AvatarUpload
                member={member}
                formUrl={'/api/avatar'}
                onUpload={this.handleAvatarUpload}
                disabled={true}
              />
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
                    <Select onChange={value => this.handleChange('depart', value)} value={member.depart}>
                      {
                        OAglobal.departs.map(item => {
                          return <Option key={item.key} value={item.text}>{item.text}</Option>
                        })
                      }
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Select onChange={value => this.handleChange('role', value)} value={member.role}>
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
              <div className={style.memberinfo_name}>{member.name}</div>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="校区"
              >
                <Select onChange={value => this.handleChange('campus', value)} value={member.campus}>
                {
                  OAglobal.campus.map(item => {
                    return <Option key={item.key} value={item.text}>{item.text}</Option>
                  })
                }
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="电话"
              >
                <Input
                  type={'number'}
                  addonBefore={'+86'}
                  onChange={e => { this.handleChange('phone', e.target.value); e.preventDefault(); } }
                  value={member.phone}
                />
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="ＱＱ"
              >
                <Input type={'number'} onChange={e => this.handleChange('qq', e.target.value)} value={member.qq} />
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
                <Input onChange={e => this.handleChange('email', e.target.value)} value={member.email} />
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem
                {...formItemLayout}
                label="银行卡号"
              >
                <Input type={'text'} onChange={e => this.handleChange('debitcard', e.target.value)} value={member.debitcard} />
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
            <Button type="primary" htmlType="submit" size="large">更新并保存</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const MemberInfo = Form.create()(MemberInfoForm);

export default MemberInfo;