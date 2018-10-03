<template>
  <div>
    <div class="clearfix"></div>
    <div class="row" v-if="user.isSubscribed">
      <div class="table-responsive">
        <table class="table table-bordered">
        <tbody>
          <tr>
            <td class="col-md-3">
              <p>Api Key </p>
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
          <tr>
            <td class="col-md-3">
              <p>Integromat Invite link</p>
            </td>
            <td class="col-md-3">
              <button class="btn btn-success" v-clipboard="integromatInviteLink" @success="handleCopyAuthSuccess">Copy</button>
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
        inviteLink:'https://zapier.com/developer/invite/96885/cd80710164f70d1253e86dd35cb877fd/',
        integromatInviteLink : 'https://www.integromat.com/en/apps/invite/mazic-zap-168950/43c7b263eed33e2204b5d36904956ec3'
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
