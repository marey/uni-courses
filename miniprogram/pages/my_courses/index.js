const buss = require('../../utils/business_utils.js')
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
        console.log(params.query);
        /*
            var that = this;
        buss.get_my_courses({ openId: 123})
            .then(function (data) {
                  console.log("get_my_courses then return:",data)
                  return that.get_my_course_info(data)
            }).then(function (data) {
                  console.log("get_my_course_info then return:", data)
                  // set data
                  that.data.column[0].option = data.data
                  that.setData(that.data)
            })*/
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
        buss.get_my_courses()
          .then(res => {
            that.data.column[0].option = res.data.data
            that.setData(that.data);
          })
      }
});