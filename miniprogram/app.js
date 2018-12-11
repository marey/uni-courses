//app.js
const biz =  require('/utils/business_utils.js')

App({
      onLaunch: function() {

            if (!wx.cloud) {
                  console.error('请使用 2.2.3 或以上的基础库以使用云能力')
            } else {
                  wx.cloud.init({
                        env: 'uni-courses-59eab4',
                        traceUser: true,
                  })
            }
            /*
            // 展示本地存储能力
            var logs = wx.getStorageSync('logs') || []
            logs.unshift(Date.now())
            wx.setStorageSync('logs', logs)

            // 登录
            wx.login({
                  success: res => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  }
            })
            */
      },
      db: null,
      biz: biz,
      globalData: {
            userInfo: null
      }
})