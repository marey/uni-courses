const buss = require('../../utils/business_utils.js')
//获取应用实例
var app = getApp();
Page({
      data: {
        course:{

        },
        column: [{
          class: 'num',
          option: []
        }],
      },
      onLoad(params) {
        
      },
      toSelectChapter(e){
        wx.navigateTo({
          url:"../chapter_select/chapterSelect?courseCode="+this.length
        }); 
      },
      onShow(){
        if (app.globalData.currentCourse.courseName){
          this.setData({course:app.globalData.currentCourse});
        }else{
          buss.get_my_course_info({ openId:"ondUQ5RfEaWr8gOlHgkipkqOMNx0"}).then(res => {
            var datas = res.data.data;
            if(datas.length>0){
              this.setData({course:datas[0]});
            }
          })
        }
      },
      get_my_course_info(data) {
            return new Promise((resolve, reject) => {
                  const _ = app.db.command
                  resolve(app.db.collection('courses').field({
                        course_code: true,
                        course_name: true,
                        num_total_questions: true
                  }).where({
                        course_code: _.in(data.data[0].courses)
                  }).get())
            })
      }
});