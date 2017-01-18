import { queryMeeting,updateMeeting } from '../services/meeting';
import { parse } from 'qs';

export default {
  namespace: 'meeting',

  state: {
    message: {
      type: '',
      msg: ''
    },
    currentNav: '2',
    data: []
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
    // 获取所有会议信息
    *fetchAllMeeting({ payload }, { call, put }) {
      const { data } = yield call(queryMeeting);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.data
          },
        });
      } else {
        yield put({
          type: 'queryFailure'
        })
      }
    },

    *updateList({ payload },{ call , put }) {
      const { data } = yield call(updateMeeting);
      if (data.stat == 'success') {
        yield put({
          type: 'updateSuccess',
          payload: payload
        })
      }else {
        yield put({
          type: 'updateFailure'
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
    },

    updateSuccess(state , action) {
      const meetingContent = action.payload;
      console.log(meetingContent);
      const data = state.data.map(item => {
        if (item.key == action.payload.meeting.key) {
          return { ...item, ...action.payload.meeting }
        }
        return item;
      });
      const param = {
        data:data,
        shouldUpdate:true
      };
      return { ...state, ...param }
    }
  }

}
