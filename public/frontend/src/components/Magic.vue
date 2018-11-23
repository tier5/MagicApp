<template>
  <div>
   <div v-if="user.isSubscribed">
    <div class="row">
    <div class="col-md-12">
      <button class="btn btn-primary" @click.prevent="ShowModal()">New Zap</button>
    </div>
    </div>
    <div class="clearfix"></div>
    <div class="clearfix"></div>
    <div class="row" v-if="zaps.length">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Zap Name</th>
                <th>Script</th>
                <th><span data-toggle="tooltip" title="Add url params to all the anchor tag elements"> Magic Option</span></th>
                <th><span data-toggle="tooltip" title="Change the dom with the url params and given params attribute">Append HTML</span></th>
                <th><span data-toggle="tooltip" title="Send stored cookie (existing url params) to the zapier">Cookie</span></th>
                <th>Page Views</th>
                <th>Zaps</th>
                <th>View</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(zap, index) in zaps" :key="zap._id">
                <td>{{index+1}}</td>
                <td>{{zap.name}}</td>
                <td>
                  <button v-clipboard="zap.scriptString" class="btn btn-success" @success="handleCopySuccess">Copy</button>
                </td>
                <td>
                  <toggle-button v-model="zap.magicOption" :labels="{checked: 'ON', unchecked: 'OFF'}" @change="updateZap(zap)"/>
                </td>
                <td>
                  <toggle-button v-model="zap.elementOption" :labels="{checked: 'ON', unchecked: 'OFF'}" @change="updateZap(zap)"/>
                </td>
                <td>
                  <toggle-button v-model="zap.cookieOption" :labels="{checked: 'ON', unchecked: 'OFF'}" @change="updateZap(zap)"/>
                </td>
                <td>
                  {{zap.pageViewCount}}
                </td>
                <td>
                  {{zap.zapierTriggerCount}}
                </td>
                <td>
                  <a href="#" @click.prevent="viewParams(zap)"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></a>
                </td>
                <td>
                  <span>
                    <!--a href=""><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a-->
                    <a href="#" @click.prevent="deleteZap(zap._id)"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a>
                  </span>
                </td>
                <td>
                  <span>
                    <!--a href=""><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a-->
                    <a href="#" @click.prevent="editZap(zap)"><i class="fa fa-edit fa-2x" aria-hidden="true"></i></a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <modal v-if="isShowModal"></modal>
    <view-zap v-if="viewZap"></view-zap>
   </div>
   <div v-if="!user.isSubscribed">
     <p>Your subscription is over please subscribe to some paid plan</p>
   </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Modal from './ZapModalForm.vue';
  import swal from 'sweetalert2';
  import ViewZap from './ViewZap.vue'
  export default {
    data () {
      return {
        viewZapData:{}
      }
    },
    methods:{
      deleteZap(id){
        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover the zap',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteZap',id);
          } else if (result.dismiss === 'cancel') {
            swal(
              'Cancelled',
              'Your zap is safe :)',
              'error'
            )
          }
        })
        
      },
      viewParams(zap){
        this.$store.commit('viewZap',zap);
        this.$store.commit('alterViewZap',true);
      },
      ShowModal(){
        this.$store.commit('showModal');
      },
      updateZap(zap){
        this.$store.dispatch('updateZap',zap);
      },
      handleCopySuccess(e){
        swal('Copied!');
      },
      editZap(zap){
        this.$store.commit('showModal');
        this.$store.commit('viewZap',zap);
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'user',
            'zaps',
            'isShowModal',
            'viewZap'
        ]),
    },
    components:{
      Modal,
      ViewZap
    },
    created(){
      this.$store.dispatch('getZap',this.user);
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
