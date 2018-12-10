// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 可执行其他自定义逻辑
const db = cloud.database({
      env: 'uni-courses-59eab4'
})

// wx context
const wxContext = cloud.getWXContext()

// get my course info 
function get_user_answers_info(data) {
      // out put the params
      console.log("get_user_answers_info", data);

      return new Promise((resolve, reject) => {
            resolve(
                  db.collection('user_answers')
                  .where({
                        open_id: wxContext.OPENID, // 当前的open ID
                  })
                  .get()
            )
      })
}

// 导入新的数据
function load_user_answers_info(data) {
      new_record = {
            open_id: wxContext.OPENID,     // 用户open ID
            course_code: data.course_code,      // 课程编码
            score_max:0,                                   // 最高得分
            collections:[],                                  // 收藏的题库
            wrong_answers:[],                          // 错误的题库
            questions:[]                                    // 考试题
      }
      // 如果数据库没有当前的这些数据，
      if(data._id == null) {

      }
}

// 云函数入口函数
exports.main = async(event, context) => {
    

      return {
            event,
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
      }
}