<template>
  <div>
    <!--div class="row">
      <div class="col-md-12">
        <form class="form-inline" @submit.prevent="createZapAuthToken">
          <div class="form-group mx-sm-3 mb-2">
            <label class="sr-only">Name </label>
            <input type="text" class="form-control" v-model="name" placeholder="Token Name">
          </div>
          <button type="submit" class="btn btn-primary mb-2">Submit</button>
        </form>
      </div>
    </div -->
    <div class="clearfix"></div>
    <div class="row">
      <div class="table-responsive">
        <table class="table table-bordered">
        <tbody>
          <tr>
            <td class="col-md-3">
              <p>Zapier Api Key </p>
            </td>
            <td class="col-md-3">
              <p>{{token}}</p>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
        name:''
      }
    },
    computed:{
      ...mapGetters([
        'token'
      ])
    },
    methods:{
      // createZapAuthToken(){
      //   var obj = {
      //     tokenName: this.name
      //   };
      //   obj.userId= this.user.userId;
      //   this.$store.dispatch('createZapAuthToken',obj)
      // }

    },
    created(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
