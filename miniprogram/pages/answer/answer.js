const buss = require('../../utils/business_utils.js')
//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionInfo:{},
    questionIndexClass:"hidden",
    currentIndex:3,
    questionExplain:"",
    marginBottom: "",//marginBottom
    zzHidden:"hidden",
    touchStartX:0,
    touchEndY:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadQuestion(1);
  },
  showQuestionIndex:function(e){
    this.setData({ questionIndexClass: "", zzHidden:"" });
  },
  hiddenQuestionIndex:function(e){
    this.setData({
      questionIndexClass: "hidden",
      zzHidden: "hidden"
    });
  },
  selectQuestionIndex:function(e){
    this.setData({
      currentIndex: e.currentTarget.dataset.qid,
      questionIndexClass:"hidden",
      zzHidden:"hidden"
     });
  },
  touchStart(e) {
    // console.log(e)
    this.setData({
      "touchStartX": e.changedTouches[0].clientX,
      "touchEndY": e.changedTouches[0].clientY
    });
  },
  loadQuestion(id){
    buss.get_course_question_info({ id: id }).then(res => {
      this.setData({ questionInfo: res.data.data});
    })
    
  },
  touchEnd(e) {
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    let trunDir = this.getTouchData(x,y,this.touchStartX, this.touchEndY);
    console.info(trunDir);
    if (trunDir=='left' || trunDir == 'right'){
      this.loadQuestion(trunDir=='left'?1:2);
    }
  },
  /***
 * 判断用户滑动
 * 左滑还是右滑
 */
  getTouchData (endX, endY, startX, startY){
    let turn = "";
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
      turn = "right";
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
      turn = "left";
    }
    return turn;
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