import request from '@/utils/request'

export function getCourseList(query) {
  return request({
    url: '/api/courses/',
    method: 'get',
    params: query
  })
}

export function getCourse(id) {
  return request({
    url: '/api/courses/detail',
    method: 'get',
    params: { id }
  })
}

export function deleteCourse(id) {
  return request({
    url: '/api/courses/delete',
    method: 'get',
    params: { id }
  })
}

export function createCourse(data) {
  return request({
    url: '/api/courses/create',
    method: 'post',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: '/api/courses/update',
    method: 'post',
    data
  })
}
