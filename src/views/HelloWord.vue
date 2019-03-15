<template>
  <div class="hello">
    <h1>{{ msg || ''}}</h1>


    <h2>Whitelabel Version: {{ info.brand }}</h2>

    <h3>Whitelabel variables</h3>
    <table>
      <thead>
      <tr>
        <td>Variable</td>
        <td>Value</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Home URL</td>
        <td><a :href="info.homeURL">{{ info.homeURL }}</a></td>
      </tr>
      <tr>
        <td>logo URL</td>
        <td><a :href="info.logoURL">{{ info.logoURL }}</a></td>
      </tr>
      <tr>
        <td>Email address</td>
        <td><a :href="'mailto: ' + info.email">{{ info.email }}</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Whitelabel Vue.js App',
        info: {
          // set whitelabel brand
          brand: '',
          // set whitelabel home url
          homeURL: '',
          // set whitelabel logo url
          logoURL: '',
          // set whitelabel email address
          email: ''
        }
      }
    },
    mounted () {
      console.log(process.env.PROJECT)
      const obj = {a: 123, b: 'b'}
      const objInfo = {b: 789}
      const {a, b} = obj
      console.log(a, b, objInfo[b])
      // const demo = require('../../project.config')
      // console.log(demo)
      // console.log(require('../../project.config'))
      // Object.assign(this.info, {brand, homeURL, logoURL, email: contactEmail})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }

  table {
    margin: auto;
    min-width: 450px;
    max-width: 100%;
  }
  thead {
    font-weight: bold
  }
</style>
