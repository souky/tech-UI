<template>
  <div id="app">
    <zs-button type='save'>测试按钮</zs-button>

    <zsImgview :visible.sync="visible"></zsImgview>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      visible:true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
