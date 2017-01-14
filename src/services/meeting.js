import request from '../utils/request';
import qs from 'qs';
export async function queryMeeting () {
  return request('/api/meeting')
}