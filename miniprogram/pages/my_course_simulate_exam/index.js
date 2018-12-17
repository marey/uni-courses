//index.js
const utils = require('../../utils/utils.js');
//获取应用实例
var app = getApp();
Page({
      params: {

      },
      data: {
            hourLong: 45 * 60, //答题时长，单位秒
            time: '45:00', //答题时长，单位秒
            isLoading: false, //加载
            swiper: {
                  active: 0
            },
            layerlayer: {
                  isLayerShow: false, //默认弹窗
                  layerAnimation: {}, //弹窗动画
            },
            question: null,
            questions:[],
            active_index: 0,
            num_questions_total: 0,
            wx_storage_key: "course_questions"
      },
      //单选逻辑
      tapRadio: function(e) {
            var selected = e.currentTarget.dataset.option
            var answer = this.data.question.answer
            console.log("answer :", answer)
            var choices = this.data.question.choices.map(function (option, i) {
                  
                  option.selected = false
                  option.correct = false
                  if (selected == option.key) {
                        option.selected = true
                        console.log("equals :", selected, answer, option.key, selected ==  answer)
                        if (selected == answer) {
                              option.correct = true
                        }
                  }
                  return option
            });

            this.data.question.answered = true

            console.log("data   ",this.data)

            this.data.question.choices = choices
            this.data.questions[this.data.active_index] = this.data.question

            this.setData(this.data)

            // save data

            // save data
      },
      /**
       * 加载题库的数据
       */
      load_questions: function (questions) {
            var that = this

            that.data.isLoading = true
            // 绑定页面的长度
            that.data.num_questions_total = questions.length
            // all list
            that.data.questions = questions;

            // 输出日子
            console.log("load_questions:", questions)

            // 判断当前的长度
            if (questions.length > that.data.active_index) {
                  that.data.question = JSON.parse(JSON.stringify(questions[that.data.active_index]))
            } else {
                  // 判断是否是最后一个
                  if (that.data.active_index == that.length) {
                        // 准备交卷
                        // TODO
                  }
            }
            console.log("data result:", that.data)
            // 绑定列表
            that.setData(that.data)

          
      },

      onLoad(params) {
            // 初始化index
            this.data.active_index = 0
            // 如果获取不到数据，从网上获取，然后保存到本地
           
            try {
                  var data = {
                        course_code: params.course_code
                  }
                  var that = this

                  Promise.all([
                              app.biz.get_exam_question_list(data),
                              app.biz.get_user_collections(data)
                        ])
                        .then(function(values) {
                              console.log("on_load results:", values)
                              // 获取的考试的问题列表
                              var exam_questions = values[0]
                              var user_collections = values[1]
                              var questions = exam_questions.result.data

                              console.log("questions:", questions)
                              // 绑定数据
                              that.load_questions(questions)
                        })
            } catch (e) {
                  // Do something when catch error
            }
      },
      onHide() {
            clearInterval(this.swiperTime);
      },
      onUnload() { //页面卸载
            clearInterval(this.swiperTime);
      },
});