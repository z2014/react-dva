import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';

export default class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    pageSize: 10,
    className: 'oa-data-table',
    size: 'small'
  }

  render() {
    const { size, pageSize, columns, data, className } = this.props;
    return (
      <Table
        rowSelection={{}}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: pageSize }}
        size={size}
        className={className}
        style={{ overflowY: "auto" }}
        // scroll={{y: '400px'}}
        {...this.props}
      />
    );
  }
}

DataTable.PropTypes = {
  pageSize: PropTypes.number,
  columns: PropTypes.array,
  data: PropTypes.array,
  className: PropTypes.string,
  size: PropTypes.string
}