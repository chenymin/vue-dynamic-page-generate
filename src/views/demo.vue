<template>
  <div>
    <confirm-dialogue :is-touch-close='isTouchClose'>
    </confirm-dialogue>
    <pic-alert :is-touch-close='isTouchClose' ></pic-alert>
    <prompt-alert :is-touch-close='isTouchClose'
                  :content="'sdfsdfsfsfssdfsdf'"
                  v-model="promptShow">
    </prompt-alert>
    <button @click="myMethods">显示确认组件</button>
    <!-- <select-search :list="list"></select-search>
    <dots-loader></dots-loader> -->
    <!--<selection :props="selectionCard.props" :model="selectionCard.model"></selection>-->
    <div class="form-wrap">
      <my-text-input
        v-model="email"
        label="Email"
        type="email"
        v-validate="'required|email'"
        :error="errors.first('Email')"
      ></my-text-input>

      <my-text-input
        v-model="phone"
        label="手机号"
        type="text"
        v-validate="'required|phone'"
        :error="errors.first('手机号')"
      ></my-text-input>

      <multiplexing-input v-model="phone1"
                          :label="filed.label"
                          v-validate="'required|phone'"
                          :error="errors.first('手机号码1')">
      </multiplexing-input>
    </div>
  </div>
</template>

<script>
  import MultiplexingInput from '../components/multiplexingInput.vue'
  import ConfirmDialogue from '../components/confirmdialogue.vue'
  import PicAlert from '../components/picalert'
  import MyTextInput from '../components/myinput'
  import MySwitch from '../components/switch'
  import PromptAlert from '../components/promptalert'

  export default {
    data () {
      return {
        filed: {
          label: '手机号码1',
          type: 'text',
          value: '123456'
        },
        title: '测试title',
        massgae: 'message111',
        promptShow: false,
        smsVer: {
          isSendDisable: false,
          props: {
            label: '验证码',
            type: 'tel',
            placeholder: '请填写短信验证码',
            value: '',
            isBorder: false
          },
          model: 'verifyCode'
        },
        isSwitch: false,
        email: null,
        phone: null,
        phone1: null,
        isTouchClose: false,
        list: [
          {
            label: '工商银行',
            value: '01'
          },
          {
            label: '建设银行',
            value: '02'
          },
          {
            label: '农业银行',
            value: '03'
          },
          {
            label: '招商银行',
            value: '04'
          },
          {
            label: '交通银行',
            value: '05'
          }
        ]
      }
    },
    methods: {
      myMethods () {
        // this.eventBus.$emit('confirm/show')
        // this.eventBus.$emit('picAlert/show')
        this.eventBus.$emit('promptAlert/show')
        // this.promptShow = !this.promptShow
        this.$validator.validateAll().then((item, a) => {
          console.log(item, this.$validator.errors.items)
        })
      },
      test () {
        console.log('点击确认')
      }
    },
    components: {
      ConfirmDialogue,
      Selection,
      PicAlert,
      MyTextInput,
      MySwitch,
      PromptAlert,
      MultiplexingInput
    },
    mounted () {
      this.eventBus.$on('confirm/ok', this.test)
    },
    destroyed () {
      this.eventBus.$off('confirm/ok')
    }
  }
</script>

