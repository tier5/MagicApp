<template>
  <div>
    <v-card-text class="paymentinfo upgrademembership">
      <div class="center-block">
        <h1>Choose a suitable plan for your business</h1>
        <p></p>
        <!-- <p>*Your new membership will be effected from 15th January 2019</p> -->
        <v-layout row wrap>
          <v-flex md4 xs12>
            <v-card-text>
              <div class="plan">
                <div class="head">
                  <span class="type">Starter</span>
                  <h4><span>$</span> 27</h4>
                </div>
                <div class="body">
                  <ul>
                    <li>10 magic zaps</li>
                    <li>1,000 Monthly Automations</li>
                    <li class="disabled">No Magic Option</li>
                    <li class="disabled">Timeout Option</li>
                    <li class="disabled">No Cookies</li>
                  </ul>
                </div>
              </div>
            </v-card-text>
            <v-card-text>
              <v-btn class="submit-btn downgrade" v-if="this.currentPlan !== 'STARTER' && this.currentPrice > 27" @click.prevent="updateMembership('STARTER')">
                <span>Downgrade</span>
              </v-btn>
              <div class="currentplan" v-if="this.currentPlan === 'STARTER'">
                <span>Your current plan</span>
              </div>
              <v-btn class="submit-btn" v-if="this.currentPlan !== 'STARTER' && this.currentPrice < 27" @click.prevent="updateMembership('STARTER')">
                <span>Upgrade</span>
              </v-btn>
            </v-card-text>
          </v-flex>
          <v-flex md4 xs12>
            <v-card-text>
              <div class="plan highlighted">
                <div class="head">
                  <span class="type">Standard</span>
                  <h4><span>$</span> 47</h4>
                </div>
                <div class="body">
                  <ul>
                    <li>50 magic zaps</li>
                    <li>1,000 Monthly Automations</li>
                    <li>Magic Option</li>
                    <li class="disabled">Timeout Option</li>
                    <li class="disabled">No Cookies</li>
                  </ul>
                </div>
              </div>
            </v-card-text>
            <v-card-text>
              <v-btn class="submit-btn downgrade" v-if="this.currentPlan !== 'STANDARD' && this.currentPrice > 47"  @click.prevent="updateMembership('STANDARD')">
                <span>Downgrade</span>
              </v-btn>
              <div class="currentplan" v-if="this.currentPlan == 'STANDARD'">
                <span>Your current plan</span>
              </div>
              <v-btn class="submit-btn" v-if="this.currentPlan !== 'STANDARD' && this.currentPrice < 47" @click.prevent="updateMembership('STANDARD')">
                <span>Upgrade</span>
              </v-btn>
            </v-card-text>
          </v-flex>
          <v-flex md4 xs12>
            <v-card-text>
              <div class="plan">
                <div class="head">
                  <span class="type">professional</span>
                  <h4><span>$</span> 97</h4>
                </div>
                <div class="body">
                  <ul>
                    <li>Unlimited magic zaps</li>
                    <li>Unlimited Monthly Automations</li>
                    <li>Magic Option</li>
                    <li>Timeout Option</li>
                    <li>Cookies</li>
                  </ul>
                </div>
              </div>
            </v-card-text>
            <v-card-text>
              <v-btn class="submit-btn downgrade" v-if="this.currentPlan !== 'PROFESSIONAL' && this.currentPrice > 97" @click.prevent="updateMembership('PROFESSIONAL')">
                <span>Downgrade</span>
              </v-btn>
              <div class="currentplan" v-if="this.currentPlan == 'PROFESSIONAL'">
                <span>Your current plan</span>
              </div>
              <v-btn class="submit-btn" v-if="this.currentPlan !== 'PROFESSIONAL' && this.currentPrice < 97" @click.prevent="updateMembership('PROFESSIONAL')">
                <span>Upgrade</span>
              </v-btn>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          
          <v-flex md12 xs12>
            <Error v-if="isError"/>
            <Success v-if="isSuccess"/>
          </v-flex>
        </v-layout>
        <v-card-text>
          <v-layout row wrap class="cancel-membership">
            <v-flex md12>
              <a @click.prevent="changeRouterState('/magic/cancel-membership')">Click here</a> to cancel my Magiczap membership.
            </v-flex>
          </v-layout>
        </v-card-text>
      </div>
    </v-card-text>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import Success from '../../../components/Success.vue';
  import Error from '../../../components/Error.vue';
  import router from "../../../router/index";

  export default {
    data() {
      return {
        currentPlan:'',
      };
    },
    computed:{
      ...mapGetters([
        'loggedInUserSubscribtions',
        'isError',
        'isSuccess'
      ]),
      currentPrice(){
        switch (this.currentPlan){
          case 'STARTER':
            return 27
          case 'STANDARD':
            return 47
          case 'PROFESSIONAL':
            return 97
          default:
            //return 100
        }
      }
    },
    methods: {
      changeRouterState(path){
        router.push(path)
      },
      updateMembership(plan){
        this.$store.dispatch('updateSubscription', {plan : plan});
      }
    },
    components:{
      Error,
      Success
    },
    watch: {
      loggedInUserSubscribtions : function(value){
        this.currentPlan = value.currentPlanName;
      }
    },
    created(){
      this.currentPlan = this.loggedInUserSubscribtions.currentPlanName;
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./UpgradeMembership.scss";
</style>