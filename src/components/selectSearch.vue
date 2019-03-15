<template>
  <div class="search-select-component" :class="customizeClass" v-if="wrapHidden">
    <label class="label" :class="labelClass">{{label}}</label>
    <div class="search-area" :class="inputClass">
      <div class="search-filed_input-outer">
        <input :type="type" @input="updataValue" @blur="inputBlur" @focus="inputFocus" :disabled="optionDisable"
               :value="textValue" class="search-input" :placeholder="placeholder"/>
        <p v-show="error" class="component_form-error component_form-select-search-error">{{ error }}</p>
      </div>
      <span class="triangular"></span>
      <ul class="items" v-if="hide">
        <li class="item" v-for="(item, $index) in copyDatas" :class="{'active':currentIndex === $index}"
            @mousedown.stop="selectOption(item, $index)">
          {{getOptionLabel(item)}}
        </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    name () {
      return this.label
    },
    value () {
      return this.dataValue
    }
  },
  model: {
    prop: 'dataValue',
    event: 'search-select'
  },
  data: function () {
    return {
      currentIndex: -1,
      textValue: '',
      hide: false,
      copyDatas: []
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valKey: {
      type: String,
      default: 'value'
    },
    customizeClass: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: 'ml20'
    },
    inputClass: {
      type: String,
      default: 'wc90'
    },
    comIndex: {
      type: Number,
      default: -1
    },
    optionDisable: {
      type: Boolean,
      default: false
    },
    needArrOne: {
      type: Boolean,
      default: false
    },
    wrapHidden: {
      type: Boolean,
      default: true
    },
    dataValue: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      required: false
    }
  },
  methods: {
    getOptionValue: function (option) {
      if (typeof option === 'object') {
        if (this.valKey && option[this.valKey]) {
          return option[this.valKey]
        }
      }
      return option
    },
    getOptionLabel: function (option) {
      if (typeof option === 'object') {
        if (this.valKey && option[this.labelKey]) {
          return option[this.labelKey]
        }
      }
      return option
    },
    byLabelGetIndex: function (labelValue) {
      let myIndex = -1
      this.list.forEach((data, index) => {
        if (labelValue !== '') {
          const myData = /.*[\u4e00-\u9fa5]+.*$/.test(labelValue) ? this.getOptionLabel(data) : this.getOptionValue(data)
          if (myData === labelValue) {
            myIndex = index
            return false
          }
        }
      })
      return myIndex
    },
    byValueGetIndex: function (val) {
      var myIndex = -1
      this.list.forEach((item, index) => {
        if (this.getOptionValue(item) === val) {
          myIndex = index
          return false
        }
      })
      return myIndex
    },
    inputFocus: function () {
      this.hide = true
      this.copyDatas = this.list
    },
    inputBlur: function () {
      this.hide = false
    },
    updataValue: function (e) {
      const newData = []  // 创建一个临时下拉框副本
      this.textValue = e.currentTarget.value
      const newVal = this.textValue
      this.copyDatas.forEach((data) => {
        if (this.getOptionLabel(data).indexOf(newVal) >= 0) {
          newData.unshift(data)
        }
      })
      this.copyDatas = newData // newData中的数值赋值给this.copyDatas

      // 如果不包含或者输入框中的值为空时，把拷贝出的this.list赋值给this.copyDatas
      if (this.copyDatas.length === 0 || newVal === '') {
        this.copyDatas = this.list
      }
    },
    selectOption: function (item) {
      this.textValue = this.getOptionLabel(item)
      this.currentIndex = this.byLabelGetIndex(this.textValue)
    }
  },
  watch: {
    textValue (newVal) {
      const selectLabel = this.getOptionLabel(this.list[this.currentIndex])
      const selectVal = selectLabel === newVal ? this.getOptionValue(this.list[this.currentIndex]) : ''
      this.$emit('search-select', selectVal)
    },
    list () {
      this.copyDatas = this.list
    },
    dataValue (newVal, oldVal) {
      if (!oldVal && oldVal !== '') {
        this.currentIndex = this.byValueGetIndex(newVal)
        this.textValue = this.getOptionLabel(this.list[this.currentIndex])
      }
    }
  },
  mounted () {
    this.$watch('list', this.watchList)
  }
}
</script>

<style scoped>
  .search-select-component {
    position: relative;
  }

  .label{
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 20px;
    display: inline-block;
  }
  .label-center{
    text-align: center!important;
    text-indent: 10px;
  }
  .search-select-component .search-input {
    position: relative;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    padding-left: 10px;
  }
  .search-select-component .triangular:after{
    content: "";
    position: absolute;
    right: 10px;
    top: 50%;
    border: 8px solid;
    border-color: #4A4A4A transparent transparent;
    margin-top: -4px;
  }

  .search-select-component .triangular:before{
    content: "";
    position: absolute;
    right: 10px;
    top: 50%;
    border: 8px solid;
    border-color: #fff transparent transparent;
    margin-top: -5px;
    z-index: 1;
  }

  .search-select-component .search-area {
    position: relative;
    padding-left: 0;
    padding-right: 0;
    display: inline-block;
    vertical-align: middle;
    margin: 0 20px;
  }

  .search-select-component .items {
    position: absolute;
    z-index: 99999;
    top: 33px;
    background-color: #fff;
    width: 100%;
    margin-left: 0;
    border: 1px solid  #c4c4c4;
  }

  .search-select-component .item {
    min-height: 30px;
    line-height: 30px;
    padding-left: 20px;
    cursor: pointer;
  }

  .search-select-component .item:hover, .search-select-component .item.active {
    background-color: #cda76e;
  }

  .search-select-component .component_form-select-search-error {
    position: absolute;
    min-width: 150px;
    top: 100%;
    font-size: 10px;
  }

  .search-select-component .custome-label{
    margin-left: 25px;
    text-align: center;
  }

  .search-filed_input-outer {
    position: relative;
    border-radius: 4px;
    border: 1px solid rgba(217,217,217,1);
  }
</style>
