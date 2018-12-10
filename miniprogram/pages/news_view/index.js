//login.js
//获取应用实例
var app = getApp();
Page({
      data: {
            url:""
      },
      onLoad(params) {
            console.log(params)
            this.data.url = params.url
            this.setData(this.data)
      }
});