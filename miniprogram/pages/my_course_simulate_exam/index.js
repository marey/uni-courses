//index.js
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
            answers: {
                  start: 0, //初始题号
                  allLists: [], //题号数据
                  active_question: null,
                  activeNum: 0, //当前条数
                  showActiveNum: 0, //当前显示条数
                  url: 'weixin/small/1.0/?m=SmallApp&c=weixin&a=getQuestion', //题目详情链接
                  isShowTip: false //默认是否显示提示
            }
      },
      //单选逻辑
      tapRadio: function(e) {
            //判断是否为已答题
            if (this.data.answers.allLists[this.data.answers.activeNum].isNoFirst) {
                  return false;
            }
            var thisOption = e.currentTarget.dataset.option,
                  list = this.data.answers.allLists[this.data.answers.activeNum].options.map(function(option, i) {
                        if (thisOption == option.tip) {
                              if (!option.isSelect) {
                                    // option.isActive = true;
                                    option.isSelect = true;
                              } else {
                                    // option.isActive = false;
                                    option.isSelect = false;
                              }
                        }
                        return option
                  });
            this.data.answers.allLists[this.data.answers.activeNum].options = list;
            this.tapSelect(e);
      },
      onLoad(params) {

            var that = this;

            var data = {
                  course_code: params.course_code
            }
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

                        that.data.isLoading = true
                        // 绑定列表
                        that.data.answers.allLists = questions
                        that.data.answers.active_question = JSON.parse(JSON.stringify(questions[that.data.answers.start]))
                        // 绑定列表
                        that.setData(that.data)

                        console.log("data result:", that.data)
                  })

      },
      onHide() {
            clearInterval(this.swiperTime);
      },
      onUnload() { //页面卸载
            clearInterval(this.swiperTime);
      }
});