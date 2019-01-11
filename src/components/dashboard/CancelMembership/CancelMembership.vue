<template>
  <div>
    <v-card-text class="paymentinfo editprofile">
      <div class="center-block">
        <h1>Cancellation of Maziczap Membership</h1>
        <p>We are so sad to you go. We would like you tell us the reason od cancellation of your membership.</p>
        <p>This would be help us to serve the community a better experience.</p>
        <v-form>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-select
                  :items="items"
                  placeholder="others"
                  label="Solo field"
                  solo
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                  label="Solo"  
                  placeholder="TELL US YOUR REASON HERE" 
                  solo
                  v-model="user.reason">
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-btn block color="orangeButton" 
                      type='submit'
                      >Cancel my membership
                  </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </div>
    </v-card-text>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        name: '',
        user:{
          reason: ''
        },
        items: ['others','others1','others2','others3']
      };
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./CancelMembership.scss";
</style>