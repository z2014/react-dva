'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久
let membersData = {};
if (!global.membersData) {
  const data = mockjs.mock({
    'data|100': [{
      'key|+1': 1,
      'name': '@cname',
      'depart|1': [
        '办公室',
        '推广部',
        '技术部',
        '视觉设计部',
        '产品部',
        '视频部',
        '编辑部',
        '微信微博部',
        '策划部'
      ],
      'phone|13100000000-18799999999': 1,
      'qq|676767-2323232323': 1,
      'campus|1': [
        '屯溪路校区',
        '翡翠湖校区'
      ],
      'role|1': ['成员', '部长', '行政', '总监/主 管', '超级管理员'],
      'status|1': [
        '在职',
        '毕业',
        '离职',
        '黑名单'
      ],
      'stuid|2016200000-2013233233': 1
    }],
    page: {
      total: 100,
      current: 1
    }
  });
  membersData = data;
  global.membersData = membersData;
} else {
  membersData = global.membersData;
}

// 数据持久
let recruitData = {};
if (!global.recruitData) {
  const data = mockjs.mock({
    'data|100': [{
      'key|+1': 1,
      'stuid|2016200000-2013233233': 1,
      'name': '@cname',
      'depart|1': [
        '办公室',
        '推广部',
        '技术部',
        '视觉设计部',
        '产品部',
        '视频部',
        '编辑部',
        '微信微博部',
        '策划部'
      ],
      'sex|1': [
        '男',
        '女'
      ],
      'phone|13100000000-18799999999': 1,
      'qq|676767-2323232323': 1,
      'campus|1': [
        '屯溪路校区',
        '翡翠湖校区'
      ]
    }],
    page: {
      total: 100,
      current: 1
    }
  });
  recruitData = data;
  global.recruitData = recruitData;
} else {
  recruitData = global.recruitData;
}

module.exports = {

  'GET /api/member' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 100;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = membersData.data.concat();

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(page.keyword) > -1;
      });

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage * 1,
        total: d.length
      };
    } else {
      data = membersData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      membersData.page.current = currentPage * 1;
      newPage = {
        current: membersData.page.current,
        total: membersData.page.total
      };
    }


    setTimeout(function () {
      res.json({
        success: true,
        data,
        page: newPage
      });
    }, 500);
  },

  'PUT /api/member' (req, res) {
    setTimeout(function() {
      res.json({
        stat: 'success',
        data: 'updated'
      });
    }, 200);
  },

  'GET /api/recruit' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 100;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = recruitData.data.concat();

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(page.keyword) > -1;
      });

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage * 1,
        total: d.length
      };
    } else {
      data = recruitData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      recruitData.page.current = currentPage * 1;
      newPage = {
        current: recruitData.page.current,
        total: recruitData.page.total
      };
    }


    setTimeout(function () {
      res.json({
        success: true,
        data,
        page: newPage
      });
    }, 500);
  }

};
