<!--
 * @Author: lixiaoyu
 * @Date: 2020-11-09 11:54:56
 * @LastEditors: lixiaoyu
 * @LastEditTime: 2020-11-11 21:08:16
-->
<template>
  <div class="ca_con" v-if="isVisible">
    <div class="ca_con_bg" @click="isVisible = false"></div>
    <div class="ca_con_dialog" :style="{width: dialogWidth + 'px', height: dialogHeight + 'px'}">
      <div class="ca_con_dialog_top">
        <div class="ca_con_dialog_top_item left">
          <div @click="onPrevYear" :disabled="prevYearDisabled">
            <img src="../assets/prev_icon@2x.png" alt="">
          </div>
          <div class="ca_con_dialog_top_item_text">{{ _day.year }} 年</div>
          <div @click="onNextYear" :disabled="nextYearDisabled">
            <img src="../assets/next_icon@2x.png" alt="">
          </div>
        </div>
        <div class="ca_con_dialog_top_item right">
          <div @click="onPrevMonth" :disabled="prevMonthDisabled">
            <img src="../assets/prev_icon@2x.png" alt="">
          </div>
          <div class="ca_con_dialog_top_item_text">{{ _day.month }} 月</div>
          <div @click="onNextMonth" :disabled="nextMonthDisabled">
            <img src="../assets/next_icon@2x.png" alt="">
          </div>
        </div>
      </div>
      <div class="ca_con_dialog_middle">
        <div v-for="(item, index) in weekContrast" :key="index">{{item}}</div>
      </div>
      <Swiper class="ca_con_dialog_bottom" ref="mySwiper">
        <swiper-slide v-for="(monthItem, index) in monthCalendar" :key="index" >
          <div class="swiper_slide_con">
            <div class="swiper_slide_con_day" v-for="(dayItem, idx) in monthItem" :key="idx">
              <div :class="dayItem.status === 'visible' ? 'hide' : ''">{{ dayItem.day }}</div>
            </div>
          </div>
        </swiper-slide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import { formatTime, timeTransform, timeTransformParse, formatNumber, buttonClickedFn } from '../utils/index'
import 'swiper/swiper-bundle.css'
export default {
  name: 'calendar',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    dialogWidth: {
      type: Number,
      default: 400
    },
    dialogHeight: {
      type: Number,
      default: 320
    },
    firstDay: {
      type: String,
      default: '2020-01-01'
    },
    lastDay: {
      type: String,
      default: '2030-12-31'
    }, 
    highlightList: {
      type: Array,
      default: () => {return []}
    },
    currentDate: {
      type: String,
      default: ''
    },
  },
  watch: {
    isShow (val) {
      this.isVisible = val
    },
    isVisible (val) {
      if (!val) {
        this.$emit('handleClose', val)
      }
    }
  },
  data () {
    return {
      isVisible: this.isShow,
      weekContrast: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      _today: null, //当天
      _day: null, //日历状态
      _range: [], //当前选择范围
      options: {
        isRange: false, //是否选择范围
        limitRange: [], //有效选择区域的范围
        highlightRange: [], //指定日期范围高亮
      },
      monthCalendar: [], //月数据列表
      monthCalendarIndexArr: [],
      monthCurrent: 0, //月当前索引
      monthCircular: true, //是否采用衔接滑动
      monthMoveAction: {
        direction: ''
      },
      clientX: 0,
      clientY: 0,

      firstDayParse: null,
      lastDayParse: null,
      startYearFirstDay: null,
      endYearLastDay: null,
      localCurrentDateParse: null,
      prevMonthDisabled: false,
      nextMonthDisabled: false,
      prevYearDisabled: false,
      nextYearDisabled: false,
    }
  },
  methods: {
    //初始化数据
    initData() {
      let firstDate = new Date(this.firstDay)
      let lastDate = new Date(this.lastDay)
      let currentDateTime = new Date(this.currentDate)

      this.firstDayParse = this.getDateObj(firstDate.getFullYear(), firstDate.getMonth() + 1, firstDate.getDate())
      this.lastDayParse = this.getDateObj(lastDate.getFullYear(), lastDate.getMonth() + 1, lastDate.getDate())
      // 年 开始于结束区间
      this.startYearFirstDay = this.getDateObj(firstDate.getFullYear(), 1, 1);
      this.endYearLastDay = this.getDateObj(lastDate.getFullYear(), 12, this.getMonthDays({ year: lastDate.getFullYear(), month: 12 }));
      // console.log(this.startYearFirstDay, this.endYearLastDay)
      this._today = this.getDateObj()
      this.options.limitRange = [
        [timeTransformParse(this.firstDay), this._today.code]
      ]
      
      this.localCurrentDateParse = this.getDateObj(currentDateTime.getFullYear(), currentDateTime.getMonth() + 1, currentDateTime.getDate())
      this._day = { 'year': this.localCurrentDateParse['year'], 'month': this.localCurrentDateParse['month'] }
      this.format(this._day)
    },
    /**
     * [getDateObj 获取日期数据]
     * @param  {[Number]} year  [年]
     * @param  {[Number]} month [月]
     * @param  {[Number]} day   [日]
     * @return {[Object]}       [{year: 2020, month: 8, day: 6, week: 4, code: "20200806"}]
     */
    getDateObj(year, month, day) {
      var date = arguments.length && year ? new Date(year, month - 1, day) : new Date();
      var obj = {
        'year': date.getFullYear(),
        'month': date.getMonth() + 1,
        'day': date.getDate(),
        'week': date.getDay(),
        'getTime': date.getTime()
      };
      obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
      return obj;
    },
    /**
     * [getMonthDays 获取当月天数]
     * @param  {[Object]} obj [{year: 2020, month: 8}]
     * @return {[Number]}     [31 返回某月的天数]
     */
    getMonthDays(obj) {
      var day = new Date(obj.year, obj.month, 0);
      return day.getDate();
    },
    format(obj) {
      if (typeof obj == 'undefined') {
        obj = this._today
      }

      var data
      if (obj['month'] < 1) {
        obj['year']--
        obj['month'] += 12
      } else if (obj['month'] > 12) {
        obj['year']++
        obj['month'] -= 12
      }

      //得到当前选择月前后偏移月
      let firstOffsetDay = new Date(obj['year'], obj['month'] - 1 - 1, 1);
      let lastOffsetDay = new Date(obj['year'], obj['month'] - 1 + 1, 1);
      let currentMFirstDate = new Date(obj['year'], obj['month'] - 1, 1); //得到当前月第一天数据

      // 月偏移
      let firstOffsetDayParse = this.getDateObj(firstOffsetDay.getFullYear(), firstOffsetDay.getMonth() + 1, 1);
      let lastOffsetDayParse = this.getDateObj(lastOffsetDay.getFullYear(), lastOffsetDay.getMonth() + 1, 1);
      let currentMFirstDateParse = this.getDateObj(currentMFirstDate.getFullYear(), currentMFirstDate.getMonth() + 1, 1);
      let firstRangeDayParse = this.getDateObj(this.firstDayParse['year'], this.firstDayParse['month'], 1);
      let lastRangeDayParse = this.getDateObj(this.lastDayParse['year'], this.lastDayParse['month'], 1);
      // console.log(this.firstDayParse, firstRangeDayParse)

      if (firstOffsetDayParse.getTime < firstRangeDayParse.getTime) {
        firstOffsetDayParse = firstRangeDayParse
      }
      if (lastOffsetDayParse.getTime > lastRangeDayParse.getTime) {
        lastOffsetDayParse = lastRangeDayParse
      }

      let monthWrapIndexList = []

      let beingDay = firstOffsetDayParse.code; //得到缓存

      for (; beingDay !== lastOffsetDayParse.code;) {
        monthWrapIndexList.push(beingDay);
        const generateDay = new Date(timeTransform(beingDay));
        generateDay.setMonth(generateDay.getMonth() + 1);
        beingDay = timeTransformParse(formatTime(generateDay, 'yyyy-MM-dd'));
      }
      monthWrapIndexList.push(beingDay);
      //生成浮动月
      let monthWrapDataList = []
      monthWrapIndexList.forEach(item => {
        let itemMonth = new Date(timeTransform(item))
        monthWrapDataList.push(this.getData({ 'year': itemMonth.getFullYear(), 'month': itemMonth.getMonth() + 1 }))
      })

      let pDayIndex = 0; //得到当前月在 所有月数组中的索引

      if (this.monthCalendarIndexArr.length) {
        pDayIndex = this.monthCalendarIndexArr.findIndex(b => b === currentMFirstDateParse.code)
      }
      let handleDay = 0
      let computeDay = []
      let computeIndex = []

      let dayDataListLength = monthWrapIndexList.length; //月数组长度

      // 如果参数时间等于最后偏移
      if (currentMFirstDateParse.code === lastOffsetDayParse.code) {
        handleDay = monthWrapIndexList.length;
        this.monthCurrent = monthWrapIndexList.length - 1;
      } else if (currentMFirstDateParse.code === firstOffsetDayParse.code) {
        handleDay = 0;
        this.monthCurrent = 0;
      } else {
        handleDay = pDayIndex - monthWrapIndexList.findIndex(item => item === currentMFirstDateParse.code)
      }
      //当前月第一天不等于设定值设为可无缝滑动
      if (currentMFirstDateParse.code !== firstRangeDayParse.code && currentMFirstDateParse.code !== lastRangeDayParse.code) {
        this.monthCircular = true;
      } else {
        this.monthCircular = false;
      }
      let prevYearFirstDay = this.getDateObj(this._day['year'] - 1, 1, 1); //上一年第一天
      let nextYearFirstDay = this.getDateObj(this._day['year'] + 1, 12, this.getMonthDays({ year: this._day['year'] + 1, month: 12 })); //下一年最后一天
      
      if (prevYearFirstDay.getTime < this.startYearFirstDay.getTime) {
        this.prevYearDisabled = true
      } else if (nextYearFirstDay.getTime > this.endYearLastDay.getTime) {
        this.nextYearDisabled = true
      } else {
        this.prevYearDisabled = false
        this.nextYearDisabled = false
      }

      if (currentMFirstDateParse.code === firstRangeDayParse.code) {
        this.prevMonthDisabled = true
      } else if (currentMFirstDateParse.code === lastRangeDayParse.code) {
        this.nextMonthDisabled = true
      } else {
        this.prevMonthDisabled = false
        this.nextMonthDisabled = false
      }
      
      monthWrapIndexList.forEach((item, index) => {
        if (0 > handleDay) {
          computeDay[dayDataListLength + handleDay] = monthWrapDataList[index]
          computeIndex[dayDataListLength + handleDay] = monthWrapIndexList[index]
        } else if (handleDay > dayDataListLength - 1) {
          computeDay[handleDay - dayDataListLength] = monthWrapDataList[index]
          computeIndex[handleDay - dayDataListLength] = monthWrapIndexList[index]
        } else {
          computeDay[handleDay] = monthWrapDataList[index]
          computeIndex[handleDay] = monthWrapIndexList[index]
        }
        handleDay++;
      });
      /*
      如果当前选中日期不等于浮动开始和浮动结束时间
      查出当前正确索引
       */
      if (currentMFirstDateParse.code !== firstOffsetDayParse.code && currentMFirstDateParse.code !== lastOffsetDayParse.code) {
        for (let i = 0; i < computeIndex.length; i++) {
          if (computeIndex[i] === currentMFirstDateParse.code) {
            this.monthCurrent = i;
            break;
          }
        }
      }
      this.monthCalendar = computeDay
      this.monthCalendarIndexArr = computeIndex
      this._day = { 'year': obj['year'], 'month': obj['month'] }
    },
    /**
     * [getData 获取某月信息]
     * @param  {[Object]} obj [{year: 2020, month: 8} 对象包含年月信息数据]
     * @return {[Array]}     [返回一个月数据]
     */
    getData(obj) {
      var first = this.getDateObj(obj['year'], obj['month'], 1); //当月第一天
      var days = this.getMonthDays(first); //当月天数
      var data = []; //日历信息
      var obj = {};
      //上月日期
      for (var i = first['week']; i > 0; i--) {
        obj = this.getDateObj(first['year'], first['month'], first['day'] - i);
        var info = this.getDateInfo(obj);
        info['status'] = 'visible';
        data.push(info);
      }
      //当月日期
      for (var i = 0; i < days; i++) {
        obj = {
          'year': first['year'],
          'month': first['month'],
          'day': first['day'] + i,
          'week': (first['week'] + i) % 7
        };
        obj['code'] = '' + obj['year'] + (obj['month'] > 9 ? obj['month'] : '0' + obj['month']) + (obj['day'] > 9 ? obj['day'] : '0' + obj['day']);
        var info = this.getDateInfo(obj);
        data.push(info);
      }
      //下月日期
      var last = obj;
      for (var i = 1; last['week'] + i < 7; i++) {
        obj = this.getDateObj(last['year'], last['month'], last['day'] + i);
        var info = this.getDateInfo(obj);
        info['status'] = 'visible';
        data.push(info);
      }
      return data;
    },
    /**
     * [getDateInfo 获取某天日期信息]
     */
    getDateInfo(obj) {
      if (this.options.limitRange.length) {
        obj['status'] = 'disabled';
        for (var i = 0; i < this.options.limitRange.length; i++) {
          var start = this.options.limitRange[i][0];
          var end = this.options.limitRange[i][1];
          if (start == 'today') {
            start = this._today['code'];
          }
          if (end == 'today') {
            end = this._today['code'];
          }
          if (start > end) {
            start = [end, end = start][0];
          }
          if (obj['code'] >= start && obj['code'] <= end) {
            obj['status'] = '';
            break;
          }
        }
      }
      obj['sign'] = [];
      if (this.options.highlightRange.length) {
        for (var i = 0; i < this.options.highlightRange.length; i++) {
          var start = this.options.highlightRange[i][0];
          var end = this.options.highlightRange[i][1];
          if (start == 'today') {
            start = this._today['code'];
          }
          if (end == 'today') {
            end = this._today['code'];
          }
          if (start > end) {
            start = [end, end = start][0];
          }
          if (obj['code'] >= start && obj['code'] <= end) {
            obj['sign'].push('highlight');
            break;
          }
        }
      }
      if (this.highlightList.length) {
        for (var i = 0; i < this.highlightList.length; i++) {
          if (obj['code'] == timeTransformParse(this.highlightList[i])) {
            obj['active'] = 'active';
            break;
          }
        }
      }
      if (obj['code'] == this._today['code']) {
        obj['sign'].push('today');
      }
      if (obj['code'] == this.localCurrentDateParse['code']) {
        obj['status'] = 'selected';
      }
      return obj;
    },
    onPrevMonth() {
      let prevMonthFirstDay = this.getDateObj(this._day['year'], this._day['month'] - 1, 1); //上个月第一天
      if (prevMonthFirstDay.getTime < this.startYearFirstDay.getTime) {
        alert('敬请期待')
        return
      }
      this._day['month']--
      this.format(this._day)
    },
    onNextMonth() {
      let nextMonthFirstDay = this.getDateObj(this._day['year'], this._day['month'] + 1, this.getMonthDays({ year: this._day['year'], month: this._day['month'] + 1 })); //下个月最后一天
      if (nextMonthFirstDay.getTime > this.endYearLastDay.getTime) {
        alert('敬请期待')
        return
      }
      this._day['month']++
      this.format(this._day)
    },
    onPrevYear() {
      let prevYearFirstDay = this.getDateObj(this._day['year'] - 1, 1, 1); //上一年第一天
      if (prevYearFirstDay.getTime < this.startYearFirstDay.getTime) {
        alert('敬请期待')
        return
      }
      this._day['year']--
      this.format(this._day)
    },
    onNextYear() {
      let nextYearFirstDay = this.getDateObj(this._day['year'] + 1, 12, this.getMonthDays({ year: this._day['year'] + 1, month: 12 })); //下一年最后一天
      if (nextYearFirstDay.getTime > this.endYearLastDay.getTime) {
        alert('敬请期待')
        return
      }
      this._day['year']++
      this.format(this._day)
    },
    handleClickSlide (a, b) {
      console.log(a, b)
    }
  },
  mounted () {
    this.initData()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ca_con {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  &_bg {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .3;
    position: fixed;
    top: 0;
    left: 0;
  }
  &_dialog {
    background: #fff;
    position: relative;
    z-index: 10;
    border-radius: 15px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    display: flex;
    flex-direction: column;
    &_top {
      width: 86%;
      height: 25%;
      display: flex;
      justify-content: space-between;
      padding: 0 7%;
      align-items: center;
      &_item {
        height: 100%;
        width: 130px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        div {
          display: flex;
          align-items: center;
        }
        img {
          width: 7px;
          height: 14px;
        }
      }
    }
    &_middle {
      width: 92%;
      height: 10%;
      margin: 0 4%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bolder;
      font-size: 18px;
      div {
        width: 13.2%;
        text-align: center;
      }
    }
    &_bottom {
      width: 100%;
      height: 65%;
      display: flex;
      .swiper_slide_con {
        margin: 4%; 
        display: flex;
        flex-wrap: wrap;
        height: 84%;
        justify-content: space-between;
        &_day {
          text-align: center;
          width: 13.2%;
          font-size: 13px;
          .hide {
            display: none;
          }
        }
      }
    }
  }
}
</style>
