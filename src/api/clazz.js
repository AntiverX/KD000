import request from '@/utils/request'

export function getClazzList(query) {
  return request({
    url: '/api/classes/',
    method: 'get',
    params: query
  })
}

export function getClazz(id) {
  return request({
    url: '/api/clazz/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteClazz(id) {
  return request({
    url: '/api/classes/delete',
    method: 'get',
    params: { id }
  })
}

export function createClazz(data) {
  return request({
    url: '/api/classes/create',
    method: 'post',
    data
  })
}
