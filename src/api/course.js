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
    url: '/api/courses/update/',
    method: 'post',
    data
  })
}

// 固定不排课程
export function getnotAssignCourse() {
  return request({
    url: '/api/notAssignCourse/',
    method: 'get'
  })
}
export function createnotAssignCourse(data) {
  return request({
    url: '/api/notAssignCourse/',
    method: 'post',
    data
  })
}
export function deletenotAssignCourse(id) {
  return request({
    url: '/api/notAssignCourse/' + id + '/',
    method: 'delete'
  })
}
// 固定课程
export function getAssigned() {
  return request({
    url: '/api/assigned/',
    method: 'get'
  })
}
export function createAssigned(data) {
  return request({
    url: '/api/assigned/',
    method: 'post',
    data
  })
}
export function deleteAssigned(id) {
  return request({
    url: '/api/assigned/' + id + '/',
    method: 'delete'
  })
}
// 额外课程
export function getextraCourse() {
  return request({
    url: '/api/extraCourse/',
    method: 'get'
  })
}
export function createextraCourse(data) {
  return request({
    url: '/api/extraCourse/',
    method: 'post',
    data
  })
}
export function deleteextraCourse(id) {
  return request({
    url: '/api/extraCourse/' + id + '/',
    method: 'delete'
  })
}
// 课程数量
export function getcourseTotal() {
  return request({
    url: '/api/courseTotal/',
    method: 'get'
  })
}
export function createcourseTotal(data) {
  return request({
    url: '/api/courseTotal/',
    method: 'post',
    data
  })
}
export function deletecourseTotal(id) {
  return request({
    url: '/api/courseTotal/' + id + '/',
    method: 'delete'
  })
}
// 不排课时间
export function getnotAssign() {
  return request({
    url: '/api/notAssign/',
    method: 'get'
  })
}
export function createnotAssign(data) {
  return request({
    url: '/api/notAssign/',
    method: 'post',
    data
  })
}
export function deletenotAssign(id) {
  return request({
    url: '/api/notAssign/' + id + '/',
    method: 'delete'
  })
}
// 连堂课
export function getlinkCourseTime() {
  return request({
    url: '/api/linkCourseTime/',
    method: 'get'
  })
}
export function createlinkCourseTime(data) {
  return request({
    url: '/api/linkCourseTime/',
    method: 'post',
    data
  })
}
export function deletelinkCourseTime(id) {
  return request({
    url: '/api/linkCourseTime/' + id + '/',
    method: 'delete'
  })
}
// 课程连堂数量
export function getcourseLinkedSections() {
  return request({
    url: '/api/courseLinkedSections/',
    method: 'get'
  })
}
export function createcourseLinkedSections(data) {
  return request({
    url: '/api/courseLinkedSections/',
    method: 'post',
    data
  })
}
export function deletecourseLinkedSections(id) {
  return request({
    url: '/api/courseLinkedSections/' + id + '/',
    method: 'delete'
  })
}

// 获取课表
export function getGradeScheduler() {
  return request({
    url: '/api/do_schedule_task/1',
    method: 'get'
  })
}
