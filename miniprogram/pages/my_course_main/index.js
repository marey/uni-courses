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
            course_code: "GSOE9820",
            course_name: "Project Management",
            num_total_questions: 251, // 题目总数
            score_max: 0, // 最高得分
            num_collection: 0, //收藏题数
            num_wrong_answers: 0, //答错题数

            column: [{
                  class: 'num',
                  option: []
            }],
      },
      onLoad(params) {
            console.log("page load params:", params)
            var data = {
                  course_code: params.course_code
            }

            var that = this

            Promise.all([
                        app.biz.get_course_question_total_count(data), app.biz.get_user_exams_score_max(data), app.biz.get_user_collections_count(data), app.biz.get_user_wrong_answers_count(data),
                        app.biz.get_news_list(data)
                  ])
                  .then(function(values) {
                        // output: res.result === 3
                        console.log('Promise.all:', values);
                        that.data.num_total_questions = values[0].result.total
                        that.data.score_max = values[1].result.data[0].score_max
                        that.data.num_collection = values[2].result.total
                        that.data.num_wrong_answers = values[3].result.total
                        // 绑定数据
                        that.data.column[0].option = values[4].result.data
                        that.setData(that.data);
                  })
      },
      // 点击模拟考试，所出发的事件
      tapInletsMk(e) {
            var course_code = e.currentTarget.dataset.urlparem
            var url = '../../pages/answer_simulate_tip/simulate_tip?course_code=' 
            + course_code + '&type=mnks'
            wx.navigateTo({
                  url: url
            })
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