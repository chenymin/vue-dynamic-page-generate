<template>
  <div class="input-comp" :class="customComponentCss">
    <div class="form-filed">
      <label v-if='label ' class="label" :class="customLabelCss">{{ label }}</label>
      <div class="form-filed_input-outer" :class="{'form-filed_input-outer_border' : hasBorder}">
        <input  class="value"
                :type='type'
                :value="value"
                @input='updateValue'
                @blur="$emit('blur')"
                :readonly="readonly"
                :disabled='disabled'
                :placeholder="placeholder"
                :class="customInputCss">
        <span class="unit" v-if="unit !== ''">{{unit}}</span>
        <slot></slot>
        <transition name='slide'>
          <p v-show='error' class='form__error'>{{ error }}</p>
        </transition>
      </div>
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
      return this.value
    }
  },
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      required: false
    },
    unit: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: val => {
        return (
          ['url', 'text', 'password', 'email', 'search', 'tel'].indexOf(val) !== -1
        )
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    customLabelCss: {
      type: String,
      default: ''
    },
    customInputCss: {
      type: String,
      default: ''
    },
    customComponentCss: {
      type: String,
      default: ''
    },
    hasBorder: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
