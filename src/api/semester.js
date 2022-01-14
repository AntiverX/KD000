import request from '@/utils/request'

export function getSemesterList(query) {
  return request({
    url: '/api/semester/get',
    method: 'post',
    params: query
  })
}

export function getSemester(id) {
  return request({
    url: '/api/semester/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteSemester(id) {
  return request({
    url: '/api/semester/delete',
    method: 'get',
    params: { id }
  })
}

export function createSemester(data) {
  return request({
    url: '/api/semester/create',
    method: 'post',
    data
  })
}

export function updateSemester(data) {
  return request({
    url: '/api/semester/update',
    method: 'post',
    data
  })
}
