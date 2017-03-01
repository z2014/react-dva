'use strict';
const qs = require('qs');
const mockjs = require('mockjs');

let announce = {};
if (!global.announce) {
  const data = mockjs.mock({
    'data|10': [{
      'id|+1': 1,
      'title': '@csentence(10, 20)',
      'content': '@csentence(10, 100)',
      'time': '@date("yyyy-MM-dd")',
    }]
  });
  announce = data;
  global.announce = announce;
} else {
  announce = global.announce;
}

module.exports = {

  'GET /api/announce' (req, res) {
    setTimeout(function () {
      res.json({
        success: 'true',
        data: announce.data
      });
    }, 500);
  },

};
