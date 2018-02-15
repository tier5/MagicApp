<template>
  <div class="container">
    <div class="row app_register">
      <div class="col-md-3"></div>
      <div class="col-md-6 app_register_form">
        <form @submit.prevent="onResetPassword">
          <div class="row form-group">
            <div class="col-md-12">
              <p style="text-align: center"><b>AMGAGICZAP</b></p>
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
                <span class="form-group__message"
                      v-if="!$v.user.password.minLength && $v.user.password.$error">
                 Minimum lenth should be 6 
                </span>
              </div>
            </div>
          </div>
          <div class="row form-group"
               v-bind:class="{ 'form-group--error': $v.user.confirmPassword.$error }">
            <div class="col-md-12">
              <label  class="control-label col-xs-2">Confirm Password</label>
              <div class="col-xs-10">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="user.confirmPassword"
                  @blur="$v.user.confirmPassword.$touch()">
                <span class="form-group__message"
                      v-if="!$v.user.confirmPassword.sameAsPassword && $v.user.password.$error">
                  Password didn't matched!
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-6">
              <button type="submit" class="btn btn-success" :disabled="$v.user.$invalid">Reset Password</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import { required,sameAs, minLength} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user:{
        password:'',
        confirmPassword:''
      },
      resetToken:''
    }
  },
  methods:{
    onResetPassword(){
      var payload = {
        password: this.user.password,
        token : this.resetToken
      };
      this.$store.dispatch('resetForget',payload)
    }
  },
  validations:{
    user:{
      password:{
        required,
        minLength: minLength(6)
      },
      confirmPassword:{
        sameAsPassword: sameAs('password')
      }
    }
  },
  created(){
    this.resetToken = this.$route.params.token
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .app_register_form {
    border: solid 1px gray;
    padding: 20px;
    border-radius:25px;
  }
  .app_register {
    margin-top: 200px;
  }
  .form-group--error input {
    border-color: red;
  }
  .form-group__message { 
    color: red;
  }
</style>
