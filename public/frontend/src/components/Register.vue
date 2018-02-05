<template>
  <div>
    <div class="row app_register">
      <div class="col-md-3"></div>
      <div class="col-md-6 app_register_form">
        <form @submit.prevent="onSignUp">
          <div class="row">
            <div class="col-md-3 plans_box" v-for="(plan,index) in plans" :key="index">
              <label>
                <p>{{plan.name}}</p>
                <p>${{(plan.amount) !== 0 ? (plan.amount/100): 0}}</p>
              </label>
              <input type="radio" v-model="userSU.plan" :value="plan">
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-12">
              <p style="text-align: center"><b>AMAGICZAP</b></p>
            </div>
          </div>
          <div class="row form-group"
               v-bind:class="{ 'form-group--error': $v.userSU.email.$error }">
            <div class="col-md-12">
              <label class="control-label col-md-2">Email</label>
              <div class="col-md-10">
                <input type="email"
                       class="form-control"
                       placeholder="Email"
                       v-model="userSU.email"
                       @blur="$v.userSU.email.$touch">
                <span class="form-group__message"
                      v-if="!$v.userSU.email.required && $v.userSU.email.$error">
                  Required!
                </span>
                <span class="form-group__message"
                      v-if="!$v.userSU.email.email && $v.userSU.email.$error">
                  Must be an email
                </span>
              </div>
            </div>
          </div>
          <div class="row form-group"
               v-bind:class="{ 'form-group--error': $v.userSU.name.$error }">
            <div class="col-md-12">
              <label  class="control-label col-md-2">Name</label>
              <div class="col-md-10">
                <input type="text"
                       class="form-control"
                       placeholder="Name"
                       v-model="userSU.name"
                       @blur="$v.userSU.name.$touch">
                <span class="form-group__message"
                      v-if="!$v.userSU.name.required && $v.userSU.name.$error">
                  Required!
                </span>
              </div>
            </div>
          </div>
          <div class="row form-group"
               v-bind:class="{ 'form-group--error': $v.userSU.password.$error }">
            <div class="col-md-12">
              <label  class="control-label col-md-2">Password</label>
              <div class="col-md-10">
                <input type="password"
                       class="form-control"
                       placeholder="Password"
                       v-model="userSU.password"
                       @blur="$v.userSU.password.$touch">
                <span class="form-group__message"
                      v-if="!$v.userSU.password.required && $v.userSU.password.$error">
                  Required!
                </span>
              </div>
            </div>
          </div>
          <div class="row form-group"
               v-bind:class="{ 'form-group--error': $v.userSU.confirmPassword.$error }">
            <div class="col-md-12">
              <label  class="control-label col-md-2">Confirm Password</label>
              <div class="col-md-10">
                <input type="password"
                       class="form-control"
                       placeholder="Password"
                       v-model="userSU.confirmPassword"
                       @blur="$v.userSU.confirmPassword.$touch">
                <span class="form-group__message"
                      v-if="!$v.userSU.confirmPassword.sameAs && $v.userSU.password.$error">
                  Didn't Match with your password
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <button type="submit" class="btn btn-primary" :disabled="$v.userSU.$invalid">Register</button>
              <button type="reset" class="btn btn-primary" @click.prevent="resetForm">Reset</button>
            </div>
            <div class="col-md-3">
              <a href=""> <router-link to="/login">Login</router-link></a>
            </div>
          </div>
        </form>
        <payment-card></payment-card>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs} from 'vuelidate/lib/validators';
  import { mapGetters } from 'vuex';
  import PaymentCard from './Card.vue'
  export default {
    data () {
      return {
        userSU:{
          name:'',
          email:'',
          password:'',
          confirmPassword:'',
          plan:{
          },
          cardToken: ''
        },
      }
    },
    methods:{
      onSignUp () {
        this.userSU.userType = (this.userSU.plan.amount === 0 ) ? 'free' : 'paid';
        if (this.userSU.userType ==='paid'){
          this.userSU.cardToken = this.cardToken
        }
        this.$store.dispatch('userSignUp', this.userSU)
      },
      resetForm(){
        this.userSU = {};
        this.$v.userSU.$reset();
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'plans',
            'cardToken'

        ]),
    },
    validations:{
      userSU:{
        name:{
          required
        },
        email:{
          required,
          email
        },
        password:{
          required,
          minLength: minLength(6)
        },
        confirmPassword:{
          sameAsPassword: sameAs('password')
        },
        plan:{
          required,
        },
      }
    },
    created(){
      this.$store.dispatch('getPlans');
    },
    components: {
      PaymentCard
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app_register_form{
    border: solid 1px gray;
    padding: 20px;

  }
  .app_register {
    margin-top: 200px;
  }
  .form-group--error input{
    border-color: red;
  }
  .form-group__message{
    color: red;
  }
  .plans_box{
    border: solid 1px green;
    margin-right :3px 
  }
  
</style>
