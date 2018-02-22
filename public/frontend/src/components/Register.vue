<template>
  <div class="container-fluid">
    <div class="row app_register">
      <div class="col-md-3"></div>
      <div class="col-md-6 app_register_form">
          <div class="row form-group">
            <div class="col-md-12">
              <p style="text-align: center"><b>AMAGICZAP</b></p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-4" 
              v-for="(plan,index) in plans" :key="index"
              @click="selectPlan(plan)" 
              >
              <div class="cd-pricing-header" v-bind:class="{ plans_box_seleted: (userSU.plan == plan) }">
                  <h2>{{plan.name}}</h2>
                  <div class="cd-price">
                    <span>${{plan.amount/100}}</span>
                    <!--span>for every {{plan.interval_count}} month</span-->
                  </div>
                  <footer class="cd-pricing-footer">
                    <a href="#0">Select</a>
                  </footer>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <form>
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
                <span class="form-group__message"
                      v-if="!$v.userSU.minLength && $v.userSU.password.$error">
                  Minimum Lenght should be six characters long
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
                      v-if="!$v.userSU.confirmPassword.sameAs && $v.userSU.confirmPassword.$error">
                  Didn't Match with your password
                </span>
              </div>
            </div>
          </div>
          <div class="row form-group" v-if="userSU.plan.id">
            <div class="col-md-12">
              <label  class="control-label col-md-2">Payments</label>
              <div class="col-md-10">
                <stripe-card stripe='pk_test_aFYmaDW3rf5AHh7MkX2BSshB' :options="stripeOptions"></stripe-card>
              </div>  
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-2" v-if="userSU.plan.id">
              <button type="submit" class="btn btn-success" :disabled="(!isCardValid) || ($v.userSU.$invalid)" @click.prevent="onSignUp">Register</button>
            </div>
            <div class="col-md-2">
              <button type="reset" class="btn btn-primary" @click.prevent="resetForm">Reset</button>
            </div>
            <div class="col-md-3">
              <button class="btn btn-default" @click.prevent="changeRoute('/login')"> Back to the login</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-3">
        
      </div>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs} from 'vuelidate/lib/validators';
  import { mapGetters } from 'vuex';
  import StripeCard from './StripeCard.vue';
  import { createToken } from 'vue-stripe-elements-plus';
  
  import router from '../router/index';
  export default {
    data () {
      return {
        userSU:{
          name:'',
          email:'',
          password:'',
          confirmPassword:'',
          plan:{
            id:'',
            amount : 0
          },
          cardToken: '',
          card:{}
        },
        stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
            
        }
      }
    },
    methods:{
      onSignUp () {  
          this.$store.commit('changeLoading', true)

          createToken().then(data => {
            this.userSU.cardToken = data.token.id;
            this.userSU.card = data.token.card;
            this.$store.dispatch('userSignUp', this.userSU)
          }).catch((err)=>{
            console.log(err);
          })
      },
      resetForm(){
        window.location.reload();
      },
      selectPlan(plan){
        this.userSU.plan = plan;
        //console.log(this.userSU.plan)
      },
      changeRoute(link){
        router.push(link);
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'plans',
            'cardToken',
            'forgetPassword',
            'isCardValid'

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
      StripeCard
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
    border: solid 2px green
  }
  .stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}

.cd-pricing-header {
    padding: 25px 1em;
    background-color: #337ab7;
    border-radius: .25em .25em 0 0;
    box-shadow: inset 0 1px 0 #c1cfa2;
    color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-family: "Open Sans", sans-serif;
    margin-top: 20px;
}


 .cd-pricing-header h2 {
	font-size: 2.6rem;
	margin: 0;
	padding: 5px;
	font-weight: 700;
}
.cd-pricing-header .cd-price {
	display: inline-block;
	font-weight: bold;
	font-size: 16px;
}

.body-wrap{ border: 1px solid #ccc;}

.cd-pricing-features {
	padding: 2.8em 1em 2.5em;
 
}
.cd-pricing-features li {
    line-height: 1.5;
    margin-bottom: .4em;
    list-style: none;
    font-size: 20px;
    
}
.cd-pricing-features em {
    position: relative;
    padding-left: 28px;
}
.cd-pricing-features em::before {
	position: absolute;
	content: '';
	left: 0;
	top: 50%;
	bottom: auto;
	-webkit-transform: translateY(-50%);
	-moz-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	-o-transform: translateY(-50%);
	transform: translateY(-50%);
	height: 24px;
	width: 24px;
}

.cd-pricing {
	text-align: center;
}
.cd-pricing-features .available em::before {
    background-position: 0 0;
}

.cd-pricing-features{background: #337ab7;}
.cd-pricing-footer {
	padding-bottom: 1.7em; background:#337ab7; text-align: center;
}
.cd-pricing-footer a, .cd-form input[type="submit"] {
	display: inline-block;
	padding: 1em 1.8em;
	border-radius: 50em;
	text-transform: uppercase;
	font-size: 1.3rem;
	font-weight: bold;
}
.cd-pricing-footer a {
	border: 1px solid #ccc;;
	color: #ccc;;
}
.cd-pricing-footer a:hover{text-decoration: none;}

  
</style>
