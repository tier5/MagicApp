<template>
  <div>
    <v-container fluid>
        <v-layout row wrap class="signup auth signupfailure">
            <v-flex md9 hidden-md-and-up class="left-side-mobile">
                <v-card>
                    <img src="../../../assets/images/signupconf.png" alt="banner"/>
                </v-card>
            </v-flex>
            <v-flex md3 class="left-side">
                <v-card-text>
                    <div class="form-top">
                        <img src="../../../assets/images/dashboard-logo.png" alt="Header Logo" class="header-logo">
                    </div>
                    <h1>Payment Failed</h1>
                    <p>The card has been declined for an unknown reason. Please <a href="#">try again</a></p>
                </v-card-text>
            </v-flex>
            <v-flex md9 hidden-sm-and-down class="right-side"></v-flex>
        </v-layout>
    </v-container>
   
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        name: '',
        email:'',
        password:'',
        user:{
            name: '',
            email:'',
            password:''
        }
      };
    }
  };
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import "./SignUpPaymentFailure.scss";
</style>