<template>
  <div class="date-picker-component">
    <my-input v-model="innerValue" v-bind="$attrs" @click.native.stop.prevent="showDatePicker">
      <span slot="input-slot" class="arrow-right"></span>
    </my-input>
    <cover v-bind="$attrs" ref='coverDatePicker' v-model="isDatePickerShow">
      <transition-expand slot='cover-slot'>
        <div class="date-picker-component__content" v-if="isDatePickerShow">
          <van-datetime-picker
            @cancel="datePickerCancel"
            @confirm="datePickerConfirm"
            :formatter="formatter"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :visible-item-count="visibleItemCount"
          />
          <p class="date-picker-component__content__text" @click.stop.prevent="longDate">永久期限</p>
        </div>
      </transition-expand>
    </cover>
  </div>
</template>

<script>
  import Cover from '@/components/base/cover'
  import MyInput from '@/components/myinput'
  import TransitionExpand from '@/components/transition/transitionExpand'

  export default {
    $_veeValidate: {
      name () {
        return this.$attrs.label
      },
      value () {
        return this.value
      }
    },
    data () {
      return {
        innerValue: '',
        currentDate: new Date(),
        isDatePickerShow: false
      }
    },
    methods: {
      formatter (type, value) {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        }
        return value
      },
      datePickerConfirm (value) {
        this.innerValue = value.format('yyyy-MM-dd')
        this.datePickerCancel()
      },
      datePickerCancel () {
        this.isDatePickerShow = false
      },
      showDatePicker () {
        if (!this.isTriggerClick) {
          return
        }
        this.isDatePickerShow = true
      },
      longDate () {
        this.innerValue = '永久期限'
        this.datePickerCancel()
      }
    },
    watch: {
      // Handles internal model changes.
      innerValue (newVal) {
        if (newVal !== '永久期限') {
          this.currentDate = new Date(newVal)
        }
        this.$emit('input', newVal)
      },
      // Handles external model changes.
      value (newVal) {
        this.innerValue = newVal
      }
    },
    props: {
      value: {
        type: null
      },
      minDate: {
        type: Date,
        default () {
          return new Date('1997', 0, 1)
        }
      },
      maxDate: {
        type: Date,
        default () {
          return new Date('2100', 0, 1)
        }
      },
      visibleItemCount: {
        type: Number,
        default: 3
      },
      isTriggerClick: {
        type: Boolean,
        default: true
      }
    },
    components: {
      Cover,
      MyInput,
      TransitionExpand
    },
    mounted () {
      if (this.value) {
        this.innerValue = this.value
      }
    }
  }
</script>

<style lang="scss">
  .date-picker-component {
    &__content {
      position: fixed;
      bottom: 0;
      z-index: 11;
      width: 100%;
    }
    &__content__text {
      display: flex;
      height: 1rem;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      color: #333;
      text-align: center;
      font-size: .32rem;

    }
  }
</style>
