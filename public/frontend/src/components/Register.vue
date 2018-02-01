<template>
  <div>
    <div class="row app_register">
      <div class="col-md-3"></div>
      <div class="col-md-6 app_register_form">
        <form @submit.prevent="onSignUp">
          <div class="row form-group">
            <div class="col-md-12">
              <p style="text-align: center"><b>MAGIC APP</b></p>
            </div>
          </div>
          <div class="row form-group"
               v-bind:class="{ 'form-group--error': $v.userSU.email.$error }">
            <div class="col-md-12">
              <label class="control-label col-xs-2">Email</label>
              <div class="col-xs-10">
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
              <label  class="control-label col-xs-2">Name</label>
              <div class="col-xs-10">
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
              <label  class="control-label col-xs-2">Password</label>
              <div class="col-xs-10">
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
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
  import { required, email} from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        userSU:{
          name:'',
          email:'',
          password:''
        }
      }
    },
    methods:{
      onSignUp () {
        this.$store.dispatch('userSignUp', this.userSU)
      },
      resetForm(){
        this.userSU = {};
        this.$v.userSU.$reset();
      }
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
          required
        }
      }
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
</style>
