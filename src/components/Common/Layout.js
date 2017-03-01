import React, { Component, PropTypes } from 'react';
import Nav from './Nav.js';
import commonStyles from './common.less';

// 通用布局组件
function Layout({currentNav, children}) {
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

export default Layout;