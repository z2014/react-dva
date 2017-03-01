import request from '../utils/request';
import qs from 'qs';

export async function queryStatus(params) {
  // 获取工作汇报状态
  return request(`api/report/status?${qs.stringify(params)}`, {
    credentials: 'include'
  });
}

// 提交工作汇报
export async function submitReport(params) {
  return request('/api/report/', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: qs.stringify(params)
  });
}

// 更新工作汇报
export async function updateReport(params) {
  return request('/api/report', {
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
    body: qs.stringify(params)
  });
}

export async function queryReport(params) {
  return request(`api/report?${qs.stringify(params)}`, {
    credentials: 'include'
  });
}