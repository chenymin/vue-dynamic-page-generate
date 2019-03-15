<template>
  <div class="page-navigate-component-wrap">
    <div v-for="(item, index) in labelText" :key="index" class="flow" :class="{'active': currentIndex === index}">
      <div class="pentagram" v-if="currentIndex === index">
        <img src="../assets/star_five.png" alt="" class="star"/>
      </div>
      <div class="round hollow-round" :class="{'solid-round': currentIndex >= index}"></div>
      <div class="line" :class="{'solid-line': currentIndex > index, 'noline': index === labelText.length - 1}"></div>
      <span class="text" :class="{'text-color': currentIndex >= index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      currentIndex: {
        type: Number,
        default: 0
      },
      labelText: {
        type: Array,
        default: function () {
          return ['申请企业信息', '法定代表人信息', '材料上传', '提交成功']
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/var.scss';
  .page-navigate-component-wrap{
    padding: 40px 0 65px 0;
    background-color: #fff;
    text-align: center;
    .flow{
      position: relative;
      display: inline-block;
    }
    .text{
      position: absolute;
      top:45px;
      left: -40px;
      font-size: 16px;
      width: 113px;
      text-align: center;
    }
    .pentagram{
      position: absolute;
      top: 50%;
      margin-top: -12px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: linear-gradient(to bottom,$pagenavigate-component-circle-bg-color1,$pagenavigate-component-circle-bg-color2);
    }
    .round{
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .solid-round{
      background: linear-gradient(to bottom, $pagenavigate-component-circle-bg-color1,$pagenavigate-component-circle-bg-color2);
      border: 1px solid $pagenavigate-component-circle-bg-color1;
    }
    .hollow-round{
      border:1px solid #999999;
    }
    .line{
      width: 140px;
      border-top:1px dashed #999999;
      margin-left: 25px;
      margin-top: -13px;
    }
    .solid-line{
      border-top: 2px solid $pagenavigate-component-circle-bg-color2;
    }
    .noline{
      width: 0;
    }
    .star{
      width: 17px;
      position: absolute;
      top:8px;
      left: 10px;
    }
    .text-color{
      color: $pagenavigate-component-text-color;
      margin-top: -2px;
    }
  }
</style>
