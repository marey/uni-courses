// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 可执行其他自定义逻辑
const db = cloud.database({
      env: 'uni-courses-59eab4'
})

/**
 *  
 */
function get_course_questions(params) {
      console.log("params", params)

      // 构造数据库参数
      where_params = {
            course_code: params.course_code
      }

      // 返回获取到的结果
      console.log("query params:", where_params)

      // 等待数据返回
      return db.collection("course_questions")
            .where(where_params)
            .get()
}

/**
 *  获取用户的收藏数据
 */
function get_user_collections(params) {

      /** 
      console.log("params", event)

      // 构造数据库参数
      where_params = {
            open_id: params.open_id, // 网页地址
            course_code: params.course_code
      }

      // 返回获取到的结果
      console.log("query params:", where_params)

      // 等待数据返回
      var result = db.collection("user_collections").where(where_params).get()
      console.log("query result:", result)

      return result
      */
      return new Promise((resolve, reject) => {
            resolve(cloud.callFunction({
                  // 要调用的云函数名称
                  name: 'get_user_collections',
                  data: params
            }))
      })
}

/**
 * 初始化考试界面的数据
 */
function get_exam_question_list(data) {

      console.log("get_exam_question_list params:", data)

      return new Promise((resolve, reject) => {

            Promise.all([
                        get_course_questions(data),
                        get_user_collections(data)
                  ])
                  .then(function(values) {
                        console.log("get_exam_question_list results:", values)

                        exam_questions = values[0]
                        user_collections = values[1]

                        var list = {};
                        list.data = [];
                        list.error = 0;
                        list.success = 0;
                        data.data.forEach(function(v, i) {
                              var a = {};
                              a.id = v._id; //题目ID
                              a.isAnswer = 0; //题目状态 0:未做，1：正确，2：错误
                              /**
                              if (control.isShowNewExam) { //判断是否显示后台答案统计
                                    a.isAnswer = v.answer || 0; //题目状态 0:未做，1：正确，2：错误
                                    if (!!a.isAnswer) { //初始位置
                                          list.activeNum = i + 1;
                                    }
                              }
                               */
                              // a.isNoFirst = (control.isNewExam && !!a.isAnswer); //当前题是否已答
                              // 默认没有答
                              a.isNoFirst = false

                              a.isStore = user_collections.includes(a.id)

                              /**
                              if (a.isAnswer == 1) { //对题
                                    list.success++;
                              } else if (a.isAnswer == 2) { //错题
                                    list.error++;
                              }
                              */

                              list.data.push(a)
                        })

                        /**
                        if (control.isShowNewExam && list.activeNum >= data.data.length - 1) {
                              list.activeNum = data.data.length - 1
                        }
                         */

                        // 返回最后的结果
                        resolve(list)
                  })
      })
}


// 云函数入口函数
exports.main = async(event, context) => {

      // 获取上下文的关系
      const wxContext = cloud.getWXContext()

      // 构造传入参数
      var params = {
            open_id: wxContext.OPENID, // 网页地址
            course_code: event.course_code
      }

      // 返回列表
      return await get_course_questions(params)
}