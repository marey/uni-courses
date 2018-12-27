const API_URL = 'https://test.shifubang.com'

function login(data) {
      return Q.Promise(function (resolve, reject, notify) {
            wx.request({
                  url: API_URL + '/' + type,
                  data: params,
                  header: {
                        'Content-Type': 'application/json'
                  },
                  method: method,
                  success: resolve,
                  fail: reject
            })
      })
}

function get_news_list(params) {
      return new Promise(function (resolve, reject, notify) {
            wx.request({
                  url: API_URL + '/news/list',
                  data: params,
                  header: {
                        'Content-Type': 'application/json'
                  },
                  method: 'GET',
                  success: resolve,
                  fail: reject
            })
      })
}
function get_my_courses(params){
  return new Promise(function (resolve, reject, notify) {
    wx.request({
      url: API_URL + '/user/courses/'+params.openId,
      data: params,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: resolve,
      fail: reject
    })
  })
}
function get_my_course_info(params) {
  return new Promise(function (resolve, reject, notify) {
    wx.request({
      url: API_URL + '/user/courses/' + params.openId,
      data: params,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: resolve,
      fail: reject
    })
  })
}
function get_user_wrong_answers_count(data) {
      return new Promise((resolve, reject) => {
            resolve(
                  wx.cloud.callFunction({
                        // 要调用的云函数名称
                        name: 'get_user_wrong_answers_count',
                        data: data
                  })
            )
      })
}

function get_user_collections_count(data) {
      return new Promise((resolve, reject) => {
            resolve(
                  wx.cloud.callFunction({
                        // 要调用的云函数名称
                        name: 'get_user_collections_count',
                        data: data
                  })
            )
      })
}

function get_course_question_total_count(data) {
      return new Promise((resolve, reject) => {
            resolve(
                  wx.cloud.callFunction({
                        // 要调用的云函数名称
                        name: 'get_course_question_total_count',
                        data: data
                  })
            )
      })
}

function get_user_exams_score_max(data) {
      return new Promise((resolve, reject) => {
            resolve(
                  wx.cloud.callFunction({
                        // 要调用的云函数名称
                        name: 'get_user_exams_score_max',
                        data: data
                  })
            )
      })
}


/** 
function get_news_list(data) {
      return new Promise((resolve, reject) => {
            resolve(
                  wx.cloud.callFunction({
                        // 要调用的云函数名称
                        name: 'get_news_list',
                  })
            )
      })
}
*/

function get_pages_setting(data) {
      return new Promise((resolve, reject) => {
            resolve(wx.cloud.callFunction({
                  // 要调用的云函数名称
                  name: 'get_pages_setting',
                  data: data
            }))
      })
}

function get_user_collections(data) {
      return new Promise((resolve, reject) => {
            resolve(wx.cloud.callFunction({
                  // 要调用的云函数名称
                  name: 'get_user_collections',
                  data: data
            }))
      })
}

function get_exam_question_list(data) {
      return new Promise((resolve, reject) => {
            resolve(wx.cloud.callFunction({
                  // 要调用的云函数名称
                  name: 'get_exam_question_list',
                  data: data
            }))
      })
}

module.exports = {
      //获得登录数据
      // 获取新闻的列表
      get_news_list: get_news_list,
      get_pages_setting: get_pages_setting,
      get_user_wrong_answers_count: get_user_wrong_answers_count,
      get_user_collections_count: get_user_collections_count,
      get_course_question_total_count: get_course_question_total_count,
      get_user_exams_score_max: get_user_exams_score_max,
      get_user_collections: get_user_collections,
      get_exam_question_list: get_exam_question_list,
      get_my_courses: get_my_courses
}