import { queryMembers, queryRecruits, updateMember } from '../services/members';
import { parse } from 'qs';

export default {
  namespace: 'member',

  state: {
    message: {
      key: Symbol('msg_member'), // 确保每次message的key独一无二
      type: '',
      msg: ''
    },
    currentNav: 'member',
    members: [],
    recruit: [],
    loading: {
      member: false,
      recruit: false
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/member') {
          dispatch({
            type: 'fetchMembers',
            payload: {
              depart: (OAglobal.user.role < 2) ? OAglobal.user.depart : 'all'
            }
          });
        }
      });
    },
  },

  effects: {
    // 获取成员数据
    *fetchMembers({ payload }, { call, put }) {
      yield put({
        type: 'showLoading',
        payload: {
          panel: 'member'
        }
      });
      const {data} = yield call(queryMembers, parse(payload));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'querySuccess',
            payload: {
              members: data.data,
            },
          });
        } else {
          yield put({
            type: 'showMsg',
            payload: {
              msgType: 'error',
              msg: data.data
            },
          });
        }
      } else {
        yield put({
          type: 'showMsg',
          payload: {
            msgType: 'error',
            msg: '啊哦，获取数据失败，可能是网络问题'
          }
        });
      }
    },

    // 更新成员信息
    *updateMember({ payload }, { call, put }) {
      const {data} = yield call(updateMember, parse(payload));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'updateSuccess',
            payload: payload
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
            msg: '网络拥堵，更新失败了'
          }
        })
      }
    },

    // 获取招新数据
    *fetchRecruits({ payload }, { call, put }) {
      yield put({
        type: 'showLoading',
        payload: {
          panel: 'recruit'
        }
      });
      const {data} = yield call(queryRecruits, parse(payload));
      if (data) {
        if (data.success == 'true') {
          yield put({
            type: 'querySuccess',
            payload: {
              recruit: data.data
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
        loading: {
          member: false,
          recruit: false
        },
        ...action.payload
      }
      return { ...state, ...params };
    },

    queryFailure(state, action) {
      const param = {
        shouldUpdate: false
      }
      return { ...state, ...param }
    },

    showLoading(state, action) {
      const { panel } = action.payload;
      const params = {
        shouldUpdate: true,
        loading: {
          member: (panel == 'member') ? true : false,
          recruit: (panel == 'recruit') ? true : false
        }
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
    },

    updateSuccess(state, action) {
      const updateUser = action.payload;
      const data = state.members.members.map(item => {
        if (item.stuid == updateUser.stuid) {
          return { ...item, ...updateUser };
        }
        return item;
      });
      const members = {
        conditions: state.members.conditions,
        members: data
      }
      const param = {
        message: {
          key: Symbol('msg_member'),
          type: 'success',
          msg: '修改成功'
        },
        members,
        shouldUpdate: true
      }
      return { ...state, ...param};
    }
  }

}
