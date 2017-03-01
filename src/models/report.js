import { queryStatus, queryReport, submitReport, updateReport } from '../services/report';
import { parse } from 'qs';

export default {
  namespace: 'report',

  state: {
    message: {
      key: Symbol('msg_report'),
      type: '',
      msg: ''
    },
    currentNav: 'report',
    status: {
      stat: 'loading'
    },
    shouldUpdate: false,
    myreport: [],
    reports: [],
    reportConditions: new Object,
    loading: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/report') {
          dispatch({
            type: 'fetchMyReport'
          });
        }
      });
    },
  },

  effects: {
    // 审核汇报时获取汇报列表
    *fetchReports({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const {data} = yield call(queryReport, parse(payload));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'querySuccess',
            payload: {
              loading: false,
              reports: data.data,
              reportConditions: data.conditions
            }
          })
        };
      }
    },

    // 获取个人汇报列表
    *fetchMyReport({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const params = { stuid: OAglobal.user.stuid };
      const {data} = yield call(queryReport, parse(params));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'querySuccess',
            payload: {
              loading: false,
              myreport: data.data
            }
          })
        };
      }
    },

    // 获取工作汇报状态
    *fetchStatus({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const {data} = yield call(queryStatus, parse(payload));
      if (data && data.success == 'true') {
        yield put({
          type: 'querySuccess',
          payload: {
            loading: false,
            status: data.data
          },
        });
      } else {
        yield put({
          type: 'showMsg',
          payload: {
            msgType: 'error',
            msg: '我曹，服务器不给我数据，小写的error'
          }
        })
      }
    },

    // 更新汇报回评、薪资等
    *updateReport({ payload }, { call, put }) {
      const {data} = yield call(updateReport, parse(payload));
      if (!data || data.success !== 'true') {
        yield put({
          type: 'showMsg',
          payload: {
            msgType: 'error',
            msg: '我曹，操作失败，大写的ERROR'
          }
        })
      }
    },

    // 提交汇报
    *submitReport({ payload }, { call, put }) {
      const {data} = yield call(submitReport, parse(payload));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'showMsg',
            payload: {
              msgType: 'success',
              msg: data.data
            }
          });
        } else {
          yield put({
            type: 'showMsg',
            payload: {
              msgType: 'error',
              msg: data.data
            }
          })
        }
      } else {
        yield put({
          type: 'showMsg',
          payload: {
            msgType: 'error',
            msg: '我不得不告诉你，操作失败了'
          }
        })
      }
    }
  },

  reducers: {
    querySuccess(state, action) {
      const params = {
        shouldUpdate: true,
        ...action.payload
      }
      return { ...state, ...params };
    },

    showLoading(state) {
      const params = {
        shouldUpdate: true,
        loading: true
      }
      return { ...state, ...params };
    },

    showMsg(state, action) {
      const params = {
        shouldUpdate: false,
        message: {
          key: Symbol('msg_report'),
          type: action.payload.msgType,
          msg: action.payload.msg
        }
      }
      return { ...state, ...params};
    }
  }

}
