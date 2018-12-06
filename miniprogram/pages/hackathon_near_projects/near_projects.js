// pages/userConsole/userConsole.js
//地图功能单独拿出来 -xzz1023
var village_LBS = function (that) {
      wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                  
                  const latitude = res.latitude
                  const longitude = res.longitude
                  const speed = res.speed
                  const accuracy = res.accuracy

                  console.log(latitude)
                  console.log(longitude)

                  that.setData({
                      longitude:longitude,
                        latitude:latitude,
                        markers: [{
                              iconPath: "/images/current_location.png",
                              id: 0,
                              latitude: -33.9074592590332,
                              longitude: 151.22860717773438,
                              width: 50,
                              height: 50,
                              callout: {
                                    content: "ProjectId0",
                                     fontSize: "16",
                                    borderRadius: "10",
                                     bgColor: "#ffffff",
                                     padding: "10",
                                     display: "ALWAYS"
                               }
                        }, {
                                    iconPath: "/images/current_location.png",
                                    id: 1,
                                    latitude: -33.91,
                                    longitude: 151.22,
                                    width: 50,
                                    height: 50, 
                                    callout: {
                                          content: "ProjectId 2222",
                                          fontSize: "16",
                                          borderRadius: "10",
                                          bgColor: "#ffffff",
                                          padding: "10",
                                          display: "ALWAYS"
                                    }
                              }, {
                                    iconPath: "/images/target_location.png",
                                    id: 2,
                                    latitude: - 33.94,
                                    longitude: 151.23,
                                    width: 50,
                                    height: 50
                              }],
                        circles: [{
                              latitude: latitude,
                              longitude: longitude,
                              color: '#FF0000DD',
                              fillColor: '#7cb5ec88',
                              radius: 500,
                              strokeWidth: 1
                        }]
                  })
            }
      })
}

Page({

      data: {
            openid:'',
            longitude:'',
            latitude:'',
            markers: [],
            polyline: [],
            controls: [],
            circles: []
      },
      callouttap(e) {
            wx.redirectTo({
                  url: '../chooseLib/chooseLib?' + e.markerId,
            })
      },
      onReady: function() {
            var that = this;
            wx.getSetting({
                  success: (res) => {
                        console.log(res.authSetting['scope.userLocation']);
                        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
                              wx.showModal({
                                    title: '是否授权当前位置',
                                    content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                                    success: function(res) {
                                          if (res.cancel) {
                                                console.info("1授权失败返回数据");

                                          } else if (res.confirm) {
                                                //village_LBS(that);
                                                wx.openSetting({
                                                      success: function(data) {
                                                            if (data.authSetting["scope.userLocation"] == true) {
                                                                  wx.showToast({
                                                                        title: '授权成功',
                                                                        icon: 'success',
                                                                        duration: 5000
                                                                  })

                                                                  village_LBS(that)

                                                            } else {
                                                                  wx.showToast({
                                                                        title: '授权失败',
                                                                        icon: 'success',
                                                                        duration: 5000
                                                                  })
                                                            }
                                                      }
                                                })
                                          }
                                    }
                              })
                        } else if (res.authSetting['scope.userLocation'] == undefined) { //初始化进入
                              // village_LBS(that);
                        }
                  }
            })
      },

      onLoad: function(options) {
            var that = this;
            village_LBS(that);
      }
})