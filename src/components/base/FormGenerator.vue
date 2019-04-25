<template>
  <div class="form-wrap">
    <component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               v-model="formData[field.model]"
               @input="updateForm(field.model, $event)"
               v-validate="field.rules || {}"
               :error="errors.first(field.label)"
               v-bind="field"
               v-if="!field.isComponentShow">
      <slot :field="field">
        <!-- 默认内容 -->
        {{ field.fieldType }}
      </slot>
    </component>
  </div>
</template>

<script>
  import MyInput from '@/components/myinput'
  import SmsCode from '@/components/smsverification'
  import DatePicker from '@/components/datepicker/datepicker'
  import MySelection from '@/components/selection'
  import Distpicker from '@/components/distpickers/distpicker'

  export default {
    name: 'FormGenerator',
    components: { MyInput, SmsCode, DatePicker, MySelection, Distpicker },
    props: {
      value: {
        type: Object,
        default () {
          return {}
        }
      },
      schema: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        formData: this.value || {}
      }
    },
    methods: {
      updateForm (fieldName, value) {
        this.$set(this.formData, fieldName, value)
        this.$emit('input', this.formData)
      },
      validator () {
        const promise = new Promise((resolve, reject) => {
          this.$validator.validateAll().then((isValid) => {
            isValid ? resolve({isValid}) : reject({errorMsg: this.$validator.errors.items})
          })
        })
        return promise
      }
    }
  }
</script>
