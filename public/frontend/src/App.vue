<template>
  <div id="app">
    <alert></alert>
    <router-view/>
  </div>
</template>

<script>
  import Alert from './components/Alert.vue'
export default {
  name: 'app',
    created () {
        this.$store.commit('checkUserAuthentication');
    },
  components:{
    'alert': Alert
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}
.clearfix{
  clear: both;
  display: inline-block;
  width:100%;
}
</style>
