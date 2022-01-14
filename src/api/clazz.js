import request from '@/utils/request'

export function getClazzList(query) {
  return request({
    url: '/api/clazz/get',
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
    url: '/api/clazz/delete',
    method: 'get',
    params: { id }
  })
}

export function createClazz(data) {
  return request({
    url: '/api/clazz/create',
    method: 'post',
    data
  })
}

export function updateClazz(data) {
  return request({
    url: '/api/clazz/update',
    method: 'post',
    data
  })
}
