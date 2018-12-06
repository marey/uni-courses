//app.js
const https = require('../../public/js/douban.js');

if (!Object.assign) {
      Object.assign = require('public/core/object-assign.js')
}

//index.js
//获取应用实例
var app = getApp();
Page({
      data: {
            swiper: {
                  imgUrls: [
                        '/images/main_1.png',
                        '/images/main_2.jpeg',
                        '/images/main_3.png'
                  ],
                  indicatorDots: true,
                  autoplay: false,
                  interval: 5000,
                  duration: 1000
            },
            examInlets: [{
                  course_code :"GSOE9820",
                  course_name :"Project Management",
                  ques_count: 251, // 题目总数
                  score_max: 0, // 最高得分
                  num_collection: 0, //收藏题数
                  num_wrong_answer: 0, //答错题数
            }]
      },
      // tabl 的select跳转事件
      tapInletsMk(e) {
            var subject = e.currentTarget.dataset.urlparem;
            wx.navigateTo({
                  url: `../../pages/answer_simulate_tip/simulate_tip?subject=kemu1&type=mnks`
            })
            // }
      },
      // 点击收藏按钮，所触发的事件
      tapInletsSC: function(e) {
            var that = this,
                  subject = e.currentTarget.dataset.urlparem,
                  collection = e.currentTarget.dataset.collection - 0;
            if (!!collection) {
                  wx.navigateTo({
                        url: `../../pages/answer_info/info?subject=${subject}&type=wdsc`
                  })
            } else {
                  if (!app.globalData.hasLogin) {
                        wx.showModal({
                              title: '提示',
                              content: '您未登录，无法看到收藏',
                              showCancel: true,
                              cancelText: '知道了',
                              cancelColor: '#00bcd5',
                              confirmText: '去登录',
                              confirmColor: '#00bcd5',
                              success: function(res) {

                              }
                        })
                  } else {
                        wx.showModal({
                              title: '提示',
                              content: '未发现您的收藏',
                              showCancel: false,
                              confirmText: '知道了',
                              confirmColor: '#00bcd5',
                              success: function(res) {

                              }
                        })
                  }
            }
      },
      tapInletsCT: function(e) {
            var subject = e.currentTarget.dataset.urlparem,
                  answerError = e.currentTarget.dataset.answererror - 0;
            if (!!answerError) {
                  wx.navigateTo({
                        url: `../../pages/answer_info/info?subject=${subject}&type=wdct`
                  })
            } else {
                  if (!app.globalData.hasLogin) {
                        wx.showModal({
                              title: '提示',
                              content: '您未登录，无法看到错题',
                              showCancel: true,
                              cancelText: '知道了',
                              cancelColor: '#00bcd5',
                              confirmText: '去登录',
                              confirmColor: '#00bcd5',
                              success: function(res) {

                              }
                        })
                  } else {
                        wx.showModal({
                              title: '提示',
                              content: '恭喜您，暂无错题。',
                              showCancel: false,
                              confirmText: '知道了',
                              confirmColor: '#00bcd5',
                              success: function(res) {

                              }
                        })
                  }
            }
      }
});