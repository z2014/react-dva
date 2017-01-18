import request from '../utils/request';
import qs from 'qs';
export async function queryMeeting () {
  return request('/api/meeting')
}
export async function updateMeeting (params) {
  return request('/api/meeting/',{
  	method: 'put',
  	mode: 'cors',
  	credentials: 'include',
  	body: qs.stringify(params)
  })
}