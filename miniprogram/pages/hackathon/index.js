//index.js
const app = getApp()
const https = require('../../public/js/douban.js');

Page({
      data: {
            username : '',
            location_country_name : '',
            time_zone_country_name : '',
            email : '',
            registration_date : ''
      },

      onLoad: function() {

            if (!wx.cloud) {
                  wx.redirectTo({
                        url: '../chooseLib/chooseLib',
                  })
                  return
            }

            // 获取用户信息
            wx.getSetting({
                  success: res => {
                        if (res.authSetting['scope.userInfo']) {
                              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                              wx.getUserInfo({
                                    success: res => {
                                          this.setData({
                                                avatarUrl: res.userInfo.avatarUrl,
                                                userInfo: res.userInfo
                                          })
                                    }
                              })
                        }
                  }
            })

            var headers = {
                  'freelancer-oauth-v1': 'xPwnoFFhceidy18X6mPxC6qEf497us'
            }
            wx.request({
                  url: 'https://www.freelancer-sandbox.com/api/users/0.1/self/',
                  header: headers,
                  method: 'GET',
                  success: res => {
                        console.log(res)
                        if (res.data.status == 'success') {
                              app.globalData.username = res.data.result.username
                              app.globalData.location_country_name = res.data.result.location.country.name
                              app.globalData.time_zone_country_name = res.data.result.timezone.country
                              app.globalData.email = res.data.result.email
                              app.globalData.registration_date = res.data.result.registration_date

                              var timestamp3 = res.data.result.registration_date;
                              var newDate = new Date();
                              newDate.setTime(timestamp3 * 1000);
                              this.setData({
                                    username: res.data.result.username,
                                    location_country_name: res.data.result.location.country.name,
                                    time_zone_country_name: res.data.result.timezone.country,
                                    email: res.data.result.email,
                                    registration_date: newDate.toDateString()
                              })
                        }
                  },
                  fail:res =>{
                        console.log(res)
                  }
            })
      },

      onGetUserInfo: function(e) {
            if (!this.logged && e.detail.userInfo) {
                  this.setData({
                        logged: true,
                        avatarUrl: e.detail.userInfo.avatarUrl,
                        userInfo: e.detail.userInfo
                  })
            }
      },
      // 寻找附近的Project
      onFindNearProjects:function() {
            wx.navigateTo({
                  url: '../hackathon_near_projects/near_projects',
            })
      },

      onGetOpenid: function() {
            // 调用云函数
            wx.cloud.callFunction({
                  name: 'login',
                  data: {},
                  success: res => {
                        console.log('[云函数] [login] user openid: ', res.result.openid)
                        app.globalData.openid = res.result.openid
                        wx.navigateTo({
                              url: '../userConsole/userConsole',
                        })
                  },
                  fail: err => {
                        console.error('[云函数] [login] 调用失败', err)
                        wx.navigateTo({
                              url: '../deployFunctions/deployFunctions',
                        })
                  }
            })
      },
})