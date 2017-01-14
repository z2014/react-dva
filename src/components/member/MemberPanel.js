import React, { Component, PropTypes } from 'react';
import { Popconfirm, Select } from 'antd';
import DataTable from './DataTable.js';
import SearchForm from './SearchForm.js';
import EditableCell from './EditableCell.js';
import styles from './MemberPanel.less';
const Option = Select.Option;

class MemberPanel extends Component {
  constructor(props) {
    super(props);

    // state保存过滤条件
    this.state = {
      data: props.data,
      filterName: null,
      filterStuid: null,
      filterPhone: null,
      filterDepart: null,
      filterCampus: null
    }
  }

  static defaultProps = {
    title: '',
    data: null
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      data: nextProps.data
    });
  }

  // 处理表单，设置过滤条件
  handleSearch = (values) => {
    const username = !values.username ? '' : values.username.replace(/^\s*|\s*$/g, '');
    const depart = !values.depart ? '' : values.depart.replace(/^\s*|\s*$/g, '');
    const campus = !values.campus ? '' : values.campus.replace(/^\s*|\s*$/g, '');
    const stuid = !values.stuid ? '' : values.stuid.replace(/^\s*|\s*$/g, '');
    const phone = !values.phone ? '' : values.phone.replace(/^\s*|\s*$/g, '');
    this.setState({
      filterName: username,
      filterStuid: stuid,
      filterPhone: phone,
      filterDepart: depart,
      filterCampus: campus
    });
  }

  // 清空过滤条件
  handleReset = () => {
    this.setState({
      filterName: null,
      filterStuid: null,
      filterPhone: null,
      filterDepart: null,
      filterCampus: null
    });
  }

  //
  updateMember = (type, item, value) => {
    this.props.dispatch({
      type: 'member/updateMember',
      payload: {
        stuid: item.stuid,
        campus: (type == 'campus') ? value : item.campus,
        depart: (type == 'depart') ? value : item.depart,
        status: (type == 'status') ? value : item.status,
        phone: (type == 'phone') ? value : item.phone,
        qq: (type == 'qq') ? value : item.qq
      }
    });
  }

  // 单成员部门选择器
  renderSelectDepart = (memberData, index) => {
    const self = this;
    const handleChange = function(value) {
      self.updateMember('depart', memberData[index], value);
    }
    return(
      <Select value={memberData[index].depart} style={{ width: 100 }} onChange={handleChange} >
        {
          OAglobal.departs.map(item => {
            return <Option key={item.key} value={item.text}>{item.text}</Option>
          })
        }
      </Select>
    );
  }

  // 单成员状态选择器
  renderSelectStatus = (memberData, index) => {
    const self = this;
    const handleChange = function(value) {
      self.updateMember('status', memberData[index], value);
    }
    return(
      <Select value={memberData[index].status.toString()} style={{ width: 80 }} onChange={handleChange} >
        <Option value="1">正常</Option>
        <Option value="2">离职</Option>
        <Option value="3">黑名单</Option>
      </Select>
    );
  }

  // 单成员校区选择器
  renderSelectCampus = (memberData, index) => {
    const self = this;
    const handleChange = function(value) {
      self.updateMember('campus', memberData[index], value);
    }
    return(
      <Select value={memberData[index].campus} style={{ width: 100 }} onChange={handleChange} >
        <Option value="屯溪路校区">屯溪路校区</Option>
        <Option value="翡翠湖校区">翡翠湖校区</Option>
      </Select>
    );
  }

  edit = (memberData, index) => {
    if (memberData[index] && !memberData[index].editable) {
      memberData[index].editable = true;
      this.setState({
        data: memberData
      });
    }
  }

  editDone = (memberData, index, type) => {
    if (memberData[index] && memberData[index].editable) {
      memberData[index].editable = false;
      memberData[index].editStatus = type;
      this.setState({
        data: memberData
      });
    }
  }

  render() {
    // 过滤条件
    const { filterName, filterStuid, filterPhone } = this.state;
    let { filterDepart, filterCampus } = this.state;
    const self = this;
    let memberData = this.state.data;

    // 综合条件筛选成员
    if (filterName || filterStuid || filterPhone || filterDepart || filterCampus) {
      memberData = memberData.filter((item, index) => {
        if (filterName) {
          // 根据名字搜索
          return (item.name.indexOf(filterName) >= 0);
        } else if (filterStuid) {
          // 根据学号搜索
          return(item.stuid.toString().indexOf(filterStuid) >= 0);
        }
        if (filterDepart || filterCampus) {
          // 根据部门／校区搜索
          if (!filterDepart) { filterDepart = 'onlinedev'; }
          if (!filterCampus) { filterCampus = 'onlinedev'; }
          return ( (item.depart.indexOf(filterDepart) >= 0) || (item.campus.indexOf(filterCampus) >= 0) );
        }
        // 根据手机号搜索
        return(item.phone.toString().indexOf(filterPhone) >= 0);
      });
    }

    const memberCols = (this.props.role == 'member') ? [
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '部门',
        dataIndex: 'depart',
        render: (text, record, index) => {
          return memberData[index].editable ? this.renderSelectDepart(memberData, index) : text;
        }
      }, {
        title: '校区',
        dataIndex: 'campus',
        render: (text, record, index) => {
          return memberData[index].editable ? this.renderSelectCampus(memberData, index) : text;
        }
      }, {
        title: '分类',
        dataIndex: 'role'
      }, {
        title: '电话',
        dataIndex: 'phone',
        render: (text, record, index) => {
          return <EditableCell
                   editable={memberData[index].editable}
                   value={text}
                   onChange={value => this.updateMember('phone', memberData[index], value)}
                   status={memberData[index].editStatus}
                 />
        }
      }, {
        title: 'QQ',
        dataIndex: 'qq',
        render: (text, record, index) => {
          return <EditableCell
                   editable={memberData[index].editable}
                   value={text}
                   onChange={value => this.updateMember('qq', memberData[index], value)}
                   status={memberData[index].editStatus}
                 />
        }
      }, {
        title: '学号',
        dataIndex: 'stuid',
      }, {
        title: '状态',
        dataIndex: 'status',
        render: (text, record, index) => {
          return memberData[index].editable ? this.renderSelectStatus(memberData, index) : text;
        }
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          const { editable } = memberData[index];
          return (<div className="editable-row-operations">
            {
              editable ?
              <span>
                <a onClick={() => self.editDone(memberData, index, 'save')}>保存</a>&nbsp;
                <Popconfirm title="Sure to cancel?" onCancel={() => {}} onConfirm={() => self.editDone(memberData, index, 'cancel')}>
                  <a>取消</a>
                </Popconfirm>
              </span>
              :
              <span>
                <a onClick={() => self.edit(memberData, index)}>编辑</a>
              </span>
            }
          </div>);
        },
      }
    ] : [
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '学号',
        dataIndex: 'stuid'
      },
      {
        title: '部门',
        dataIndex: 'depart'
      },{
        title: '校区',
        dataIndex: 'campus'
      },
      {
        title: '性别',
        dataIndex: 'sex'
      },{
        title: '手机号',
        dataIndex: 'phone'
      },{
        title: 'QQ号',
        dataIndex: 'qq'
      }
    ];
    return (
      <div>
        <SearchForm handleReset={this.handleReset} handleSearch={this.handleSearch} />
        <DataTable className={styles.oa_member_table} size={'middle'} data={memberData} columns={memberCols} />
      </div>
    );
  }
}

MemberPanel.PropTypes = {
  data: PropTypes.array
}

export default MemberPanel;