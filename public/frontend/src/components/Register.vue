<template>
  <div>
    <div class="row app_register">
      <div class="col-md-3"></div>
      <div class="col-md-6 app_register_form">
        <form @submit.prevent="onSignUp">
          <div class="row form-group">
            <div class="col-md-12">
              <p style="text-align: center"><b>AMAGICZAP</b></p>
            </div>
          </div>
          <div class="row plans_container">
            <div class="col-md-3 plans_box" 
                  v-for="(plan,index) in plans" :key="index" 
                   @click="selectPlan(plan)" 
                   v-bind:class="{ plans_box_seleted: (userSU.plan == plan) }">
              <label>
                <p style="text-align:centre;">{{plan.name}}</p>
                <p>${{(plan.amount) !== 0 ? (plan.amount/100): 0}}</p>
              </label>
              <!-- <input type="radio" v-model="userSU.plan" :value="plan"> -->
            </div>
          </div>
          <div class="clearfix"></div>
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
          <div class="row form-group" v-if="userSU.plan.amount">
            <div class="col-md-12">
              <label  class="control-label col-md-2">Payments</label>
              <div class="col-md-10">
                <card class='stripe-card form-control'
                  :class='{ complete }'
                  stripe='pk_test_aFYmaDW3rf5AHh7MkX2BSshB'
                  :options='stripeOptions'
                  @change='complete = $event.complete'
                />
              </div>  
            </div>
          </div>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <button type="submit" class="btn btn-primary" v-if="!userSU.plan.amount" :disabled="$v.userSU.$invalid">Register</button>
              <button type="submit" class="btn btn-primary" v-if="userSU.plan.amount" :disabled="(!complete) || ($v.userSU.$invalid)">Register</button>
              <button type="reset" class="btn btn-primary" @click.prevent="resetForm">Reset</button>
            </div>
            <div class="col-md-3">
              <a href=""> <router-link to="/login">Login</router-link></a>
              <a href="" @click.prevent="openForgetPassword"> Forget Password ?</a>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-3">
        <forget-password v-if="forgetPassword"></forget-password>
      </div>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs} from 'vuelidate/lib/validators';
  import { mapGetters } from 'vuex';
  import { Card, createToken } from 'vue-stripe-elements-plus';
  import ForgetPassword from './ForgetPassword.vue';
  export default {
    data () {
      return {
        userSU:{
          name:'',
          email:'',
          password:'',
          confirmPassword:'',
          plan:{
            amount : 0
          },
          cardToken: '',
          card:{}
        },
        complete: false,
        stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
            
        }
      }
    },
    methods:{
      onSignUp () {
        this.userSU.userType = (this.userSU.plan.amount === 0 ) ? 'free' : 'paid';
        if(this.userSU.userType === 'free') {

          this.$store.dispatch('userSignUp', this.userSU);

        } else if(this.userSU.userType === 'paid') {
          
          this.$store.commit('changeLoading', true)

          createToken().then(data => {
            this.userSU.cardToken = data.token.id;
            this.userSU.card = data.token.card;
            this.$store.dispatch('userSignUp', this.userSU)
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
      resetForm(){
        this.userSU = {};
        this.$v.userSU.$reset();
      },
      selectPlan(plan){
        this.userSU.plan = plan;
        //console.log(this.userSU.plan)
      },
      openForgetPassword(){
        this.$store.commit('changeForgetPassword',true);
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'plans',
            'cardToken',
            'forgetPassword'

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
      Card,
      ForgetPassword
    },
    watch:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app_register_form{
    border: solid 1px gray;
    padding: 20px;
    border-radius:25px;

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
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
  .plans_box:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  .plans_container {
    padding: 2px 16px;
  }
  .plans_box_seleted {
    border: solid 1px green
  }
  .stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
  
</style>
