import React, { Component, PropTypes } from 'react';
import { Popconfirm, Input, Button } from 'antd';
import MemberFilter from './MemberFilter.js';
import MemberInfo from './MemberInfo.js';
import DataTable from '../Common/DataTable.js';
import SelectCell from '../Common/SelectCell.js';
import EditableCell from '../Common/EditableCell.js';
import styles from './MemberPanel.less';

class MemberPanel extends Component {
  constructor(props) {
    super(props);

    // state保存过滤条件
    this.state = {
      data: props.members,
      filters: {
        name: null,
        stuid: null,
        phone: null
      },
      pullScreen: {
        isShow: false,
        title: '',
        content: ''
      }
    }
  }

  static defaultProps = {
    title: '',
    data: null
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      data: nextProps.members
    });
  }

  // 处理表单，设置搜索条件
  handleSearch = (values) => {
    const payload = new Object;
    payload.period = !values.period ? '' : values.period.replace(/^\s*|\s*$/g, '');
    payload.depart = !values.depart ? '' : values.depart.replace(/^\s*|\s*$/g, '');
    payload.campus = !values.campus ? '' : values.campus.replace(/^\s*|\s*$/g, '');
    this.props.searchMembersData(payload);
  }

  // 编辑后缓存数据
  onEdit = (memberData, item) => {
    this.editing = [];
    if (item && !item.editable) {
      item.editable = true;
      this.setState({
        data: memberData
      });
    }
  }

  // 转至编辑态
  editIng = (type, item, value) => {
    this.editing[type] = value;
  }

  // 转至完成态
  editDone = (memberData, item, type) => {
    if (item && item.editable) {
      item.editable = false;
      item.editStatus = type;
      this.setState({
        data: memberData
      });
    }

    if (type == 'save') {
      const member = {
        stuid: item.stuid,
        campus: (this.editing.campus) ? this.editing.campus : item.campus,
        depart: (this.editing.depart) ? this.editing.depart : item.depart,
        status: (this.editing.status) ? this.editing.status : item.status,
        phone: (this.editing.phone) ? this.editing.phone : item.phone,
        qq: (this.editing.qq) ? this.editing.qq : item.qq
      }
      // 发起请求保存数据
      this.props.updateMemberInfo(member);
    }
    this.editing = [];
  }

  // 推屏展示用户信息
  showMemberInfo = (item) => {
    const content = <MemberInfo updateMemberInfo={this.props.updateMemberInfo} member={item} />
    this.props.showPullScreen({
      title: '成员信息：' + item.name,
      content: content
    });
  }

  // 关闭推屏
  closePullScreen = () => {
    this.props.closePullScreen();
  }

  onFilterChange = (prop, value) => {
    const { filters } = this.state;
    filters[prop] = value;
    this.setState({ filters });
  }

  render() {
    // 过滤条件
    const { filters, pullScreen } = this.state;
    const self = this;
    let memberData = this.state.data;

    // 综合条件筛选成员
    if (filters.name || filters.stuid || filters.phone || filters.qq || filters.depart || filters.campus) {
      memberData = memberData.filter((item, index) => {
        if (filters.name) {
          // 根据名字筛选
          return (item.name.indexOf(filters.name) >= 0);
        } else if (filters.stuid) {
          // 根据学号筛选
          return(item.stuid.toString().indexOf(filters.stuid) >= 0);
        }
        if (filters.depart || filters.campus) {
          // 根据部门／校区筛选
          if (!filters.depart) { filters.depart = 'onlinedev'; }
          if (!filters.campus) { filters.campus = 'onlinedev'; }
          return ( (item.depart.indexOf(filters.depart) >= 0) || (item.campus.indexOf(filters.campus) >= 0) );
        }
        // 根据手机号/QQ筛选
        return (item.phone.toString().indexOf(filters.phone) >= 0) || (item.qq.toString().indexOf(filters.qq) >= 0);
      });
    }

    const memberCols = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => {
          const showMember = () => {
            self.showMemberInfo(record);
          }
          return <a onClick={showMember}>{text}</a>
        },
        filterDropdown: (
          <div className={styles.oa_member_filter_search}>
            <Input
              placeholder="筛选名字"
              onChange={e => this.onFilterChange('name', e.target.value)}
              className={styles.oa_member_filter_search_input}
            />
          </div>
        ),
      },
      {
        title: '部门',
        dataIndex: 'depart',
        render: (text, record, index) => {
          return record.editable
                 ? <SelectCell
                     item={record}
                     onChange={this.editIng}
                     values={OAglobal.departs}
                     value={record.depart}
                     type={'depart'}
                   />
                 : text;
        }
      }, {
        title: '校区',
        dataIndex: 'campus',
        render: (text, record, index) => {
          return record.editable
                 ? <SelectCell
                     item={record}
                     onChange={this.editIng}
                     values={OAglobal.campus}
                     value={record.campus}
                     type={'campus'}
                   />
                 : text;
        }
      }, {
        title: '角色',
        dataIndex: 'role'
      }, {
        title: '学号',
        dataIndex: 'stuid',
        filterDropdown: (
          <div className={styles.oa_member_filter_search}>
            <Input
              placeholder="学号"
              onChange={e => this.onFilterChange('stuid', e.target.value)}
              className={styles.oa_member_filter_search_input}
            />
          </div>
        ),
      }, {
        title: '电话',
        dataIndex: 'phone',
        render: (text, record, index) => {
          return <EditableCell
                   editable={record.editable}
                   value={text}
                   onChange={value => this.editIng('phone', record, value)}
                   status={record.editStatus}
                 />
        },
        filterDropdown: (
          <div className={styles.oa_member_filter_search}>
            <Input
              placeholder="手机号"
              onChange={e => this.onFilterChange('phone', e.target.value)}
              className={styles.oa_member_filter_search_input}
            />
          </div>
        ),
      }, {
        title: 'QQ',
        dataIndex: 'qq',
        render: (text, record, index) => {
          return <EditableCell
                   editable={record.editable}
                   value={text}
                   onChange={value => this.editIng('qq', record, value)}
                   status={record.editStatus}
                 />
        },
        filterDropdown: (
          <div className={styles.oa_member_filter_search}>
            <Input
              placeholder="QQ号"
              onChange={e => this.onFilterChange('qq', e.target.value)}
              className={styles.oa_member_filter_search_input}
            />
          </div>
        ),
      }, {
        title: '状态',
        dataIndex: 'status',
        filters: OAglobal.memberStatus,
        onFilter: (value, record) => record.status.includes(value),
        render: (text, record, index) => {
          return record.editable
                 ? <SelectCell
                     item={record}
                     onChange={this.editIng}
                     values={OAglobal.memberStatus}
                     value={record.status.toString()}
                     type={'status'}
                   />
                 : text;
        },
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          const { editable } = record;
          return (<div className="editable-row-operations">
            {
              editable ?
              <span>
                <a onClick={() => self.editDone(memberData, record, 'save')}>保存</a>&nbsp;
                <Popconfirm title="Sure to cancel?" onCancel={() => {}} onConfirm={() => self.editDone(memberData, record, 'cancel')}>
                  <a>取消</a>
                </Popconfirm>
              </span>
              :
              <span>
                <a onClick={() => self.onEdit(memberData, record)}>编辑</a>
              </span>
            }
          </div>);
        },
      }
    ];
    return (
      <div>
        <MemberFilter
          handleReset={this.handleReset}
          handleSearch={this.handleSearch}
          conditions={this.props.conditions}
        />
        <DataTable
          loading={this.props.loading}
          className={styles.oa_member_table}
          size={'middle'}
          data={memberData}
          columns={memberCols}
        />
      </div>
    );
  }
}

MemberPanel.PropTypes = {
  data: PropTypes.array,
  title: PropTypes.string
}

export default MemberPanel;