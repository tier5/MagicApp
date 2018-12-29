<template>
  <div>
      Create Training Video List Page
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      
    },
    computed:{
      ...mapGetters([
            'user',
            'tutorials'
      ]),
      
    },
    created(){
      this.$store.dispatch('getTutorials',{});
    }
  };
</script>

<style lang="scss">
@import "../../../styles/common.scss";
//@import "./ViewTrainingVideos.scss";
</style>