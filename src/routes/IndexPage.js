import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Layout from '../components/Common/Layout.js';
import DashBoard from '../components/Index/DashBoard.js';

class IndexPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <DashBoard announce={this.props.global.announce} />
      </Layout>
    );
  }
}

function mapStateToProps(global) {
  return {...global};
}

export default connect(mapStateToProps)(IndexPage);