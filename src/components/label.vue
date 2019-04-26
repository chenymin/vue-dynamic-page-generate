<template>
  <p class="part">
    {{labelText}}
    <slot></slot>
  </p>
</template>

<script>
  export default {
    props: {
      labelText: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .part {
    display: flex;
    width: 100%;
    align-items: center;
    height: 50px;
    font-size:14px;
    color: #999;
  }
</style>
