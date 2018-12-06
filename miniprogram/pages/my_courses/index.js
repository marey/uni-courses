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
            // this.data.subject = params.subject;
            // this.data.type = params.type;
            // 云函数名称
            var that = this;
            wx.cloud.callFunction({
                  name: 'my_courses_list_get',
                  success: function(res) {
                        // console.log(res.result.data);
                        that.data.column[0].option = res.result.data;

                        that.setData(that.data);
                  },
                  fail: console.error
            })
      }
});