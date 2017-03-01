import { queryRecruitInfo, updateRecruitStatus } from '../services/members';
import { parse } from 'qs';

export default {
  namespace: 'recruit',

  state: {
    message: {
      key: Symbol('msg_recruit'), // 确保每次message的key独一无二
      type: '',
      msg: ''
    },
    data: [],
    loading: false
  },

  subscriptions: {
  },

  effects: {
    // 更新信息
    *updateRecruitStatus({ payload }, { call, put }) {
      const {data} = yield call(updateRecruitStatus, parse(payload));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'querySuccess',
            payload: {
              data: data.data
            },
          })
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
            msg: '网络拥堵，更新失败了'
          }
        })
      }
    },

    // 获取招新数据
    *fetchRecruit({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const {data} = yield call(queryRecruitInfo, parse(payload));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'querySuccess',
            payload: {
              data: data.data
            },
          })
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
            msg: '啊哦，获取数据失败，可能是网络问题'
          }
        })
      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      const params = {
        shouldUpdate: true,
        loading: false,
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
          key: Symbol('msg_member'),
          type: action.payload.msgType,
          msg: action.payload.msg
        }
      }
      return { ...state, ...params};
    }
  }

}
