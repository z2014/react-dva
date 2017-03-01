import request from '../utils/request';
import qs from 'qs';

export async function queryAnnounce(params) {
  return request(`/api/announce?${qs.stringify(params)}`, {
    credentials: 'include'
  });
}
