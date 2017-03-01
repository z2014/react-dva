import React, { Component, PropTypes } from 'react';
import { Table } from 'antd';

export default class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    loading: false,
    pageSize: 10,
    className: 'oa-data-table',
    size: 'small'
  }

  render() {
    const { size, pageSize, columns, data, className, loading } = this.props;
    return (
      <Table
        loading={loading}
        rowSelection={{}}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: pageSize }}
        size={size}
        className={className}
        style={{ overflowY: "auto" }}
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