// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


/**
 * get user info
 */
function get_pages_setting(event) {

      console.log("get_pages_setting", event)

      // 获取上下文的关系
      const wxContext = cloud.getWXContext()

      // 可执行其他自定义逻辑
      const db = cloud.database({
            env: 'uni-courses-59eab4'
      })

      // 构造数据库参数
      where_params = { 
            url : event.url // 网页地址
      }

      // 返回获取到的结果
      console.log("query params:", where_params)
      // 等待数据返回
      return db.collection("pages_setting").where(where_params).get()
}

// 云函数入口函数
exports.main = async (event, context) => {
      // return directly
      if (event.url == null) {
            return []
      }
      // 返回列表
      return await get_pages_setting(event)
}