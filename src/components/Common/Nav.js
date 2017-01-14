import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import commonStyles from './common.less';

// 带头像的导航栏
export default class Nav extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    currentNav: '0'
  }

  render() {
    const { avatar, items, currentNav } = this.props;
    const menu_list = items.map((item, index) => {
      return (
        <Menu.Item key={index}>
          <Link to={'/' + item.link}>{item.text}</Link>
        </Menu.Item>
      );
    });

    return (
      <div className={commonStyles.leftpanel}>
        <div className={commonStyles.nav_avatar}>
          <img style={{ height: "100%", borderRadius: "50%" }} src={avatar} />
        </div>
        <Menu
          theme={'dark'}
          style={{ width: "100%" }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[currentNav]}
          mode="inline"
        >
          {menu_list}
        </Menu>
      </div>
    );
  }
}

Nav.PropTypes = {
  items: PropTypes.array,
  avatar: PropTypes.string,
  currentNav: PropTypes.string
}