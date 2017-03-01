import { queryAnnounce } from '../services/global';
import { parse } from 'qs';

export default {
  namespace: 'global',

  state: {
    message: {
      key: Symbol('msg_recruit'), // 确保每次message的key独一无二
      type: '',
      msg: ''
    },
    announce: [],
    loading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'fetchAnnounce'
          });
        }
      });
    },
  },

  effects: {

    // 获取数据
    *fetchAnnounce({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const {data} = yield call(queryAnnounce, parse(payload));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'querySuccess',
            payload: {
              announce: data.data
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
