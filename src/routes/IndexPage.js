import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Layout from '../components/Common/Layout.js';

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <h2>Hello</h2>
      </Layout>
    );
  }
}

export default  connect()(IndexPage);