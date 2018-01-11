<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <app-header></app-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">&nbsp;</div>
      <div class="col-md-8">
        <router-view/>
      </div>
      <div class="col-md-2">&nbsp;</div>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import Sidebars from './Sidebars.vue'
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
      appHeader:Header,
      appSidebars:Sidebars
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
