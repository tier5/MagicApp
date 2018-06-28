<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                Create Your Script
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <form>
                  <div class="row form-group" v-bind:class="{ 'form-group--error': $v.newScript.name.$error }">
                    <div class="col-md-6">
                      <input type="text"
                             class="form-control"
                             placeholder="Domain Name"
                             v-model="newScript.name"
                             @blur="$v.newScript.name.$touch">
                      <span class="form-group__message"
                            v-if="!$v.newScript.name.required && $v.newScript.name.$error">
                        Domain Name is Required
                      </span>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </form>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="row">
                  <div class="col-sm-1 pull-right">
                    <button class="modal-default-button btn btn-primary" @click.prevent="HideModal()">Close</button>
                  </div>
                  <div class="col-sm-1 pull-right" v-if="!newScript._id">
                    <button class="btn btn-success pull-right" @click.prevent="createNewScript()" :disabled="$v.newScript.$invalid">Submit</button>
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
  import { mapGetters } from 'vuex';
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        validationTypes:[
          {
            id:1,
            type:'Exists'
          },
          {
            id:2,
            type:'=',
          },
          {
            id:3,
            type:'!=',
          }
        ],
        newScript:{
          name:''
        }
      }
    },
    methods:{
      HideModal(){
        this.$store.commit('hideModal');
      },
      createNewScript(){
        this.$store.dispatch('createNewScript',this.newScript);
        this.$store.dispatch('getScripts',this.user);
      }
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'user',
        'ms'
      ])
    },
    validations:{
      newScript:{
        name:{
          required
        }
      }
    },
    created:function(){
      if (this.ms._id){
        this.newScript = this.ms;
      }
    },
    destroyed: function(){
      this.$store.commit('viewScript',{});
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
    height: 60%;
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
