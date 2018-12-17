function formatTime(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()

      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()

      return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
}

/*获取当前页url*/
function getCurrentPageUrl() {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length - 1] //获取当前页面的对象
      var url = currentPage.route //当前页面url
      return url
}
/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length - 1] //获取当前页面的对象
      var url = currentPage.route //当前页面url
      var options = currentPage.options //如果要获取url中所带的参数可以查看options
      //拼接url的参数
      var urlWithArgs = url + '?'
      for (var key in options) {
            var value = options[key]
            urlWithArgs += key + '=' + value + '&'
      }
      urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
      return urlWithArgs
}

//获得手势方向
function getDirection(startEvent, endEvent) {
      var x = endEvent.changedTouches[0].clientX - startEvent.changedTouches[0].clientX,
            y = endEvent.changedTouches[0].clientY - startEvent.changedTouches[0].clientY,
            pi = 360 * Math.atan(y / x) / (2 * Math.PI);
      if (pi < 25 && pi > -25 && x > 0 && Math.abs(x) > 10) {
            return 'right';
      }
      if (pi < 25 && pi > -25 && x < 0 && Math.abs(x) > 10) {
            return 'left';
      }
      if ((pi < -75 || pi > 750) && y > 0 && Math.abs(y) > 10) {
            return 'bottom';
      }
      if ((pi < -75 || pi > 75) && y < 0 && Math.abs(y) > 10) {
            return 'top';
      }
}

module.exports = {
      formatTime: formatTime,
      getCurrentPageUrl: getCurrentPageUrl,
      getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
      getDirection: getDirection
}