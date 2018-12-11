//index.js
//获取应用实例
var app = getApp();

Page({
      data: {
            userInfo: null,
            // 课程编码
            course_code: '',
            type: 'mnks' //
      },
      onLoad(params) {
            console.log(" params:",params)
            this.data.course_code = params.course_code
            this.data.type = params.type
            this.data.userInfo = app.globalData.userInfo

            this.setData(this.data)
      }
});