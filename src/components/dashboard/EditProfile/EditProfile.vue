<template>
  <div>
    <v-card-text class="paymentinfo editprofile">
      <div class="center-block">
        <h1>Edit your Profile Information</h1>
        <p>You only can change your name here</p>
        <v-form @submit.prevent="updateProfile()">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 v-bind:class="{ 'form-error-box': $v.currentUser.name.$error }">
                <v-text-field 
                  label="Solo"  
                  placeholder="FULL NAME" 
                  class="name" solo
                  v-model="currentUser.name"
                  @blur="$v.currentUser.name.$touch">
                </v-text-field>
                <span class="validation-error-message"
                  v-if="!$v.currentUser.name.required && $v.currentUser.name.$error">
                      Required!
                </span>
                <span class="validation-error-message"
                  v-if="!$v.currentUser.name.alpha && $v.currentUser.name.$error">
                    Should be alphanumeric!
                </span>
              </v-flex>
              <v-flex xs12>
                  <v-text-field 
                      label="Solo"  
                      placeholder="EMAIL" 
                      class="email" solo
                      disabled
                      v-model="currentUser.email">
                  </v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-btn block color="orangeButton" 
                      type='submit'
                      :disabled="$v.currentUser.$invalid"
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
  import { helpers, required} from 'vuelidate/lib/validators'
  const alpha = helpers.regex('alpha', /^[a-zA-Z0-9 ]*$/)
  export default {
    data() {
      return {
        currentUser:{
          name : '',
          email: ''
        }
      };
    },
    computed:{
      ...mapGetters([
        'user'
      ])
    },
    methods:{
      updateProfile(){
        
        this.$store.dispatch('updateProfile', this.currentUser);
      }
    },
    validations:{
      currentUser:{
        name : {
          required,
          alpha
        }
      }
    },
    created(){
      this.currentUser = Object.assign({}, this.user);
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./EditProfile.scss";
</style>