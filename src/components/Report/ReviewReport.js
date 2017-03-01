import React, { Component } from 'react';
import { Spin } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import ReportCard from './ReportCard.js';
import SearchForm from './SearchForm.js';
import style from './ReviewReport.less';

export default class ReviewReport extends Component {

  render() {
    const { reportList, handler, loading,conditions } = this.props;
    const cardList = reportList.map((item, index) => {
      return (
        <ReportCard
          key={index}
          currentUser={OAglobal.user}
          type={'review'}
          item={item}
          {...handler}
        />
      );
    });
    return (
      <Scrollbars style={{ width: '100%', height: '98%' }}>
        <SearchForm {...handler} conditions={conditions} />
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