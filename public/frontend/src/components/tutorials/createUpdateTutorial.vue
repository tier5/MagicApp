<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                <strong>Tutorials</strong>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                  <form>
                      <div class="row form-group" v-bind:class="{ 'form-group--error': $v.newTutorial.title.$error }">
                        <div class="col-md-6">
                            <label> Title</label>
                            <input type="text"
                                class="form-control"
                                placeholder="title"
                                v-model="newTutorial.title"
                                @blur="$v.newTutorial.title.$touch">
                            <span class="form-group__message"
                                v-if="!$v.newTutorial.title.required && $v.newTutorial.title.$error">
                                Title is required!
                            </span>
                        </div>
                      </div>
                      <div class="row form-group" v-bind:class="{ 'form-group--error': $v.newTutorial.description.$error }">
                        <div class="col-md-6">
                            <label> Description</label>
                            <input type="text"
                                class="form-control"
                                placeholder="description"
                                v-model="newTutorial.description"
                                @blur="$v.newTutorial.description.$touch">
                            <span class="form-group__message"
                                v-if="!$v.newTutorial.description.required && $v.newTutorial.description.$error">
                                Description is required!
                            </span>
                        </div>
                      </div>
                      <div class="row form-group" v-bind:class="{ 'form-group--error': $v.newTutorial.source.$error }">
                        <div class="col-md-6">
                            <label> Source</label>
                            <input type="text"
                                class="form-control"
                                placeholder="source"
                                v-model="newTutorial.source"
                                @blur="$v.newTutorial.source.$touch">
                            <span class="form-group__message"
                                v-if="!$v.newTutorial.source.required && $v.newTutorial.source.$error">
                                Source is required!
                            </span>
                        </div>
                      </div>
                      <div class="row form-group" v-bind:class="{ 'form-group--error': $v.newTutorial.order.$error }">
                        <div class="col-md-6">
                            <label> Order</label>
                            <input type="text"
                                class="form-control"
                                placeholder="Order"
                                v-model="newTutorial.order"
                                @blur="$v.newTutorial.order.$touch" min="0">
                            <span class="form-group__message"
                                v-if="!$v.newTutorial.order.required && $v.newTutorial.order.$error">
                                Order is required!
                            </span>
                        </div>
                      </div>
                  </form>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="row">
                  <div class="col-sm-1 pull-right">
                    <button class="modal-default-button btn btn-primary" @click.prevent="closeModal()">Close</button>
                  </div>
                  <div class="col-sm-1 pull-right">
                    <button class="btn btn-success pull-right" v-if="!newTutorial._id" @click.prevent="createTutorial()" :disabled="$v.newTutorial.$invalid">Submit</button>
                  </div>
                  <div class="col-sm-1 pull-right">
                    <button class="btn btn-success pull-right" v-if="newTutorial._id" @click.prevent="updateTutorial()" :disabled="$v.newTutorial.$invalid">Update</button>
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
        newTutorial:{
          title : '',
          description : '',
          source:'',
          order: null
        }
      }
    },
    methods:{
      createTutorial(){
        this.$store.dispatch('createTutorial',this.newTutorial);
      },
      updateTutorial(){
        //console.log(this.newTutorial);
        this.$store.dispatch('updateTutorial', this.newTutorial);
      },
      closeModal(){
        this.$store.commit('changeCreateAndUpdateModal', false)
      }
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'editTutorial'
      ])
    },
    validations:{
      newTutorial:{
          title: {required},
          description : {required},
          source: {required},
          order:{required}

      }
    },
    created:function(){
      if (this.editTutorial._id){
        const tempObj = Object.assign({}, this.editTutorial);
        this.newTutorial = tempObj;
      }
    },
    destroyed: function(){
      this.$store.commit('changeEditTutorial',{});
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
