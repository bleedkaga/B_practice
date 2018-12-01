(function(){
  var datepicker = {};

  //获取月份数据
  datepicker.getMonthData = function(year, month){
    var ret = [];

    if(!year || !month) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() -1;
    }
    //获取当月第一天
    var firstDay = new Date(year, month - 1, 1);

    // 获取当月第一天是第几个工作日
    var firstDayWeekDay = firstDay.getDay();

    // 重置
    if(firstDayWeekDay === 0) firstDayWeekDay = 7;

    var lastDayOfLastMonth = new Date(year, month - 1, 0);
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
    var preMonthDayCount   = firstDayWeekDay - 1;
    var lastDay = new Date(year, month, 0)
    var lastDate = lastDay.getDate();

    for(var i = 0; i < 7 * 5; i++){
      var date = i + 1 - preMonthDayCount;
      var showDate = date;
      var thisMonth = month;

      if(date <= 0){
        // 上一个月
        thisMonth = month - 1;
        showDate  = lastDateOfLastMonth + date;
      } else if(date > lastDate) {
        // 下一个月
        thisMonth = month + 1;
        showDate  = showDate - lastDate;
      }

      if(thisMonth === 0) thisMonth = 12;
      if(thisMonth === 13) thisMonth = 1;

      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      })
    }

    return ret
  }



  window.datepicker = datepicker;
})(window)
