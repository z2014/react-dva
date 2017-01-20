import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'current': props.currentNav ? props.currentNav : props.items[0].key
    };
  }

  static defaultProps = {
    checkout: function(){}
  }

  handleClick = (e) => {
    this.setState({
        current: e.key,
    });
    this.props.checkout(e.key);
  }

  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <Menu.Item key={item.key}>
          {item.text}
        </Menu.Item>
      );
    })
    return (
      <Menu onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal">
          {items}
      </Menu>
    );
  }
};

TopNav.PropTypes = {
  checkout: PropTypes.func
}