import { queryMeeting } from '../services/meeting';
import { parse } from 'qs';

export default {
  namespace: 'meeting',

  state: {
    current: '2',
    meetingdata: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/meeting') {
          dispatch({
            type: 'fetchAllMeeting',
            payload: {}
          });
        }
      });
    },
  },

  effects: {
    // 获取所有成员信息
    *fetchAllMeeting({ payload }, { call, put }) {
      const { data } = yield call(queryMeeting);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.meetingdata
          },
        });
      } else {
        yield put({
          type: 'queryFailure'
        })
      }
    }
  },
  reducers: {
    querySuccess(state, action) {
      action.payload.shouldUpdate = true;
      return { ...state, ...action.payload };
    },

    queryFailure(state, action) {
      const param = {
        shouldUpdate: false
      }
      return { ...state, ...param }
    }
  }

}
