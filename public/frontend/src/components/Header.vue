<template>
  <div class="row" >
    <div class="col-md-12">
      <!--Nav Bar -->
      <nav class="navbar app__header">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" ><router-link to="/magic">Magic Zap</router-link></a>
          </div>
          
          <ul class="nav navbar-nav navbar-right">
            <li v-if="user.isAdmin"><a href="" @click.prevent="customRouterPush('/users')">Users</a></li>
            <li><a href="" @click.prevent="customRouterPush('/plans')">Plans</a></li>
            <li class="dropdown">
              <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                <span class="glyphicon glyphicon-user"></span>Profile<b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li><a @click.prevent="onSignOut" href="">Logout</a></li>
                <li><a @click.prevent="onZapierAuth" href="">Zapier Token</a></li>
                <li><a @click.prevent="home" href="">Home</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <!--End-->
    </div>
  </div>
</template>

<script>
  import router from '../router/index';
  import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
      }
    },
    methods:{
      onSignOut(){
        this.$store.dispatch('userSignOut');
      },
      onZapierAuth(){
        router.push('/zapier-auth');
      },
      home(){
        router.push('/magic')
      },
      customRouterPush(routeRef){
        var slashRoute = routeRef;
        router.push(slashRoute)
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'user'
        ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    pointer : cursor;
    text-decoration: none;
  }
  .app__header{
    border-bottom: solid 1px #cccccc;
  }
</style>
