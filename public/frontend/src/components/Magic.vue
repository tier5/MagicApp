<template>
  <div>
   <div class="row">
     <div class="col-md-12">
       <button class="btn btn-primary" @click.prevent="ShowModal()">New Zap</button>
     </div>
   </div>
    <div class="clearfix"></div>
    <div class="clearfix"></div>
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>#</th>
              <th>Zap Name</th>
              <th>Script</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(zap,index) in zaps">
              <td>{{index+1}}</td>
              <td>{{zap.zap_name}}</td>
              <td>&lt;script type="text/javascript" src= "http://localhost:8000/mscript/build.js" id="magic_app_script" data-script-id={{zap.id}}&gt; &lt;&#47;script&gt;</td>
              <td>
                <span>
                  <a href=""><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                  <a href="" @click.prevent="deleteZap(zap.id)"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <modal v-if="isShowModal"></modal>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Modal from './ZapModalForm.vue'
  export default {
    data () {
      return {
      }
    },
    methods:{
      deleteZap(id){
        //console.log(id);
        this.$store.dispatch('deleteZap',id);
      },
      ShowModal(){
        this.$store.commit('showModal');
      }
    },
      computed: {
          // mix the getters into computed with object spread operator
          ...mapGetters([
              'user',
              'zaps',
              'isShowModal'

          ])
      },
    created(){
      this.$store.dispatch('getZap',this.user);
    },
    components:{
      'modal': Modal
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
</style>
