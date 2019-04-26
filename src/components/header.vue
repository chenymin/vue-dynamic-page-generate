<template>
  <div class="header-component-wrap">
    <header class="header">
      <span class="left-arrow" @click="reboundPage" v-if="isArrow"></span>
      <span class="title" :class="{'title-middle': isMiddle, 'title-left': !isMiddle}">{{title}}</span>
      <span class="right-title" @click="jumpOtherPage" v-if="rightTitle !== ''">{{rightTitle}}</span>
    </header>
    <p class="space"></p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      isArrow: {
        type: Boolean,
        default: true
      },
      isMiddle: {
        type: Boolean,
        default: false
      },
      rightTitle: {
        type: String,
        default: ''
      },
      isClose: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      reboundPage () {
        this.$router.go(-1)
      },
      jumpOtherPage () {
        this.$emit('header-right-space')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/var.scss';
  .header-component-wrap {
    .header {
      display: flex;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid #eee;
      background:linear-gradient(90deg,$header-component-bg-color1 0%,$header-component-bg-color1 50%,$header-component-bg-color1 100%);
      position: fixed;
      width: 100%;
      z-index: 5;
      .left-arrow {
        position: absolute;
        height: 100%;
        width: 50px;
        display: flex;
        left:0;
        top:0;
          &::before {
            position: absolute;
            content: '';
            width: 16px;
            height: 16px;
            border-bottom: solid 1px #fff;
            border-left: solid 1px #fff;
            transform: rotate(45deg);
            top: 50%;
            margin-top: -8px;
            left: 50%;
        }
      }
      .title {
        font-size: 14px;
        color: #fff;
      }
      .right-title {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        font-size: 14px;
        color: #fff;
        padding: 0 30px;
        display: flex;
        align-items: center;
      }
      .title-left {
        padding-left: 50px;
      }
      .title-middle {
        display: flex;
        flex: 1;
        justify-content: center;
      }
    }
    .space {
      height: 50px;
    }
  }
</style>

