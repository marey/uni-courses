// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
      const wxContext = cloud.getWXContext()
      // TODO get the total count
      const db_connect = wx.cloud.database({
            env: 'uni-courses-59eab4'
      })

      // 直接查询数据
      return db_connect.collection('courses').where({
                  course_code: event.course_code,
            })
            .get()

}