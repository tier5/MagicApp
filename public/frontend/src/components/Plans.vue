<template>
  <div>
    <div class="container" >
      <div class="row">
        <div class="col-md-3 col-sm-3" v-for="(plan,index) in plans" :key="index">
          <v-layout v-if="plan.amount">
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{plan.name}}</h3>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>${{(plan.amount) !== 0 ? (plan.amount/100): 0}}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="orange">Select</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
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
