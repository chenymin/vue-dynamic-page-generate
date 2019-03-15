<template>
  <div class="enterprise-info-wrap page-inner-wrap">
      <page-navigate :currentIndex="0" :label-text="$store.state.global.pagenavigateInfo"></page-navigate>
      <form-generator :schema="schema" v-model="formData" ref="formTest"></form-generator>
    <div class="button-outer">
      <button @click="myMethods" style="clear: both" class="primary-button primary-button_yellow-color">下一步</button>
    </div>
  </div>
</template>

<script>
  import PageNavigate from '@/components/pagenavigate'
  import FormGenerator from '@/components/base/FormGenerator'
  import applyCommonMixin from '@/mixin/applyCommonMixin'

  export default {
    mixins: [applyCommonMixin],
    data () {
      return {
        formData: Object.assign({}, this.$store.state.global.enterpriseInfo.formData),
        schema: [...this.$store.state.global.enterpriseInfo.schema]
      }
    },
    components: {
      FormGenerator,
      PageNavigate
    },
    methods: {
      myMethods () {
        this.formValid('formTest', this.test)
      },
      test () {
        console.log('----->')
      }
    },
    mounted () {
    }
  }
</script>
