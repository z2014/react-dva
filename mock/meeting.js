'use strict';
const qs = require('qs');
const mockjs = require('mockjs');
let meetingData = {};
if (!global.meetingData) {
  const data1 = mockjs.mock({
    'data|10': [{
      'id|+1': 1,
      'date|1': [
        '2017-01-01',
        '2016-11-20'
      ],
      'time|1': ['19-12','20-10'],
      'meeting|1': [
        '第一次全员大会',
        '第十次全员大会'
      ],
      'role|1': ['全员大会', '部门例会'],
      'status|1': [
        '未召开',
        '已召开',
      ],
      'owner|1': ['曹善敏'],
      'depart|1':['2','3',]
    }],
    page: {
      total: 1,
      current: 1
    }
  });
  meetingData = data1;
  global.meetingData = meetingData;
}else{
  meetingData = global.meetingData;
}
module.exports = {
  'GET /api/meeting' (req, res) {
    const params = qs.parse(req.query);
    console.log('meetingData',meetingData);    
    var querydata;
    if (params) {
      querydata = meetingData.data.filter(function(data) {
        if (params.role) {
          if (params.role == '部门例会') {
            return data.role == params.role && data.depart == params.depart;
          }else {
            return data.role == params.role;
          }
        }else{
          return data.depart == params.depart;
        }
      });
    }else{
      querydata = meetingData.data;
    }
    res.json({
      success: true,
      data:querydata,
      page: meetingData.page
    });
  },

  'POST /api/meeting' (req,res) {
    setTimeout(function () {
      res.json({
        stat: 'success'
      })
    }, 500);
  },

  'PUT /api/meeting' (req,res) {
    const newData = qs.parse(req.body);
    console.log(req.body);
    meetingData.data.push(newData);
    // console.log(meetingData.data);
    setTimeout(function () {
      res.json({
        stat: 'success'
      })
    },500);
  }
};
