<template>
  <div class="container">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <b>Create New Free User </b>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="row">
                  <form>
                    <div class="row form-group"
                          v-bind:class="{ 'form-group--error': $v.user.name.$error }">
                        <div class="col-md-12">
                          <label  class="control-label col-md-2">Name </label>
                          <div class="col-md-6">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Name"
                                v-model="user.name"
                                @blur="$v.user.name.$touch()">
                              <span class="form-group__message"
                                  v-if="!$v.user.name.required && $v.user.name.$error">
                                Required!
                              </span>
                          </div>
                        </div>
                      </div>
                      <div class="row form-group"
                          v-bind:class="{ 'form-group--error': $v.user.email.$error }">
                        <div class="col-md-12">
                          <label  class="control-label col-md-2">Email </label>
                          <div class="col-md-6">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Email"
                                v-model="user.email"
                                @blur="$v.user.email.$touch()">
                              <span class="form-group__message"
                                  v-if="!$v.user.email.required && $v.user.email.$error">
                                Required!
                              </span>
                          </div>
                        </div>
                      </div>
                      <div class="row form-group"
                          v-bind:class="{ 'form-group--error': $v.user.password.$error }">
                        <div class="col-md-12">
                          <label  class="control-label col-md-2">Password</label>
                          <div class="col-md-6">
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
                            <label  class="control-label col-md-2">Confirm Password</label>
                            <div class="col-md-6">
                              <input
                                type="password"
                                class="form-control"
                                placeholder="Password"
                                v-model="user.confirmPassword"
                                @blur="$v.user.confirmPassword.$touch()">
                              <span class="form-group__message"
                                  v-if="!$v.user.confirmPassword.sameAsPassword && $v.user.confirmPassword.$error">
                                Password didn't match !
                              </span>
                            </div>
                          </div>
                      </div>
                    </form>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="row">
                  <div class="col-sm-2 pull-right">
                   <button type="submit" class="btn btn-success" :disabled="$v.user.$invalid" @click.prevent="onCreateUser">Create User</button>
                  </div>
                  <div class="col-sm-3 pull-right">
                    <button class="modal-default-button btn btn-primary" @click.prevent="resetCreateUserForm">Cancel</button>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { required,sameAs, minLength, email} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      user:{
        name: '',
        email:'',
        password:'',
        confirmPassword:''
      }
    }
  },
  methods:{
    onCreateUser(){
      var payload = {
        newUser : this.user
      };
      //console.log(payload);
      this.$store.dispatch('createNewUser',payload)
    },
    resetCreateUserForm(){
      this.$store.commit('changeOpenCreateUsersModel',false);
    }
  },
  validations:{
    user:{
      email: {
          required,
          email
      },
      name : {
          required
      },
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 60%;
    overflow-y: auto;
    height: 45%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }
  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }
  .form-group--error input{
    border-color: red;
  }
  .form-group--error select{
    border-color: red;
  }
  .form-group__message{
    color: red;
  }
</style>
