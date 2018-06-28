<template>
  <div>
   <div v-if="user.isSubscribed">
    <div class="row">
    <div class="col-md-12">
      <button class="btn btn-primary" @click.prevent="ShowScriptCreationModal()">New Magic Script</button>
    </div>
    </div>
    <div class="clearfix"></div>
    <div class="clearfix"></div>
    <div class="row" v-if="magicScripts.length">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Domain Name</th>
                <th>Script</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ms, index) in magicScripts" :key="ms._id">
                <td>{{index+1}}</td>
                <td>
                  <span v-if="editing != ms._id">
                    {{ms.name}}
                    <a href="#" @click.prevent="inlineEdit(ms._id)"><i class="fa fa-edit fa-2x" aria-hidden="true"></i></a>
                  </span>
                  <span v-if="editing == ms._id">
                    <input type="text" v-model="ms.name"/>
                    <a href="#" @click.prevent="editScript(ms)"><i class="fa fa-send"></i></a>
                  </span>
                </td>
                <td>
                  <button v-clipboard="ms.scriptString" class="btn btn-success" @success="handleCopySuccess">Copy script</button>
                </td>
                <td>
                  <toggle-button v-model="ms.isActive" :labels="{checked: 'ON', unchecked: 'OFF'}" @change="updateScript(ms._id)"/>
                </td>
                <td>
                  <span>
                    <!--a href=""><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a-->
                    <a href="#" @click.prevent="deleteScript(ms._id)"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <modal v-if="isShowScriptModal"></modal>
    <view-script v-if="viewScript"></view-script>
   </div>
   <div v-if="!user.isSubscribed">
     <p>Your subscription is over please subscribe to some paid plan</p>
   </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Modal from './ZapScriptModalForm.vue';
  import swal from 'sweetalert2';
  import ViewScript from './ViewScript.vue'
  export default {
    data () {
      return {
        viewScriptData:{},
        editing: ''
      }
    },
    methods:{
      deleteScript(id){
        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover the script',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteScript',id);
          } else if (result.dismiss === 'cancel') {
            swal(
              'Cancelled',
              'Your script is safe :)',
              'error'
            )
          }
        })

      },
      ShowScriptCreationModal(){
        this.$store.commit('ShowScriptCreationModal');
      },
      inlineEdit(id){
        this.editing = id;
        // this.$store.dispatch('updateScript',id);
      },
      handleCopySuccess(e){
        swal('Copied!');
      },
      editScript(ms){
        this.$store.dispatch('updateScript',ms);
        this.editing = '';
      },
      updateScript(id) {
        this.$store.dispatch('changeStatus',id);
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'user',
            'magicScripts',
            'isShowScriptModal',
            'viewScript'
        ]),
    },
    components:{
      Modal,
      ViewScript
    },
    created(){
      this.$store.dispatch('getScripts',this.user);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    pointer : cursor;
  }
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
    width: 700px;
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

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .copy-alert {
    position: absolute;
    float: right;
  }
</style>
