<template>
  <div class="row" >
    <div class="col-md-12">
      <!--Nav Bar -->
      <nav class="navbar app__header">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Magic App</a>
          </div>

          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                <span class="glyphicon glyphicon-user"></span>Profile<b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li><a @click="onSignOut">Logout</a></li>
                <!-- <li><a @click="onZapierAuth">Zapier Token</a></li> -->
                <li><a @click="home">Home</a></li>
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
  import router from '../router/index'
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    pointer : cursor;
  }
  .app__header{
    border-bottom: solid 1px #cccccc;
  }
</style>
