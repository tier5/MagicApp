<template>
  <div>
    <v-card-text class="paymentinfo editprofile">
      <div class="center-block">
        <h1>Edit your Profile Information</h1>
        <p>You only can change your name here</p>
        <v-form>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field 
                  label="Solo"  
                  placeholder="FULL NAME" 
                  class="name" solo
                  v-model="user.name">
                </v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-text-field 
                      label="Solo"  
                      placeholder="EMAIL" 
                      class="email" solo
                      disabled
                      v-model="user.email">
                  </v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-btn block color="orangeButton" 
                      type='submit'
                      >Update profile
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
        email:'',
        user:{
            name: 'jon vaughn',
            email:'jon@thinkvaughn.com'
        }
      };
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./EditProfile.scss";
</style>