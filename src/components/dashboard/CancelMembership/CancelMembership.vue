<template>
  <div>
    <v-card-text class="paymentinfo editprofile">
      <div class="center-block">
        <h1>Cancellation of Maziczap Membership</h1>
        <p>We are so sad to you go. We would like you tell us the reason od cancellation of your membership.</p>
        <p>This would be help us to serve the community a better experience.</p>
        <v-form @submit.prevent='cancelMembership'>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <Error v-if="isError"></Error>
              </v-flex>
              <v-flex xs12 v-bind:class="{'form-error-box': $v.reason.$error }">
                <v-select
                  :items="items"
                  v-model="reason"
                  placeholder="select your reason"
                  label="Solo field"
                  solo
                  @blur="$v.reason.$touch"
                ></v-select>
                <span class="validation-error-message"
                  v-if="!$v.reason.required && $v.reason.$error">
                  Required!
                </span>
              </v-flex>
              <v-flex xs12 v-if="reason === 'Others'" v-bind:class="{'form-error-box': $v.others.$error }">
                <v-text-field 
                  label="Solo"  
                  placeholder="TELL US YOUR REASON HERE" 
                  solo
                  v-model="others"
                  @blur="$v.others.$touch">
                </v-text-field>
                <span class="validation-error-message"
                  v-if="!$v.others.required && $v.others.$error">
                  Required!
                </span>
              </v-flex>
              <v-flex xs12 v-if="reason === 'Others'">
                  <v-btn block color="orangeButton" 
                      type='submit'
                      :disabled='$v.reason.$invalid || $v.others.$invalid'
                      >Cancel my membership
                  </v-btn>
              </v-flex>
              <v-flex xs12 v-if="reason !== 'Others'">
                  <v-btn block color="orangeButton" 
                      type='submit'
                      :disabled='$v.reason.$invalid'
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
  import { required } from 'vuelidate/lib/validators';
  import Error from '../../../components/Error.vue';
  export default {
    data() {
      return {
        name: '',
        others:'',
        reason:'',
        items: [
          'Bad onboarding',
          'Buggy product',
          'Bad support',
          'Not a right fit',
          'Price is too high',
          'Others'
        ]
      }
    },
    computed:{
      ...mapGetters([
        'isError'
      ])
    },
    methods:{
      cancelMembership(){
        this.$store.dispatch('cancelMembership', { });
      }
    },
    validations:{
      reason:{
        required
      },
      others: {
        required
      }
    },
    components:{
      Error
    },
    created(){

    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./CancelMembership.scss";
</style>