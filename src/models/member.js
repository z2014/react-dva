import { queryMembers, queryRecruit, updateMember } from '../services/members';
import { parse } from 'qs';

export default {
  namespace: 'member',

  state: {
    message: {
      type: '',
      msg: ''
    },
    currentNav: '1',
    data: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/member') {
          dispatch({
            type: 'fetchAll',
            payload: {
              depart: (OAglobal.user.role < 2) ? OAglobal.user.depart : 'all'
            }
          });
        }
      });
    },
  },

  effects: {
    // 获取所有成员信息
    *fetchAll({ payload }, { call, put }) {
      const {data} = yield call(queryMembers, parse(payload));
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

    // 获取招新数据
    *fetchRecruit({ payload }, { call, put }) {
      const {data} = yield call(queryRecruit);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            recruit: data.data
          },
        });
      } else {
        yield put({
          type: 'queryFailure'
        })
      }
    },

    //
    *updateMember({ payload }, { call, put }) {
      const {data} = yield call(updateMember, parse(payload));
      if (data.stat == 'success') {
        yield put({
          type: 'updateSuccess',
          payload: payload
        });
      } else {
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

    updateFailure(state, action) {
      const param = {
        message: {
          type: 'error',
          msg: '我不得不告诉你，修改失败了'
        },
        shouldUpdate: false
      }
      return { ...state, ...param};
    },

    updateSuccess(state, action) {
      const updateUser = action.payload;
      const data = state.data.map(item => {
        if (item.stuid == updateUser.stuid) {
          return { ...item, ...updateUser };
        }
        return item;
      });
      const param = {
        data: data,
        shouldUpdate: true
      }
      return { ...state, ...param};
    }
  }

}
