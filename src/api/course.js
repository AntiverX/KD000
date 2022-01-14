import request from '@/utils/request'

export function getCourseList(query) {
  return request({
    url: '/api/courses/',
    method: 'get',
    params: query
  })
}

export function createCourse(data) {
  return request({
    url: '/api/courses/',
    method: 'post',
    data
  })
}

export function deleteCourse(id) {
  return request({
    url: '/api/courses/' + id + '/',
    method: 'delete'
  })
}

export function getCourse(id) {
  return request({
    url: '/api/courses/detail',
    method: 'get',
    params: { id }
  })
}
export function updateCourse(data) {
  return request({
    url: '/api/courses/update',
    method: 'post',
    data
  })
}
