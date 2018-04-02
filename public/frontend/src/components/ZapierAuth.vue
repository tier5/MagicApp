<template>
  <div>
    <div class="clearfix"></div>
    <div class="row" v-if="user.isSubscribed">
      <div class="table-responsive">
        <table class="table table-bordered">
        <tbody>
          <tr>
            <td class="col-md-3">
              <p>Zapier Api Key </p>
            </td>
            <td class="col-md-3">
              <button class="btn btn-success" v-clipboard="token" @success="handleCopyAuthSuccess">Copy</button>
            </td>
          </tr>
          <tr>
            <td class="col-md-3">
              <p>Zapier Invite link</p>
            </td>
            <td class="col-md-3">
              <button class="btn btn-success" v-clipboard="inviteLink" @success="handleCopyAuthSuccess">Copy</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <div v-if="!user.isSubscribed">
     <p>Your subscription is over please subscribe to some paid plan</p>
   </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import swal from 'sweetalert2';
  export default {
    data () {
      return {
        name:'',
        inviteLink:'https://zapier.com/developer/invite/84218/e764f4aed0918a3f1f88f157d3a12d18/'
      }
    },
    computed:{
      ...mapGetters([
        'token',
        'user'
      ])
    },
    methods:{
      handleCopyAuthSuccess(e){
        swal('Copied!');
      }
    },
    created(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
