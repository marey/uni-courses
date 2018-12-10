//login.js
//获取应用实例
var app = getApp();
Page({
      data: {
            remind: '加载中',
            angle: 0,
            userInfo: {}
      },
      goToIndex: function() {
            wx.navigateTo({
                  url: '/pages/my_courses/index',
            });
      },
      onLoad: function() {
            var that = this
            wx.setNavigationBarTitle({
                  title: wx.getStorageSync('mallName')
            })
      },
      onReady: function() {
            var that = this;
            setTimeout(function() {
                  that.setData({
                        remind: ''
                  });
            }, 1000);
            wx.onAccelerometerChange(function(res) {
                  var angle = -(res.x * 30).toFixed(1);
                  if (angle > 14) {
                        angle = 14;
                  } else if (angle < -14) {
                        angle = -14;
                  }
                  if (that.data.angle !== angle) {
                        that.setData({
                              angle: angle
                        });
                  }
            });
      },
      onGotUserInfo: function (e) {
            // 可以将 res 发送给后台解码出 unionId
            console.log(e)
            app.globalData.userInfo = e.detail.userInfo
            // 在小程序代码中：
            wx.cloud.callFunction({
                  name: 'login',
                  complete: res => {
                        console.log('callFunction login result: ', res)
                        app.globalData.loginInfo = res.result
                        // after login,bind db
                        app.db = wx.cloud.database({
                              env: 'uni-courses-59eab4'
                        })
                        // console.log(app.db)
                  },
            })
            // console.log('onGotUserInfo global: ', app.globalData)
            wx.switchTab({
                  url: '/pages/index/index',
            });
      },
});