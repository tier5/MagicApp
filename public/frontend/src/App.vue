<template>
  <div id="app">
    <div class="overlay" v-if="isLoading">
      <circle8 class="loader"></circle8>
    </div>
    <alert></alert>
    <router-view/>
    
  </div>
</template>

<script>
  import Alert from './components/Alert.vue';
  import {RotateSquare2, Circle8} from 'vue-loading-spinner';
  import { mapGetters } from 'vuex';
export default {
  name: 'app',
  created () {
      this.$store.commit('checkUserAuthentication');
  },
  computed:{
    ...mapGetters([
            'isLoading'
        ])
  },
  components:{
    'alert': Alert,
    Circle8
  }
}
</script>

<style>
html{position: relative;}
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
.loader{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.overlay {
  background: rgba(255, 255, 255, 0.7); 
  position: fixed; 
  width: 100%; 
  height: 100%; 
  top: 0; 
  left: 0;
  z-index: 99999;
  }



</style>
