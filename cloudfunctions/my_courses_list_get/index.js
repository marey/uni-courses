// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
exports.main = async(event, context) => {
      var course_code = event.course_code;
      // check if course request 
      // if not ,all records return;
      if (course_code == '') {
            try {
                  return await db.collection('courses').field({
                        course_code: true,
                        course_name: true,
                        num_collection: true,
                        num_total_questions: true,
                        num_wrong_answer: true,
                        score_max: true
                  }).get()
            } catch (e) {
                  console.error(e)
            }
      } else {
            try {
                  return await db.collection('courses').field({
                        course_code: true,
                        course_name: true,
                        num_collection: true,
                        num_total_questions: true,
                        num_wrong_answer: true,
                        score_max: true
                  }).where({
                        // where
                        course_code: course_code
                  }).get()

            } catch (e) {
                  console.error(e)
            }
      }
}