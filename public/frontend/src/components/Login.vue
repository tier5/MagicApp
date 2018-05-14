<template>
  <div class="container">
    <div class="row app_register">
      <div class="col-md-3"></div>
      <div class="col-md-6 app_register_form">
        <form @submit.prevent="onLogin">
          <div class="row form-group">
            <div class="col-md-12">
              <p style="text-align: center"><b>AMGAGICZAP</b></p>
            </div>
          </div>
          <div class="row form-group"
               v-bind:class="{ 'form-group--error': $v.user.email.$error }">
            <div class="col-md-12">
              <label class="control-label col-xs-2">Email</label>
              <div class="col-xs-10">
                <input type="email"
                       class="form-control"
                       placeholder="Email"
                       v-model="user.email"
                       @blur="$v.user.email.$touch()">
                <span class="form-group__message"
                      v-if="!$v.user.email.required && $v.user.email.$error">
                  Required!
                </span>
                <span class="form-group__message"
                      v-if="!$v.user.email.email && $v.user.email.$error">
                  Must be an Email
                </span>
              </div>
            </div>
          </div>
          <div class="row form-group"
               v-bind:class="{ 'form-group--error': $v.user.password.$error }">
            <div class="col-md-12">
              <label  class="control-label col-xs-2">Password</label>
              <div class="col-xs-10">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="user.password"
                  @blur="$v.user.password.$touch()">
                <span class="form-group__message"
                      v-if="!$v.user.password.required && $v.user.password.$error">
                  Required!
                </span>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="row">
            <div class="col-md-2">
              <button type="submit" class="btn btn-primary" :disabled="$v.user.$invalid">Login</button>
            </div>
            <div class="col-md-2">
              <button type="reset" class="btn btn-primary" @click.prevent="resetForm">Reset</button>
            </div>
            <!-- <div class="col-md-4">
              <router-link to="/register"><button class="btn btn-default">Register Here</button></router-link>
            </div> -->
            <div class="col-md-2">
              <button @click.prevent="openForgetPassword" class="btn btn-default"> Forgot Password</button>
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
  import {mapGetters} from 'vuex';
  import { required, email} from 'vuelidate/lib/validators';
  import ForgetPassword from './ForgetPassword.vue';
  export default {
    data () {
      return {
        user:{
          email:'',
          password:''
        }
      }
    },
    methods:{
      onLogin () {
        this.$store.dispatch('userSignIn', this.user)
      },
      resetForm(){
        this.user = {};
        this.$v.user.$reset();
      },
      openForgetPassword(){
        this.$store.commit('changeForgetPassword',true);
      },
    },
    validations:{
      user:{
        email:{
         required,
         email
        },
        password:{
          required
        }
      }
    },
    components: {
      ForgetPassword
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'forgetPassword'
        ]),
    },
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
</style>
