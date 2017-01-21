'use strict';
const qs = require('qs');
const mockjs = require('mockjs');
const data1 = mockjs.mock({
  'data|20': [{
    'key|+1': 1,
    'date|1': [
      '2017-01-01',
      '2016-11-20'
    ],
    'time|1': ['19-12','20-10'],
    'meeting|1': [
      '第一次全员大会',
      '第十次全员大会'
    ],
    'role|1': ['全员大会', '部门会议'],
    'status|1': [
      '未召开',
      '已召开',
    ],
    'owner|1': ['张春林','曹善敏']
  }],
  page: {
    total: 1,
    current: 1
  }
});
module.exports = {
  'GET /api/meeting' (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data:data1.data, 
        page: data1.page
      });
    }, 500);
  },

  'PUT /api/meeting' (req,res) {
    setTimeout(function () {
      res.json({
        stat: 'success'
      })
    }, 500);
  }
};
