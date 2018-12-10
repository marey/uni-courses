function get_news_list(data) {
      return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                  // 要调用的云函数名称
                  name: 'get_news_list',

            }).then(res => {
                  // output: res.result === 3
                  console.log('callFunction get_news_list result:', res.result);
                  resolve(res)

            }).catch(err => {
                  console.error('callFunction get_news_list error：', err)
                  reject(err)
            })
      })
}

function get_pages_setting(data) {
      return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                  // 要调用的云函数名称
                  name: 'get_pages_setting',
                  data: data
            }).then(res => {
                  // output: res.result === 3
                  console.log('callFunction get_pages_setting result:', res.result);
                  resolve(res)

            }).catch(err => {
                  console.error('callFunction get_pages_setting error：', err)
                  reject(err)
            })
      })
}

module.exports = {
      //获得登录数据
      get_news_list(data) {
            return get_news_list(data);
      },
      get_pages_setting: get_pages_setting
}