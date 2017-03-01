import React, { Component, PropTypes } from 'react';
import { Input } from 'antd';
import RecruitFilter from './RecruitFilter.js';
import RecruitInfo from './RecruitInfo.js';
import DataTable from '../Common/DataTable.js';
import styles from './MemberPanel.less';

class RecruitPanel extends Component {

  state = {
    filters: new Object
  }

  // 处理表单，设置过滤条件
  handleSearch = (values) => {
    const conditions = {
      depart: !values.depart ? '' : values.depart.replace(/^\s*|\s*$/g, ''),
      campus: !values.campus ? '' : values.campus.replace(/^\s*|\s*$/g, ''),
      start_date: !values.start_date ? '' : values.start_date.replace(/^\s*|\s*$/g, ''),
      end_date: !values.end_date ? '' : values.end_date.replace(/^\s*|\s*$/g, ''),
    }

    // 根据条件查询招新数据
    this.props.queryRecruitData(conditions);
  }

  // // 重置搜索条件
  // handleReset = () => {
  //   this.props.resetRecruitData();
  // }

  // 推屏展示应聘信息
  showRecruitInfo = (item) => {
    const content = <RecruitInfo />
    this.props.showRecruitInfo(item, content);
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
    const self = this;
    const { recruit } = this.props;
    const { filters } = this.state;
    let recruitData = recruit ? recruit.data : null;
    const conditions = recruit ? recruit.conditions : null;

    // 综合条件筛选成员
    if (filters.name || filters.stuid || filters.phone || filters.qq) {
      recruitData = recruitData.filter((item, index) => {
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

    const cols = [
      {
        title: '姓名',
        dataIndex: 'name',
        render: (text, record, index) => {
          const showRecruit = () => {
            self.showRecruitInfo(record);
          }
          return <a onClick={showRecruit}>{text}</a>
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
        title: '申请部门',
        dataIndex: 'depart'
      },
      {
        title: '学号',
        dataIndex: 'stuid',
        filterDropdown: (
          <div className={styles.oa_member_filter_search}>
            <Input
              placeholder="筛选学号"
              onChange={e => this.onFilterChange('stuid', e.target.value)}
              className={styles.oa_member_filter_search_input}
            />
          </div>
        ),
      },{
        title: '手机号',
        dataIndex: 'phone',
        filterDropdown: (
          <div className={styles.oa_member_filter_search}>
            <Input
              placeholder="筛选手机号"
              onChange={e => this.onFilterChange('phone', e.target.value)}
              className={styles.oa_member_filter_search_input}
            />
          </div>
        ),
      },{
        title: 'QQ号',
        dataIndex: 'qq',
        filterDropdown: (
          <div className={styles.oa_member_filter_search}>
            <Input
              placeholder="筛选QQ号"
              onChange={e => this.onFilterChange('qq', e.target.value)}
              className={styles.oa_member_filter_search_input}
            />
          </div>
        ),
      },
      {
        title: '校区',
        dataIndex: 'campus'
      },
      {
        title: '学院',
        dataIndex: 'college'
      },
      {
        title: '专业',
        dataIndex: 'class'
      },
      {
        title: '性别',
        dataIndex: 'sex'
      }
    ];
    return (
      <div>
        <RecruitFilter
          conditions={conditions}
          handleSearch={this.handleSearch}
        />
        <DataTable
          loading={this.props.loading}
          className={styles.oa_member_table}
          size={'middle'}
          data={recruitData}
          columns={cols}
        />
      </div>
    );
  }
}

RecruitPanel.PropTypes = {
  data: PropTypes.array
}

export default RecruitPanel;