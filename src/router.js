import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Member from './routes/Member';
import Meeting from './routes/Meeting';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/member" component={Member} />
      <Route path="/meeting" component={Meeting}/>
    </Router>
  );
};
