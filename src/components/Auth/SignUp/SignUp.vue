<template>
  <div>
    <v-container fluid>
        <v-layout row wrap class="signup auth">
            <v-flex md9 hidden-md-and-up class="left-side-mobile">
                <v-card>
                    <img src="../../../assets/images/signup.png" alt="banner"/>
                </v-card>
            </v-flex>
            <v-flex md3 class="left-side">
                <v-card-text>
                    <div class="form-top">
                        <img src="../../../assets/images/dashboard-logo.png" alt="Header Logo" class="header-logo">
                        <p>Sign Up to Magic Zap to Start Your <span>14 days FREE Trial</span> </p>
                    </div>
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
                                        v-model="user.email">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field 
                                        label="Solo"  
                                        placeholder="PASSWORD" 
                                        class="password" 
                                        solo
                                        :type="'password'"
                                        v-model="user.password">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn block color="orangeButton" 
                                        type='submit'
                                        >
                                        <img src="../../../assets/images/lock.png" alt="sign up">sign up
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <p>Already have an account?<a href="#"> Login </a>in here.</p>
                                    <p>By creating your account to use Magiczap, you are agreeing to our <a href="#"> Terms of Service </a>and <a href="#">Privacy Policy</a></p>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
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
    @import "./SignUp.scss";
</style>