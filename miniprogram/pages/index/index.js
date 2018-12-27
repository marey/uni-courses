//app.js
const utils = require('../../utils/utils.js')

const buss = require('../../utils/business_utils.js')

//index.js
//获取应用实例
var app = getApp();
Page({
      data: {
            swiper: {
                  imgUrls: [
                        'https://756e-uni-courses-59eab4-1258182215.tcb.qcloud.la/main_1.png?sign=17cae4d49b9c2da2f9585b40c4a8417e&t=1544407603',
                        '/images/main_2.jpeg',
                        '/images/main_3.png'
                  ],
                  indicatorDots: true,
                  autoplay: true,
                  interval: 5000,
                  duration: 1000
            },
            column: [{
                  class: 'num',
                  option: []
            }],
      },
      onLoad(params) {
            console.log("page load params:", params)

            var url = utils.getCurrentPageUrl()
            buss.get_pages_setting({
                        url: url
                  })
                  .then(res => {
                        console.log("get_pages_setting", res)
                        this.data.swiper = res.result.data[0].setting.swiper
                  })

            var that = this;

            // 获取新闻列表
            buss.get_news_list() 
            .then(
                  res => {
                        console.log("get_news_list", res)
                        that.data.column[0].option = res.data.data
                        that.setData(that.data);
                  }
            )
            /**
            wx.cloud.callFunction({
                  // 要调用的云函数名称
                  name: 'get_news_list',

            }).then(res => {
                  // output: res.result === 3
                  console.log('callFunction get_news_list result:', res.result);
                  // 绑定数据
                  that.data.column[0].option = res.result.data
                  that.setData(that.data);

            }).catch(err => {
                  console.error('callFunction get_news_list error：', err)
            })
             */
      }
});