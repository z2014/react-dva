import request from '../utils/request';
import qs from 'qs';
export async function queryMeeting (params) {
  return request(`/api/meeting?${qs.stringify(params)}`,{
    credentials:'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export async function updateMeeting (params) {
  return request('/api/meeting/',{
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify(params)
  })
}
export async function addMeeting (params) {
  return request('/api/meeting',{
    method:'put',
    mode:'cors',
    credentials:'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:qs.stringify(params)
  })
}
