'use strict';
const qs = require('qs');
const mockjs = require('mockjs');

let reports = {};
if (!global.reports) {
  const data = mockjs.mock({
    'data|10': [{
      'id|+1': 1,
      'status|1': ['expired', 'normal'],
      'username': '@cname',
      'start_date': '@date("yyyy-MM-dd")',
      'end_date': '@date("yyyy-MM-dd")',
      'content': '@csentence(10, 100)',
      'suggestion': '@csentence(10, 100)',
      'comment': '@csentence(10, 70)',
      'rate|1-5': 1,
      'salary': {
        'review|10-400': 1,
        'final|0-400': 1
      }
    }]
  });
  reports = data;
  global.reports = reports;
} else {
  reports = global.reports;
}

let onesreport = {};
if (!global.onesreport) {
  const data = mockjs.mock({
    'data|10': [{
      'id|+1': 1,
      'start_date': '@date("yyyy-MM-dd")',
      'end_date': '@date("yyyy-MM-dd")',
      'content': '@csentence(10, 100)',
      'suggestion': '@csentence(10, 100)',
      'comment': '@csentence(10, 70)',
      'rate|1-5': 1,
      'salary|10-400': 1
    }]
  });
  onesreport = data;
  global.onesreport = onesreport;
} else {
  onesreport = global.onesreport;
}

module.exports = {

  'GET /api/report/status' (req, res) {
    const data = {
      stat: 'open',
      start_date: '2017-01-15',
      end_date: '2017-02-15'
    }
    setTimeout(function () {
      res.json({
        success: 'true',
        data
      });
    }, 500);
  },

  'GET /api/report' (req, res) {

    const params = qs.parse(req.query);
    if (params.stuid) {
      setTimeout(function () {
        res.json({
          success: 'true',
          data: onesreport.data
        });
      }, 500);
    } else {
      setTimeout(function () {
        res.json({
          success: 'true',
          data: reports.data,
          conditions: {
            start_date: params.start_date || '2017-01-01',
            end_date: params.end_date || '2017-06-02',
            depart: params.depart || '办公室',
            campus: params.campus || '',
          }
        });
      }, 500);
    }

  },

  'POST /api/report' (req, res) {
    setTimeout(function () {
      res.json({
        success: 'true',
        msg: '提交成功'
      });
    }, 500);
  },

  'PUT /api/report/salary' (req, res) {
    setTimeout(function () {
      res.json({
        success: 'true',
        msg: '提交成功'
      });
    }, 500);
  },

  'PUT /api/report/rate' (req, res) {
    setTimeout(function () {
      res.json({
        success: 'true',
        msg: '提交成功'
      });
    }, 500);
  },

  'PUT /api/error' (req, res) {
    setTimeout(function () {
      res.json({
        success: 'false',
        msg: '操作失败'
      });
    }, 500);
  },

  'POST /api/error' (req, res) {
    setTimeout(function () {
      res.json({
        success: 'false',
        msg: '操作失败'
      });
    }, 500);
  }

};
