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
      'sex|1': [
        '男',
        '女'
      ],
      'class': '@cword(4, 15)',
      'college': '@cword(4, 15)',
      'phone|13100000000-18799999999': 1,
      'qq|676767-2323232323': 1,
      'campus|1': [
        '屯溪路校区',
        '翡翠湖校区'
      ],
      'avatar|1': [
        'http://online.hfut.edu.cn/online_logo.png',
        'http://online.hfut.edu.cn/images/service/paint.png'
      ],
      'role|1': ['成员', '部长', '行政', '总监/主 管'],
      'status|1': [
        '未知',
        '正常',
        '离职',
        '黑名单'
      ],
      'creditcode|6217856300009000000-6217856400000000000': 1,
      'email': '@email()',
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
    'data|20': [{
      'key|+1': 0,
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
      ],
      'class': '@cword(4, 15)',
      'college': '@cword(4, 15)',
    }],
    'conditions': {
      'campus': '翡翠湖校区',
      'depart': '视觉设计部',
      'start_date': '2017-01-11',
      'end_date': '2017-02-16',
      'contact': ''
    }
  });
  recruitData = data;
  global.recruitData = recruitData;
} else {
  recruitData = global.recruitData;
}

// 数据持久
let recruitDetails = {};
if (!global.recruitDetails) {
  const status = [
  {'status': 'success','current': 0,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 提交申请，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 一轮面试'},{key:'2',title:'二面',desc:'待通知二轮面试'},{key:'3',title:'考核期',desc:'二面通过即可进入考核期'},{key:'4',title:'正式入职',desc:'考核期通过即正式入职'}]},
  {'status': 'success','current': 0,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 从视觉设计部转入，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 一轮面试'},{key:'2',title:'二面',desc:'待通知二轮面试'},{key:'3',title:'考核期',desc:'二面通过即可进入考核期'},{key:'4',title:'正式入职',desc:'考核期通过即正式入职'}]},
  {'status': 'success','current': 1,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 提交申请，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 已通知一轮面试'},{key:'2',title:'二面',desc:'二轮面试'},{key:'3',title:'考核期',desc:'二面通过即可进入考核期'},{key:'4',title:'正式入职',desc:'考核期通过即正式入职'}]},
  {'status': 'error','current': 1,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 提交申请，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 一轮面试未通过，没有技术基础'},{key:'2',title:'二面',desc:'二轮面试'},{key:'3',title:'考核期',desc:'二面通过即可进入考核期'},{key:'4',title:'正式入职',desc:'考核期通过即正式入职'}]},
  {'status': 'success','current': 2,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 提交申请，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 一面通过：了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础'},{key:'2',title:'二面',desc:'待通知二轮面试'},{key:'3',title:'考核期',desc:'二面通过即可进入考核期'},{key:'4',title:'正式入职',desc:'考核期通过即正式入职'}]},
  {'status': 'error','current': 2,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 提交申请，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 一面通过：了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础'},{key:'2',title:'二面',desc:'二面未通过'},{key:'3',title:'考核期',desc:'二面通过即可进入考核期'},{key:'4',title:'正式入职',desc:'考核期通过即正式入职'}]},
  {'status': 'success','current': 3,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 提交申请，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 一面通过：了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础'},{key:'2',title:'二面',desc:'二面已通过'},{key:'3',title:'考核期',desc:'正在考核'},{key:'4',title:'正式入职',desc:'考核期通过即正式入职'}]},
  {'status': 'error','current': 3,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 提交申请，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 一面通过：了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础'},{key:'2',title:'二面',desc:'二面已通过'},{key:'3',title:'考核期',status:'error',desc:'未通过考核'},{key:'4',title:'正式入职',desc:'考核期通过即正式入职'}]},
  {'status': 'success','current': 4,'steps':[{key:'0',title:'待处理',desc:'2016-10-11 提交申请，待通知面试'},{key:'1',title:'一面',desc:'2016-10-12 一面通过：了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础了解前端基础知识，并且有java编程基础'},{key:'2',title:'二面',desc:'二面已通过'},{key:'3',title:'考核期',desc:'考核通过，考核期表现良好，完成考核任务'},{key:'4',title:'正式入职',desc:'已正式入职'}]}
  ]
  const data = recruitData;
  data.data.map(item => {
    item.status = status[parseInt(8*Math.random())];
    item.desc = mockjs.mock('@csentence(40, 300)');
  });
  recruitDetails = data;
  global.recruitDetails = recruitDetails;
} else {
  recruitDetails = global.recruitDetails;
}

module.exports = {

  'GET /api/member' (req, res) {
    const params = qs.parse(req.query);
    const depart = params.depart || 'all';
    const period = params.period || '11';
    const campus = params.campus || '';
    const data =  {
      members: membersData.data,
      conditions: {
        period,
        depart,
        campus
      }
    };

    setTimeout(function () {
      res.json({
        success: 'true',
        data
      });
    }, 2000);
  },

  'PUT /api/member' (req, res) {
    setTimeout(function() {
      res.json({
        success: 'true',
        data: 'updated'
      });
    }, 200);
  },

  'POST /api/member/avatar' (req, res) {
    setTimeout(function() {
      res.json({
        success: 'true',
        data: 'http://online.hfut.edu.cn/online_logo.png'
      });
    }, 200);
  },

  'GET /api/recruits' (req, res) {
    const params = qs.parse(req.query);
    const data = {
      data: recruitData.data,
      conditions: params.start_date ? params : recruitData.conditions
    }

    setTimeout(function () {
      res.json({
        success: 'true',
        data
      });
    }, 500);
  },

  'GET /api/recruit' (req, res) {
    const params = qs.parse(req.query);
    const data = recruitDetails.data[parseInt(params.id)];

    setTimeout(function () {
      res.json({
        success: 'true',
        data
      });
    }, 500);
  },

  'PUT /api/recruit' (req, res) {
    const params = qs.parse(req.body);
    const data = recruitDetails.data[parseInt(params.id)];
    const current = parseInt(params.status);

    if (0 == current) {
      data.status.status = 'error';
      data.status.steps[data.status.current].desc = params.desc;
    } else if (0 < current && 5 > current) {
      data.status.status = 'success';
      data.status.current = current;
      data.status.steps[current - 1].desc = params.desc;
    } else {
      //
    }

    setTimeout(function() {
      res.json({
        success: 'true',
        data: data
      });
    }, 200);
  },

};
