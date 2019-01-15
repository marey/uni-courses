// miniprogram/pages/source_select/sourceSelect.js
const buss = require('../../utils/business_utils.js')
var app = getApp();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    courses:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    buss.get_my_course_info({ openId: "ondUQ5RfEaWr8gOlHgkipkqOMNx0" }).then(res => {
      var datas = res.data.data;
      console.info(datas);
      if (datas.length > 0) {
        this.setData({ courses: datas });
      }
    })
  },
  selectCourse:function(e){
    app.globalData.currentCourse = { courseCode: e.currentTarget.dataset.courseCode, courseName: e.currentTarget.dataset.courseName };
    wx.navigateBack({ delta: 1});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})