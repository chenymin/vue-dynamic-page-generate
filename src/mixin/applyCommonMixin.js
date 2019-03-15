export default {
  methods: {
    /**
     * 显示toast
     * @param msg toast显示的信息
     * @return null
     * */
    showToast (msg) {
      this.$store.commit('changeToast', {content: msg})
      this.eventBus.$emit('toast/show')
    },
    /**
     * 获取apply初始化的数据
     * @param dispathName {String}  分发路径名称
     * @param param {Object} 参数
     * @param call {Function} 回调函数
     * @return null
     * */
    getInitData (dispathName, call, param) {
      this.$store.dispatch(dispathName, {param}).then(({respCode, data}) => {
        if (respCode === '000000') {
          call(data)
          console.log(data)
        }
      })
    },
    /**
     * 表单信息检验提交
     * @param refs {String} 表单对应的ref
     * @param call {Function} 提交的回调函数
     * @return void
     * */
    formValid (refs, call) {
      this.$refs[refs].validator().then(({isValid}) => {
        console.log(isValid)
        call && call()
      }).catch(({errorMsg}) => {
        console.log(errorMsg)
      })
    }
  }
}
