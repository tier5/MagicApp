<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                Create Your Zap
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <form>
                  <div class="row form-group" v-bind:class="{ 'form-group--error': $v.newZap.zapName.$error }">
                    <div class="col-md-6">
                      <input type="text"
                             class="form-control"
                             placeholder="Zap Name"
                             v-model="newZap.zapName"
                             @blur="$v.newZap.zapName.$touch">
                      <span class="form-group__message"
                            v-if="!$v.newZap.zapName.required && $v.newZap.zapName.$error">
                        Zap Name is Required
                      </span>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                  <div class="row">
                    <div class="col-md-2">
                      <button class="btn btn-default" @click.prevent="addRemoveZapParams('',2)">Add</button>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                  <div class="row form-group" v-for="(param,zapIndex) in newZap.params">
                    <div class="col-md-3">
                      <input type="text" class="form-control" placeholder="Name" v-model="param.zapField" required>
                    </div>
                    <div class="col-md-3">
                      <select class="form-control" v-model="param.validationId">
                        <option value="">Select Options</option>
                        <option v-for="(item, index) in validationType" :value="item.id">
                          {{item.type}}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <input type="text"
                             class="form-control"
                             placeholder="Value"
                             v-model="param.zapValue"
                             v-if="param.validationId ===2 || param.validationId==3">
                    </div>
                    <div class="col-md-1">
                      <a @click="addRemoveZapParams(zapIndex,3)" ><span class="glyphicon glyphicon-minus"></span></a>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </form>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="row">
                  <div class="col-sm-1 pull-right">
                    <button class="modal-default-button btn btn-primary" @click.prevent="HideModal()">Close</button>
                  </div>
                  <div class="col-sm-1 pull-right">
                    <button class="btn btn-success pull-right" @click.prevent="createNewZap()" :disabled="$v.newZap.$invalid">Submit</button>
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
        validationType:[
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
        newZap:{
          id:'',
          zapName:'',
          params:[]
        }
      }
    },
    methods:{
      HideModal(){
        this.$store.commit('hideModal');
      },
      addRemoveZapParams(index,type){
        if (type==2){
          this.newZap.params.push({
            zapField:'',
            validationId:'',
            zapValue:''
          })
        } else {
          //console.log(index);
          this.newZap.params.splice(index,1);
        }
      },
      createNewZap(){
        var obj = {};
        obj.newZap = this.newZap;
        obj.user= this.user;
        this.$store.dispatch('createNewZap',obj);
      },
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'user'
      ])
    },
    validations:{
      newZap:{
        zapName:{
          required
        }
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
    width: 90%;
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

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }
  .form-group--error input{
    border-color: red;
  }
  .form-group__message{
    color: red;
  }

</style>
