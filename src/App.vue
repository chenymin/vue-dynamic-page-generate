<template>
  <div id="app">
    <my-header :title="'星鑫付额度申请'" :is-middle="true" :rightTitle="'测试'"></my-header>
    <component :is="layout">
      <transition-page>
        <router-view :layout.sync="layout"/>
      </transition-page>
    </component>
    <my-toast
           :title="toast.title"
           :content="toast.content">
    </my-toast>
    <loding></loding>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MyToast from '@/components/toast'
import Loding from '@/components/loading/loding'
import TransitionPage from '@/components/transition/transitionpage'
import MyHeader from '@/components/header'

export default {
  name: 'app',
  data () {
    return {
      layout: `div`
    }
  },
  computed: {
    ...mapGetters([
      'toast'
    ])
  },
  components: {
    MyToast,
    Loding,
    TransitionPage,
    MyHeader
  },
  created () {
  }
}
</script>

<style lang="scss">
  @import 'scss/app.scss';
</style>
