<template>
  <div class="calendar-component">
    <section class="calendar-component_input-area">
      <label class="calendar-component_input-area_label">{{labelText}}</label>
      <div class="calendar-component_input-out">
        <input class="calendar-component_input-area_value" @input="updateValue" @change="updateValue" :value="dataValue"
               :placeholder="placeholderText" @blur.prevent="inputBlur" @focus.prevent="inputFocus" :disabled="disabledStatus">
        <img src="../assets/calendar.png" class="calendar-component-img">
        <p v-show="error" class="calendar-component_form-error">{{ error }}</p>
      </div>

    </section>
    <section class="calendar-component_content" v-if="isShow">
      <p class="calendar-component_head">
        <span class="calendar-component_head_arrow_common calendar-component_head_arrow-double-left" @mousedown.prevent="yearPre"></span>
        <span class="calendar-component_head_arrow_common calendar-component_head_arrow-left" @mousedown.prevent="monthChange('pre')"></span>
        <span class="calendar-component_head_text">{{dataText}}</span>
        <span class="calendar-component_head_arrow_common calendar-component_head_arrow-right" @mousedown.prevent="monthChange('next')"></span>
        <span class="calendar-component_head_arrow_common calendar-component_head_arrow-double-right" @mousedown.prevent="yearNext"></span>
      </p>
      <ul class="calendar-component_week-list">
        <li class="calendar-component_week-list_item" v-for="(item, index) in weekChinese">{{item}}</li>
      </ul>
      <ul class="calendar-component_list">
        <li @mousedown="chooseItem(item, index)" class="calendar-component_item" v-for="(item, index) in dayList"
          :class="{'calendar-component_item_disable': item.isCurryMonthDay}">{{item.valueDay}}</li>
      </ul>
      <p class="calendar-component_content_long" @mousedown.stop="longUse">永久期限</p>
    </section>
  </div>
</template>

<script>
  export default {
    $_veeValidate: {
      name () {
        return this.labelText
      },
      value () {
        return this.dataValue
      }
    },
    data () {
      return {
        weekChinese: ['一', '二', '三', '四', '五', '六', '日'],
        dayList: [],
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        day: 1,
        currentIndex: -1,
        chooseDate: '',
        isShow: false
      }
    },
    computed: {
      dataText () {
        return `${this.currentYear} 年 ${this.formatMonth(this.currentMonth)}月`
      }
    },
    model: {
      prop: 'dataValue',
      event: 'calendar-select'
    },
    props: {
      placeholderText: {
        type: String,
        default: '请设置有效期限'
      },
      labelText: {
        type: String,
        default: '身份证有效期'
      },
      dataValue: {
        type: String,
        default: ''
      },
      error: {
        type: String,
        required: false
      },
      disabledStatus: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      formatMonth (value) {
        if (value <= -1) value = 0
        return value + 1 >= 10 ? value + 1 : '0' + (value + 1)
      },
      formatDay (value) {
        return value >= 10 ? value : '0' + (value)
      },
      getDayCount (year, month) {
        const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (month === 1) {
          if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
            return 29
          }
          return 28
        }
        return dict[month]
      },
      getYearMonth (year, month) {
        if (month > 11) {
          year++
          month = 0
        } else if (month < 0) {
          year--
          month = 11
        }
        return {year, month}
      },
      getDateRange () {
        const now = new Date(this.currentYear, this.currentMonth, 1)
        const dayCount = this.getDayCount(now.getFullYear(), now.getMonth())
        const firstDayWeek = now.getDay() === 0 ? 7 : now.getDay()
        const totalDay = dayCount + firstDayWeek - 1
        const remaining = totalDay > 35 ? 42 - totalDay : 35 - totalDay
        this.dayList = []

        if (firstDayWeek >= 1) {
          const preMonth = this.getYearMonth(this.currentYear, now.getMonth() - 1)
          const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)
          for (let i = 1; i < firstDayWeek; i++) {
            let value = prevMonthDayCount - (firstDayWeek - 1) + i
            let preDate = new Date(preMonth.year, preMonth.month, value)
            this.dayList.push({
              isWeekEnd: this.isWeek(preDate),
              isCurrentDay: 0,
              isCurryMonthDay: true,
              valueDay: preDate.getDate(),
              date: preDate
            })
          }
        }

        var nowDate = new Date()
        for (let i = 0, len = dayCount; i < len; i++) {
          let date = new Date(this.currentYear, now.getMonth(), i + 1)
          this.dayList.push({
            isWeekEnd: this.isWeek(date),
            isCurrentDay: (nowDate.getDate() === date.getDate()) && (nowDate.getMonth() === date.getMonth()) ? 1 : 0,
            isCurryMonthDay: false,
            valueDay: date.getDate(),
            date: date
          })
        }

        for (let i = 0; i < remaining; i++) {
          let nextDate = new Date(this.currentYear, now.getMonth() + 1, i + 1)
          this.dayList.push({
            isWeekEnd: this.isWeek(nextDate),
            isCurrentDay: 0,
            valueDay: nextDate.getDate(),
            isCurryMonthDay: true,
            date: nextDate
          })
        }
      },
      isWeek (date) {
        return date.getDay() === 6 || date.getDay() === 0 ? 1 : 0
      },
      chooseItem (item, index) {
        const currentMonthFirstDate = new Date(this.currentYear, this.currentMonth, 1)
        const currentMonthOfDay = this.getDayCount(currentMonthFirstDate.getFullYear(), currentMonthFirstDate.getMonth())
        const firstDayPosition = currentMonthFirstDate.getDay() === 0 ? 7 : currentMonthFirstDate.getDay()

        this.currentIndex = index
        this.chooseDate = item.date
        if (index < firstDayPosition - 1) {
          this.currentMonth = currentMonthFirstDate.getMonth() - 1
        } else if (index >= (currentMonthOfDay + firstDayPosition - 1)) {
          this.currentMonth = currentMonthFirstDate.getMonth() + 1
        }

        if (this.currentMonth > 11) {
          this.currentYear = currentMonthFirstDate.getFullYear() + 1
        } else if (this.currentMonth <= -1) {
          this.currentYear = currentMonthFirstDate.getFullYear() - 1
        }
        this.$emit('calendar-select', `${this.currentYear}/${this.formatMonth(this.currentMonth)}/${this.formatDay(item.valueDay)}`)
        this.isShow = false
      },
      yearPre () {
        this.currentYear = this.currentYear - 1
      },
      yearNext () {
        this.currentYear = this.currentYear + 1
      },
      monthChange (value) {
        this.currentMonth = value === 'pre' ? this.currentMonth - 1 : this.currentMonth + 1
        if (this.currentMonth > 11) {
          this.currentYear = this.currentYear + 1
        } else if (this.currentMonth <= -1) {
          this.currentYear = this.currentYear - 1
        }
      },
      longUse () {
        this.isShow = false
        this.$emit('calendar-select', '永久期限')
      },
      inputFocus: function () {
        this.isShow = true
      },
      inputBlur: function () {
        this.isShow = false
      },
      updateValue (e) {
        // this.$emit('calendar-select', e.target.value)
      }
    },
    watch: {
      currentYear () {
        this.currentMonth = 0
        this.getDateRange()
      },
      currentMonth () {
        this.getDateRange()
      }
    },
    mounted () {
      this.getDateRange()
    }
  }
</script>

<style>
  .calendar-component {
    position: relative;
    color: #333;
    font-size: 14px;
    width: 300px;
  }
  .calendar-component_input-out {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid rgba(217,217,217,1);
    border-radius: 4px;
  }
  .calendar-component_input-area_label {
    width:100px;
    height:20px;
    line-height: 20px;
    display: inline-block;
  }

  .calendar-component_input-area_value {
    position: relative;
    width: 180px;
    height: 30px;
    border-radius: 4px;
    padding-left: 10px;
  }

  .calendar-component_head_arrow_common {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 26px;
    line-height: 26px;
    cursor: pointer;
  }

  .calendar-component_head_arrow-double-left:before {
    content: '';
    position: absolute;
    left: 30%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-top: solid 1px currentColor;
    border-right: solid 1px currentColor;
    transform: rotate(-135deg);
    margin-top: -4px;
  }

  .calendar-component_head_arrow-double-left:after {
    content: '';
    position: absolute;
    left: 40%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-top: solid 1px currentColor;
    border-right: solid 1px currentColor;
    transform: rotate(-135deg);
    margin-top: -4px;
  }

  .calendar-component_head_arrow-left:before {
    content: '';
    position: absolute;
    right: 1px;
    top: 50%;
    width: 8px;
    height: 8px;
    border-top: solid 1px currentColor;
    border-right: solid 1px currentColor;
    transform: rotate(-135deg);
    margin-top: -4px;
  }

  .calendar-component_head_arrow-right:before {
    content: '';
    position: absolute;
    left: 1px;
    top: 50%;
    width: 8px;
    height: 8px;
    border-top: solid 1px currentColor;
    border-right: solid 1px currentColor;
    transform: rotate(45deg);
    margin-top: -4px;
  }

  .calendar-component_head_arrow-double-right:before {
    content: '';
    position: absolute;
    left: 40%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-top: solid 1px currentColor;
    border-right: solid 1px currentColor;
    transform: rotate(45deg);
    margin-top: -4px;
  }

  .calendar-component_head_arrow-double-right:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-top: solid 1px currentColor;
    border-right: solid 1px currentColor;
    transform: rotate(45deg);
    margin-top: -4px;
  }

  .calendar-component_head_text {
    display: inline-block;
    width: 104px;
    text-align: center;
    height: 26px;
    line-height: 26px;
    vertical-align: top;
  }

  .calendar-component_week-list {
    display: flex;
  }
  .calendar-component_week-list_item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    /* width: calc(100%/7); */
    width: 40px;
    float: left;
    text-align: center;
    padding: 5px 0;
  }

  .calendar-component_list {
    display: flex;
    flex-flow: wrap;
    overflow: hidden;
    width: 100%;
  }

  .calendar-component_item {
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: calc(100% / 7); */
    width: 40px;
    float: left;
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
  }

  .calendar-component_content {
    position: absolute;
    width:282px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 2px 0px rgba(238,238,238,1);
    border:1px solid rgba(238,238,238,1);
    top: 40px;
    left: 100px;
    z-index: 1;
  }

  .calendar-component_content:before{
    content: '';
    position: absolute;
    border: 10px solid;
    border-color: transparent transparent #eee;
    left: 50%;
    top: -20px;
    margin-left: -5px;
  }

  .calendar-component_content:after{
    content: '';
    position: absolute;
    border: 10px solid;
    border-color: transparent transparent #fff;
    left: 50%;
    top: -18px;
    margin-left: -5px;
  }

  .calendar-component_content_long {
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 10px 10px 0;
    border-top: 1px solid #eee;
    color: #666;
    cursor: pointer;
  }

  .calendar-component_item_disable {
    color: #999;
  }

  .component_form-error {
    font-size: 14px;
    color: red;
  }
  .calendar-component_form-error {
    position: absolute;
    left: 0;
    font-size: 10px;
    color: red;
  }

  .banklist-component_form-error {
    font-size: 14px;
    background-color: #fff;
    color: red;
    padding-left: 80px;
  }

  .calendar-component_content:hover {
    display: block!important;
  }

  .calendar-component-img {
    position: absolute;
    right: 5px;
    top: 6px;
  }
</style>
