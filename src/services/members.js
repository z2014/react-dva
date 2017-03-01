import request from '../utils/request';
import qs from 'qs';

export async function queryMembers(params) {
  // 请求成员列表
  return request(`/api/member?${qs.stringify(params)}`, {
    credentials: 'include'
  });
}

export async function updateMember(params) {
  return request('/api/member/', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify(params)
  });
}

export async function queryRecruits(params) {
  // 请求招新简历列表
  return request(`/api/recruits?${qs.stringify(params)}`, {
    credentials: 'include'
  });
}

export async function queryRecruitInfo(params) {
  return request(`/api/recruit?${qs.stringify(params)}`, {
    credentials: 'include'
  });
}

export async function updateRecruitStatus(params) {
  return request('/api/recruit/', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: qs.stringify(params)
  });
}