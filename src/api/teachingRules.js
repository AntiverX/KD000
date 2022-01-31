import request from '@/utils/request'

export function getRuleList(query) {
  return request({
    url: '/api/teachingRules/',
    method: 'get',
    params: query
  })
}


export function getTeachingCOurseList(query) {
  return request({
    url: '/api/teachingCourse/',
    method: 'get',
    params: query
  })
}


export function getTeacherList(query) {
  return request({
    url: '/api/teachers/',
    method: 'get',
    params: query
  })
}

export function getClassList(query) {
  return request({
    url: '/api/classes/',
    method: 'get',
    params: query
  })
}

export function getCourseList(query) {
  return request({
    url: '/api/courses/',
    method: 'get',
    params: query
  })
}

export function getTeacherCourseList(query) {
  return request({
    url: '/api/teachingCourse/',
    method: 'get',
    params: query
  })
}

export function getRule(data) {
  return request({
    url: '/api/teachingRules/',
    method: 'post',
    data
  })
}

export function deleteRule(id) {
  return request({
    url: '/api/teachingRules/' + id + '/',
    method: 'delete'
  })
}

export function createRule(data) {
  return request({
    url: '/api/teachingRules/',
    method: 'post',
    data
  })
}

export function createTeachingCourse(data) {
  return request({
    url: '/api/teachingCourse/',
    method: 'post',
    data
  })
}
createTeachingCourse

export function updateRule(data) {
  return request({
    url: '/api/teachingRules/update',
    method: 'post',
    data
  })
}
