<template>
  <div>
    <v-card-text class="paymentinfo upgrademembership">
      <div class="center-block">
        <h1>Choose a suitable plan for your business</h1>
        <p>*Your new membership will be effected from 15th January 2019</p>
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
              <v-btn class="submit-btn downgrade">
                <span>Downgrade</span>
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
              <div class="currentplan">
                <span>Your current plan</span>
              </div>
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
              <v-btn class="submit-btn">
                <span>Upgrade</span>
              </v-btn>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-card-text>
          <v-layout row wrap class="cancel-membership">
            <v-flex md12>
              <a href="#">Click here</a> to cancel my Magiczap membership.
            </v-flex>
          </v-layout>
        </v-card-text>
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
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./UpgradeMembership.scss";
</style>