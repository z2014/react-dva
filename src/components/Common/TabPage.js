import React, { Component, PropTypes } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class TabPage extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    items: [],
    onChange: function() {},
    defaultActiveKey: '0'
  }

  renderItem(item) {
    return (
      <TabPane tab={item.text} key={item.key}>
        {item.content}
      </TabPane>
    );
  }

  render() {
    const { items, onChange, defaultActiveKey } = this.props;
    const list = items.map((item, index) => {
      item.key = item.key ? item.key : index;
      return this.renderItem(item);
    });
    return(
      <Tabs defaultActiveKey={defaultActiveKey ? defaultActiveKey : '0'} onChange={onChange}>
        {list}
      </Tabs>
    );
  }
}

TabPage.PropTypes = {
  items: PropTypes.array,
  onChange: PropTypes.func,
  defaultActiveKey: PropTypes.string
}