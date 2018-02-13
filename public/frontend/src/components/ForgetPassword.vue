<template>
  <div>
     <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <b>Forget Your Password ? </b>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div class="row">
                  <form>
                    <input type="email" name="" id="" v-model="email" required placeholder="Email Address" class="form-control">
                  </form>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="row">
                  <div class="col-sm-2 pull-right">
                    <button class="modal-default-button btn btn-success" @click.prevent="submitForgetPassword">Forget Password</button>
                  </div>
                  <div class="col-sm-3 pull-right">
                    <button class="modal-default-button btn btn-primary" @click.prevent="closeForgetPassword">Cancel</button>
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
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      email:''
    }
  },
  methods:{
    submitForgetPassword(){
      var payload = {
        email: this.email
      }
      this.$store.dispatch('forgetPassword',payload);
    },
    closeForgetPassword(){
      this.$store.commit('changeForgetPassword',false);
    }
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
    width: 50%;
    overflow-y: auto;
    height: 30%;
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
