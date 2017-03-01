import React, { Component } from 'react';
import { Card, Collapse } from 'antd';
const Panel = Collapse.Panel;

export default class DashBoard extends Component {

  renderTitle(item) {
    return(
      <div>
        <span style={{ marginRight: '24px' }}>{item.time}</span>
        <span>{item.title}</span>
      </div>
    );
  }

  render() {
    const { announce } = this.props;
    return (
      <Card title="通知公告">
        <Collapse bordered={false}>
          {
            announce.map((item, index) => {
              return <Panel header={this.renderTitle(item)} key={index}>
                       <p>{item.content}</p>
                     </Panel>
            })
          }
        </Collapse>
      </Card>
    );
  }
}