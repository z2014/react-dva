import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Nav from './Nav.js';
import commonStyles from './common.less';

// 通用布局组件
function Layout({location, dispatch, currentNav, children}) {
  const { navList, user } = OAglobal;
  return (
    <div className={commonStyles.wrap}>
      <Nav items={navList} avatar={user.avatar} currentNav={currentNav} />
      <div className={commonStyles.centerpanel}>
        {children}
      </div>
    </div>
  );
}

export default connect()(Layout);