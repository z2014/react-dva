import React, { Component } from 'react';
import { Spin } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ReportCard from './ReportCard.js';
import style from './MyReport.less';

export default class MyReport extends Component {
  render() {
    const { reportList, loading } = this.props;
    const cardList = reportList.map((item, index) => {
      return (
        <ReportCard key={index} item={item} />
      );
    });
    return (
      <Scrollbars style={{ width: '100%', height: '98%' }}>
        {
          loading
          ? <div className={style.report_list_wrap_loading}>
              <Spin tip={'加载中。。。'} />
            </div>
          : <div className={style.report_list_wrap}>
              {cardList}
            </div>
        }
      </Scrollbars>
    );
  }
}