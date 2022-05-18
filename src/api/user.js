import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
// teacher
// 课程数量
export function getteacher() {
  return request({
    url: '/api/teachers/',
    method: 'get'
  })
}
export function createteacher(data) {
  return request({
    url: '/api/teachers/',
    method: 'post',
    data
  })
}
export function deleteteacher(id) {
  return request({
    url: '/api/teachers/' + id + '/',
    method: 'delete'
  })
}
export function updateteacher(data) {
  return request({
    url: '/api/teachers/' + data.id + '/',
    method: 'put',
    data
  })
}
// 固定不排课教师
export function getnotAssignTeacher() {
  return request({
    url: '/api/notAssignTeacher/',
    method: 'get'
  })
}
export function createnotAssignTeacher(data) {
  return request({
    url: '/api/notAssignTeacher/',
    method: 'post',
    data
  })
}
export function deletenotAssignTeacher(id) {
  return request({
    url: '/api/notAssignTeacher/' + id + '/',
    method: 'delete'
  })
}
