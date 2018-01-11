<template>
  <div class="app_alert">
    <transition name="fade">
      <div class="alert alert-success" v-if="isSuccess">
        <strong> {{ successMessage }}</strong>
      </div>
    </transition>
    <transition name="fade">
      <div class="alert alert-danger" v-if="isError">
        <strong>{{ errorMessage }}</strong>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed:{
      ...mapGetters([
        'isSuccess',
        'successMessage',
        'isError',
        'errorMessage'
      ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app_alert{
  position: absolute;
  z-index: 99999;
  margin-top: 30%;
  margin-left: 80%;
}
</style>
