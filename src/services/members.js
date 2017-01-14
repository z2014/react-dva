import request from '../utils/request';
import qs from 'qs';

export async function queryMembers(params) {
  // 请求成员列表
  return request(`/api/member?${qs.stringify(params)}`);
}

export async function queryRecruit() {
  // 请求招新简历列表
  return request('/api/recruit');
}

export async function updateMember(params) {
  // 请求招新简历列表
  return request('/api/member/', {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    body: qs.stringify(params)
  });
}