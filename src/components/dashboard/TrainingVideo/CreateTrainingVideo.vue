<template>
  <div>
    <v-card-text class="tutorial">
      <div class="firstZap hidden-xs-only">
        <v-layout row wrap>
        </v-layout>
      </div>
    </v-card-text>
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
@import "./CreateTrainingVideo.scss";
</style>