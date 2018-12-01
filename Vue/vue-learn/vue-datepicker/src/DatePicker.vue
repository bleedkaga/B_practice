<template>
  <div>
    <div class="date-picker">
      <div class="input" v-text="value" @click="panelState = !panelState"></div>
    </div>
    <div class="date-panel" v-show="panelState">

      <div class="panel-header" v-show="panelType !== 'year' ">
        <div class="arrow-left" @click="prevMonthPreview">&lt;</div>
        <div class="year-month-box">
          <div class="year-box" @click="chType('year')" v-text="tmpYear"></div>
          <div class="month-box" @click="chType('month')"> {{tmpMonth + 1 | month('en')}}</div>
        </div>
        <div class="arrow-right" @click="nextMonthPreview">&gt;</div>
      </div>

      <div class="panel-header" v-show="panelType === 'year' ">
        <div class="arrow-left" @click="chYearChange(0)">&lt;</div>
        <div class="year-range">
          <span v-text="yearList[0]"></span>
          -
          <span v-text="yearList[yearList.length - 1]"></span>
        </div>
        <div class="arrow-right" @click="chYearChange(1)">&gt;</div>
      </div>

      <div class="type-year" v-show="panelType === 'year' ">
        <ul class="year-list ">
          <li v-for="item in yearList"
              v-text="item"
              :class="{
                        selected: isSelected('year', item),
                        invalid: validateYear(item)
                      }"
              @click="selectedYear(item)"
          ></li>
        </ul>
      </div>

      <!-- 月份 -->
      <div class="type-month" v-show="panelType === 'month' ">
        <ul class="month-list">
          <li v-for="(item, index) in monthList"
              :class="{
                        selected: isSelected('month', index),
                        invalid: validateMonth(index)
                      }"
              @click="selectedMonth( index )"
          >

            {{item | month('ch')}}
            {{item, index}}
          </li>
        </ul>
      </div>

      <div class="type-date" v-show="panelType === 'date' ">
        <ul class="weeks">
          <li v-for="item in weekList">{{item | week('ch')}}</li>
        </ul>
        <ul class="date-list">
          <li v-for="item in dateList"
              v-text="item.value"
              :class="{ preMonth: item.previousMonth,
                        nextMonth: item.nextMonth,
                        selected: date === item.value && month === tmpMonth && item.currentMonth,
                        invalid: validateDate(item)
                      }"
              @click="selectDate(item)">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'datePicker',
    props: {
      language: {default: 'en'},
      min: {default: '1970-01-01'},
      max: {default: '3016-01-01'},
      value: {
          type: [String, Array],
          default: '请选择日期'
      },
      range: {
          type: Boolean,
          default: false
      }
    },
    data (){
      let now = new Date();
      return {
        panelState: false,
        date: '',
        yearList: Array.from({length: 12}, (value, index) => new Date().getFullYear() + index),
        tmpMonth: 12,
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        tmpYear: now.getFullYear(),
        tmpMonth: now.getMonth(),
        tmpDate: now.getDate(),
        panelType: 'date',
        minYear: Number,
        minMonth: Number,
        minDate: Number,
        maxYear: Number,
        maxMonth: Number,
        maxDate: Number,
        yearList: Array.from({length: 12}, (value, index) => new Date().getFullYear() + index),
        monthList: [1, 2, 3 ,4 ,5, 6, 7 ,8, 9, 10, 11, 12],
        weekList: [0, 1, 2, 3, 4, 5, 6],

      }
    },
    props: {
      value: String
    },
    computed: {


      dateList(){


        // 获取当月的天数
        let currentMonthLength = new Date(this.tmpMonth, this.tmpMonth + 1, 0).getDate();

        // 先将当月的日期塞入datelist;
        let dateList = Array.from({ length: currentMonthLength}, (val, index) => {
          return {
            currentMonth: true,
            value: index + 1
          }
        })
        // 获取当月1号的星期是为了确定在1号前需要插多少天
        console.log(this.tmpYear, this.tmpMonth, 1)
        let startDay = new Date(this.year, this.tmpMonth, 1).getDay();

        // 确认上个月一共多少天
        let previousMonthLength = new Date(this.year, this.tmpMonth, 0).getDate();
        console.log(startDay)
        // 在1号之前插入上个月日期
        for(let i = 0, len = startDay; i < len; i++){
          dateList = [{previousMonth: true, value: previousMonthLength - i}].concat(dateList)
        }

        // 补全剩余位置

        for(let i = dateList.length, item = 1; i < 42; i++, item++){
          dateList[dateList.length] = {nextMonth: true, value: i}
        }
        return dateList
      }
    },
    filters: {
      week: (item, lang) => {
        switch (lang) {
            case 'en':
                return {0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa'}[item]
            case 'ch':
                return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item]
            case 'uk':
                return {0: 'Пн', 1: 'Вт', 2: 'Ср', 3: 'Чт', 4: 'Пт', 5: 'Сб', 6: 'Нд'}[item]
            default:
                return item
        }
      },
      month: (item, lang) => {
        switch (lang) {
            case 'en':
                return {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
                 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}[item]
            case 'ch':
                return {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',
                 7: '七', 8: '八', 9: '九', 10: '十', 11: '十一', 12: '十二'}[item]
            case 'uk':
                return {1: 'Січень', 2: 'Лютий', 3: 'Березень', 4: 'Квітень', 5: 'Травень', 6: 'Червень',
                 7: 'Липень', 8: 'Серпень', 9: 'Вересень', 10: 'Жовтень', 11: 'Листопад', 12: 'Грудень'}[item]
            default:
                return item
        }
      }
    },
    methods: {
      prevMonthPreview(){
        this.tmpMonth = this.tmpMonth === 0 ? 0 : this.tmpMonth - 1;
      },
      nextMonthPreview(){
        this.tmpMonth = this.tmpMonth === 11 ? 11: this.tmpMonth + 1;
      },

      validateYear( year ){
        return (year > this.maxYear || year < this.minYear) ? true : false
      },
      togglePanel(){
        this.panelState = !this.panelState;
        this.rangeStart = false;
      },

      selectedYear(year){
        if(this.validateYear(year)) return;
        this.tmpYear = year;
        this.panelType = 'month';
      },

      selectedMonth(month){
        if(this.validateMonth(month)) return;
        this.tmpMonth = month;
        this.panelType = 'year'
      },

      // 是否选择
      isSelected( type, item){
        switch( type ){
          case 'year':
            if(!this.range) return item === this.tmpYear;
            return ( new Date( item, 0).getTime() >= new Date(this.tmpStartYear, 0).getTime()
                  && new Date( item, 0).getTime() <= new Date(this.tmpEndYear, 0).getTime());

          case 'month':
            if(!this.range) return item === this.tmpMonth && this.year === this.tmpYear;
            return (new Date(this.tmpYear, item).getTime() >= new Date(this.tmpStartYear, this.tmpStartMonth).getTime()
                  && new Date(this.tmpYear, item).getTime() <= new Date(this.tmpEndYear, this.tmpEndMonth).getTime());

          case 'date':
            if(!this.range) return item === this.tmpDate && this.month === tmpDate && item.currentMonth;
            let month = this.tmpMonth;
            item.previousMonth && month ++;
            item.nextMonth && month++
            return (new Date(this.tmpYear, month, item.value).getTime() >= new Date(this.tmpStartYear, this.tmpStartMonth, this.tmpStartDate).getTime()
                  && new Date(this.tmpYear, month, item.value).getTime() <= new Date(this.tmpEndYear, this.tmpEndMonth, this.tmpEndDate).getTime())
        }
      },
      chType( type ){
        this.panelType = type;
      },
      chYearChange(next){
        if(next){
          this.yearList = this.yearList.map( i => i + 12)
        } else {
          this.yearList = this.yearList.map( i => i - 12)
        }
      },
      // 验证月份
      validateMonth(month){
        let validMonth = new Date(this.tmpYear, month).getTime() >= new Date(this.minYear, this.minMonth - 1).getTime()
                          && new Date(this.tmpYear, month).getTime() <= new Date(this.maxYear, this.maxMonth - 1).getTime();
        if( validMonth ) return false;

        return true;
      },
      validateDate (date) {
          let mon = this.tmpMonth
          if(date.previousMonth){
              mon -= 1
          }else if(date.nextMonth){
              mon += 1
          }
          console.log('year, '+this.minYear, this.minMonth, this.minDate)
          console.log('mon:'+new Date(this.minYear, this.minMonth, this.minDate).getTime())
          if(new Date(this.tmpYear, mon, date.value).getTime() >= new Date(this.minYear, this.minMonth - 1, this.minDate).getTime()
              && new Date(this.tmpYear, mon, date.value).getTime() <= new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()){
              return false
          }
          return true
      },
      // validateDate( date ){
      //   let mon = this.tmpMonth;
      //   if(date.previousMonth){
      //     mon -= 1
      //   } else if(date.nextMonth) {
      //     mon += 1
      //   }

      //   // if(new Date(this.tmpYear, mon, date.value).getTime() >= new Date(this.minYear, this.minMonth - 1, this.minDate).getTime() && new Date(this.tmpYear, mon, date.value).getTime() <= new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()){
      //   //   return false
      //   // }
      //    if(new Date(this.tmpYear, mon, date.value).getTime() >= new Date(this.minYear, this.minMonth - 1, this.minDate).getTime()
      //         && new Date(this.tmpYear, mon, date.value).getTime() <= new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()){
      //         return false
      //     }
      //   return true
      // },
      close(e){
        if(!this.$el.contains(e.target)){
          this.panelState = false;
          this.rangeStart = false;
        }
      },
      clear(){
        this.$emit('input', this.range ? ['', ''] : '')
      }
    }

  }
</script>
<style type="text/css">
  *{
    margin:0;
    padding:0;
  }
  .date-list{
    width: 400px;
  }
  .date-list {

  }
  ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.date-picker {
  position: relative;
  height: 32px;
}
.date-picker .input{
  border: 1px solid #ddd;
  border-radius: 4px;
}
.input-wrapper {
  border: 1px solid #ccc;
  border-radius: 2px;
  vertical-align: middle;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row nowrap;
          flex-flow: row nowrap;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  padding: 6px 10px 6px 4px;
  height: 32px;
  box-sizing: border-box;
}
.input {
  height: 100%;
  width: 100%;
  font-size: inherit;
  padding-left: 4px;
  box-sizing: border-box;
  outline: none;
}
.cancel-btn {
  height: 14px;
  width: 14px;
}
.date-panel {
  position: absolute;
  z-index: 5000;
  border: 1px solid #eee;
  width: 320px;
  padding: 5px 10px 10px;
  box-sizing: border-box;
  background-color: #fff;
  -webkit-transform: translateY(4px);
          transform: translateY(4px);
}
.panel-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row nowrap;
          flex-flow: row nowrap;
  width: 100%;
}
.arrow-left,
.arrow-right {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  font-size: 20px;
  line-height: 2;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
}
.year-range {
  font-size: 20px;
  line-height: 2;
  -webkit-box-flex: 3;
      -ms-flex: 3;
          flex: 3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.year-month-box {
  -webkit-box-flex: 3;
      -ms-flex: 3;
          flex: 3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row nowrap;
          flex-flow: row nowrap;
  -ms-flex-pack: distribute;
      justify-content: space-around;
}
.type-year,
.type-month,
.date-list {
  background-color: #fff;
}
.year-box,
.month-box {
  transition: all ease .1s;
  font-family: Roboto, sans-serif;
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  text-align: center;
  font-size: 20px;
  line-height: 2;
  cursor: pointer;
  background-color: #fff;
}
.year-list,
.month-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.year-list li,
.month-list li {
  font-family: Roboto, sans-serif;
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  width: 33%;
  padding: 10px 0;
}
.year-list li:hover,
.month-list li:hover {
  background-color: #6ac1c9;
  color: #fff;
}
.year-list li.selected,
.month-list li.selected {
  background-color: #0097a7;
  color: #fff;
}
.year-list li.invalid,
.month-list li.invalid {
  cursor: not-allowed;
  color: #ccc;
}
.date-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.date-list .valid:hover {
  background-color: #eee;
}
.date-list li {
  transition: all ease .1s;
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  position: relative;
  margin: 2px;
}
.date-list li:not(.firstItem) {
  margin-left: 0;
}
.date-list li .message {
  font-family: Roboto, sans-serif;
  font-weight: 300;
  font-size: 14px;
  position: relative;
  height: 30px;
}
.date-list li .message.selected .bg {
  background-color: #0097a7;
}
.date-list li .message.selected span {
  color: #fff;
}
.date-list li .message:not(.selected) .bg {
  -webkit-transform: scale(0);
          transform: scale(0);
  opacity: 0;
}
.date-list li .message:not(.selected):hover .bg {
  background-color: #0097a7;
  -webkit-transform: scale(1);
          transform: scale(1);
  opacity: .6;
}
.date-list li .message:not(.selected):hover span {
  color: #fff;
}
.date-list li .message .bg {
  height: 30px;
  width: 100%;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
}
.date-list li .message span {
  position: absolute;
  z-index: 20;
  left: 50%;
  top: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
          transform: translate3d(-50%, -50%, 0);
}
.date-list li.invalid {
  cursor: not-allowed;
  color: #ccc;
}
.weeks {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.weeks li {
  font-weight: 600;
}
.weeks,
.date-list {
  width: 100%;
  text-align: center;
}
.weeks .preMonth,
.date-list .preMonth,
.weeks .nextMonth,
.date-list .nextMonth {
  color: #ccc;
}
.weeks li,
.date-list li {
  font-family: Roboto;
  width: 40px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.toggle-enter,
.toggle-leave-active {
  opacity: 0;
  -webkit-transform: translateY(-10px);
          transform: translateY(-10px);
}
.toggle-enter-active,
.toggle-leave-active {
  transition: all ease .2s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  -webkit-transform: scale3d(0, 0, 0);
          transform: scale3d(0, 0, 0);
}
.fade-enter-active,
.fade-leave-active {
  transition: all ease .1s;
}
</style>
