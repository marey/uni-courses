//获取应用实例
var app = getApp();
Page({
      data: {
            column: [{
                  class: 'num',
                  option: []
            }],
      },
      onLoad(params) {
            var that = this;
            this.get_my_courses(params)
            .then(function (data) {
                  console.log("get_my_courses then return:",data)
                  return that.get_my_course_info(data)
            }).then(function (data) {
                  console.log("get_my_course_info then return:", data)
                  // set data
                  that.data.column[0].option = data.data
                  that.setData(that.data)
            })
      },
      get_my_course_info(data) {
            console.log("get_my_course_info start ", data)
            console.log("get_my_course_info courses:  ", data.data[0].courses)
            return new Promise((resolve, reject) => {
                  const _ = app.db.command
                  resolve(app.db.collection('courses').field({
                        course_code: true,
                        course_name: true,
                        num_total_questions: true
                  }).where({
                        course_code: _.in(data.data[0].courses)
                  }).get())
            })
      },
      get_my_courses(params) {
            console.log("get_my_courses", params);
            console.log("loginInfo:", app.globalData.loginInfo);
            return new Promise((resolve, reject) => {
                  resolve(app.db.collection('users').field({
                        courses: true
                  }).where({
                        open_id: app.globalData.loginInfo.openid
                  }).get())
            })
      }
});