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
        <account-hold v-if="!user.isActive"></account-hold>
        <router-view v-if="user.isActive"/>
      </div>
      <div class="col-md-2">&nbsp;</div>
    </div>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Sidebars from './Sidebars.vue';
  import { mapGetters } from 'vuex';
  import AccountHold from './AccountHold.vue';
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
      appHeader:Header,
      appSidebars:Sidebars,
      AccountHold
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'user'
        ])
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
