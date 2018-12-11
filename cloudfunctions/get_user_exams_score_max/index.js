// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
/**
 * get_user_exams_score_max
 */
function main(event) {

      console.log("get_pages_setting", event)

      // 获取上下文的关系
      const wxContext = cloud.getWXContext()

      // 可执行其他自定义逻辑
      const db = cloud.database({
            env: 'uni-courses-59eab4'
      })

      // 构造数据库参数
      where_params = {
            open_id: wxContext.OPENID, // 网页地址
            course_code:event.course_code
      }

      // 返回获取到的结果
      console.log("query params:", where_params)
      // 等待数据返回
      return db.collection("user_exams").where(where_params).get()
}

// 云函数入口函数
exports.main = async (event, context) => {
      // 返回列表
      return await main(event)
}