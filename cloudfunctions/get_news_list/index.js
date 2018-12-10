// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/**
 * get user info
 */
function get_news_list(event) {

      console.log("get_news_list", event)

      // 获取上下文的关系
      const wxContext = cloud.getWXContext()

      // 可执行其他自定义逻辑
      const db = cloud.database({
            env: 'uni-courses-59eab4'
      })

      // 构造数据库参数
      where_params = {}

      // 判断是否将课程表的信息传入了进来，如果是，限定条件
      if (event.course_code != null) {
            // 课程代码
            where_params.course_code = event.course_code
      }

      // 返回获取到的结果
      console.log("query params:", where_params)

      // 等待数据返回
      return db.collection('news').where(where_params).get()
}

// 云函数入口函数
exports.main = async(event, context) => {
      // 返回列表
      return await get_news_list(event)
}