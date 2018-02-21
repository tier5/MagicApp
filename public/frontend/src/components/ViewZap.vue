<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <b>Zap Name : </b> {{zap.name}}
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div class="row">
                  <div class="col-md-12 col-sm-6">
                    <p>Zaps params </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Field Name</th>
                          <th>Field Validation</th>
                          <th>Field Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(field, index) in zap.params" :key="index">
                          <td>{{field.field_name}}</td>
                          <td>{{field.validationType}}</td>
                          <td>{{field.field_value}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="clearfix"></div>
                <div class="row">
                  <div class="col-md-12 col-sm-6">
                    <p>Element Attributes  </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3 table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Attribute Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(field, index) in zap.element_attributes" :key="index">
                          <td>{{field.attribute_name}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="row">
                  <div class="col-sm-1 pull-right">
                    <button class="modal-default-button btn btn-primary" @click.prevent="HideModal()">Close</button>
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
  import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
      }
    },
    methods:{
        HideModal(){
            this.$store.commit('alterViewZap',false);
        }
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'user',
        'viewZap',
        'zap'
      ])
    },
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
