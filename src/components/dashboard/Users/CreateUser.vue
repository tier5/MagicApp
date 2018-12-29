<template>
  <div>
      Create Users
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
      ]),
      
    }
  };
</script>

<style lang="scss">
@import "../../../styles/common.scss";
//@import "./ViewTrainingVideos.scss";
</style>