<template>
  <div>
    <div class="container" >
      <div class="row">
        <div class="col-md-4 col-sm-4" v-for="(plan,index) in plans" :key="index">
          {{plan}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
    }
  },
  computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'plans',
        ]),
    },
  created(){
      this.$store.dispatch('getPlans');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .plans_box {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
  .plans_box:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  .plans_container {
    padding: 2px 16px;
  }
</style>
