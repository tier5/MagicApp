<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex lg3 md4 sm5 hidden-xs-only class="left-aside">
          <v-card>
            <v-card class="px-0">
              <v-layout row wrap>
                <v-flex md12 lg6>
                  <div class="logo">
                    <img src="../../assets/images/dashboard-logo.png" class="logo" alt="Logo">
                  </div>
                </v-flex>
                <v-flex md12 lg6>
                  <div class="upgrade-box">
                    <v-btn class="upgrade-button" @click.prevent="changeRouterState('/magic/upgrade-membership')">
                      <span>Update Membership</span>
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-card-text class="username">
                <div>
                  <span>{{ this.user.name.charAt(0).toUpperCase() || 'Y'}}</span>
                </div>
                <span class="username-text">{{user.name.toUpperCase()}}</span>
              </v-card-text>
              <v-card-text class="left-menu">
                <ul>
                  <li @click.prevent="changeRouterState('/magic')" :class="{'active' : this.$route.path == '/magic'}">
                    <img src="../../assets/images/icon-zap.png" alt="icon" class="icon-zap">
                    <span>my zaps</span>
                  </li>
                  <li @click.prevent="changeRouterState('/magic/zapier-token')" :class="{'active' : this.$route.path == '/magic/zapier-token'}">
                    <img
                      src="../../assets/images/icon-zaptoken.png"
                      alt="icon"
                      class="icon-zaptoken"
                    >
                    <span>zapier token</span>
                  </li>
                  <li @click.prevent="changeRouterState('/magic/payment-info')" :class="{'active' : this.$route.path == '/magic/payment-info'}">
                    <img
                      src="../../assets/images/icon-payment-info.png"
                      alt="icon"
                      class="icon-payment-info"
                    >
                    <span>payment information</span>
                  </li>
                  <span v-if="this.user.isAdmin">
                    <li 
                    @click.prevent="changeRouterState('/magic/users')" 
                    :class="{'active' : this.$route.path == '/magic/users'}"
                    >
                      <img src="../../assets/images/users.png" alt="icon" class="icon-users">
                      <span>Users</span>
                    </li>
                    <li 
                      @click.prevent="changeRouterState('/magic/settings/tutorials')" 
                      :class="{'active' : this.$route.path == '/magic/settings/tutorials'}"
                      >
                      <img src="../../assets/images/icon-tutorial.png" alt="icon" class="icon-tutorial">
                      <span>Tutorial Video Settings</span>
                    </li>
                  </span>
                  <li @click.prevent="changeRouterState('/magic/training')" :class="{'active' : this.$route.path == '/magic/training'}">
                    <img src="../../assets/images/icon-tutorial.png" alt="icon" class="icon-tutorial">
                    <span>Tutorial Videos</span>
                  </li>
                  <li @click.prevent="changeRouterState('/support')">
                    <img src="../../assets/images/icon-help.png" alt="icon" class="icon-help">
                    <span>support</span>
                  </li>
                </ul>
              </v-card-text>
              <v-card-text class="create-new-zap" @click.prevent="changeRouterState('/magic/zaps/new')">
                <img src="../../assets/images/icon-createzap.png" alt="icon">
                <h2>Create a New Zap</h2>
              </v-card-text>
              <v-card-text class="total-zaps">
                <v-card-text>
                  <h3>total zaps</h3>
                  <h4>{{totalZaps}}</h4>
                </v-card-text>
                <v-card-text>
                  <h3>total page views</h3>
                  <h4>{{totalPageViews}}</h4>
                </v-card-text>
                <v-card-text>
                  <h3>total zaps triggered</h3>
                  <h4>{{totalZapsTriggered}}</h4>
                </v-card-text>
              </v-card-text>
              <v-card-text class="left-footer">
                <ul>
                  <li>
                    <v-tooltip top>
                      <v-btn slot="activator" @click="openChangePassword()">
                        <img src="../../assets/images/back-icon.png" alt="icon" class="back-icon">
                      </v-btn>
                      <span>CHANGE PASSWORD</span>
                    </v-tooltip>
                  </li>
                  <li>
                    <v-tooltip top>
                      <v-btn slot="activator" @click.prevent="changeRouterState('/magic/edit-profile')">
                        <img src="../../assets/images/user-icon.png" alt="icon" class="user-icon">
                      </v-btn>
                      <span>EDIT PROFILE</span>
                    </v-tooltip>
                  </li>
                  <li>
                    <v-tooltip top>
                      <v-btn slot="activator" @click="logout()">
                        <img
                          src="../../assets/images/icon-logout.png"
                          alt="icon"
                          class="icon-logout"
                        >
                      </v-btn>
                      <span>LOGOUT</span>
                    </v-tooltip>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex lg9 md8 sm7 class="right-aside">
          <v-layout xs12 class="hidden-sm-and-up top-bar">
            <v-flex xs8>
              <v-card class="logo">
                <img src="../../assets/images/dashboard-logo.png" class="logo" alt="Logo">
              </v-card>
            </v-flex>
            <v-flex xs2>
              <v-card class="zaps text-xs-right">
                <img src="../../assets/images/icon-zap-mobile.png" alt="icon">
              </v-card>
            </v-flex>
            <v-flex xs2>
              <v-card class="mobile-hamburger-menu text-xs-right" @click.stop="drawer = !drawer">
                <img src="../../assets/images/hamburger-button.png" alt="icon">
              </v-card>
            </v-flex>
            <v-navigation-drawer v-model="drawer" :mini-variant="mini" fixed temporary right>
              <v-card class="left-aside left-aside-mobile">
                <v-card>
                  <v-card-text class="username">
                    <div class="back-btn" @click.stop="drawer = !drawer">
                      <img src="../../assets/images/icon-back.png" alt="icon">
                    </div>
                    <div class="userMobile">
                      <div>
                        <span>{{user.name.charAt(0).toUpperCase()}}</span>
                      </div>
                        <span class="username-text">{{user.name.toUpperCase()}}</span>
                    </div>
                  </v-card-text>
                  <v-card-text class="upgrade-box">
                    <v-btn class="upgrade-button" @click.prevent="changeRouterState('/magic/upgrade-membership')">
                      <span>Update Membership</span>
                    </v-btn>
                  </v-card-text>
                  <v-card-text class="left-menu">
                    <ul>
                      <li @click.prevent="changeRouterState('/magic')" :class="{'active' : this.$route.path == '/magic'}">
                        <img src="../../assets/images/icon-zap.png" alt="icon" class="icon-zap">
                        <span>my zaps</span>
                      </li>
                      <li @click.prevent="changeRouterState('/magic/zapier-token')" :class="{'active' : this.$route.path == '/magic/zapier-token'}">
                        <img
                          src="../../assets/images/icon-zaptoken.png"
                          alt="icon"
                          class="icon-zaptoken"
                        >
                        <span>zapier token</span>
                      </li>
                      <li @click.prevent="changeRouterState('/magic/payment-info')" :class="{'active' : this.$route.path == '/magic/payment-info'}">
                        <img
                          src="../../assets/images/icon-payment-info.png"
                          alt="icon"
                          class="icon-payment-info"
                        >
                        <span>payment information</span>
                      </li>
                      <li @click.prevent="changeRouterState('/magic/training')" :class="{'active' : this.$route.path == '/magic/training'}">
                        <img src="../../assets/images/icon-tutorial.png" alt="icon" class="icon-tutorial">
                        <span>Tutorial Videos</span>
                      </li>
                      <li @click.prevent="changeRouterState('/support')">
                        <img src="../../assets/images/icon-help.png" alt="icon" class="icon-help">
                        <span>Support</span>
                      </li>
                      <span v-if="this.user.isAdmin">
                        <li @click.prevent="changeRouterState('/magic/users')" :class="{'active' : this.$route.path == '/magic/users'}">
                          <img src="../../assets/images/icon-help.png" alt="icon" class="icon-help">
                          <span>Users</span>
                        </li>
                        <li @click.prevent="changeRouterState('/magic/training/view')" :class="{'active' : this.$route.path == '/magic/training/view'}">
                          <img src="../../assets/images/icon-help.png" alt="icon" class="icon-help">
                          <span>Tutorial Video Settings</span>
                        </li>
                      </span>
                    </ul>
                  </v-card-text>
                   <v-card-text class="create-new-zap" @click.prevent="changeRouterState('/magic/zaps/new')">
                    <img src="../../assets/images/icon-createzap.png" alt="icon">
                    <h2>Create a New Zap</h2>
                  </v-card-text>
                  <v-card-text class="total-zaps">
                    <v-card-text>
                      <h3>total zaps</h3>
                      <h4>{{totalZaps}}</h4>
                    </v-card-text>
                    <v-card-text>
                      <h3>total page views</h3>
                      <h4>{{totalPageViews}}</h4>
                    </v-card-text>
                    <v-card-text>
                      <h3>total zaps triggered</h3>
                      <h4>
                        {{totalZapsTriggered}}
                      </h4>
                    </v-card-text>
                  </v-card-text>
                  <v-card-text class="left-footer text-xs-right">
                    <ul>
                      <li @click="openChangePassword()">
                        <img src="../../assets/images/back-icon.png" alt="icon" class="back-icon">
                      </li>
                      <li @click.prevent="changeRouterState('/magic/edit-profile')">
                        <img src="../../assets/images/user-icon.png" alt="icon" class="user-icon">
                      </li>
                      <li>
                        <v-tooltip top>
                          <v-btn slot="activator" @click="logout()">
                            <img
                              src="../../assets/images/icon-logout.png"
                              alt="icon"
                              class="icon-logout"
                            >
                          </v-btn>
                          <span>LOGOUT</span>
                        </v-tooltip>
                      </li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-navigation-drawer>
          </v-layout>
          <v-card>
            <v-card-text class="px-0">
              <v-layout row wrap>
                <v-flex sm6 xs12>
                  <v-card-text class="search-bar" v-if="this.$route.path == '/magic'">
                    <v-text-field placeholder="Search your zaps"  v-model="search" :change="changeSearchZap()"></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex sm6 xs12 hidden-xs-only>
                  <v-card-text class="how-it-works text-xs-right" @click.prevent="changeRouterState('/magic/training')">
                    <img src="../../assets/images/icon-video.png" alt="icon" class="icon-video">
                    <span class="hidden-sm-only">how it works</span>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-layout>
            <v-flex md1></v-flex>
            <v-flex md10>
              <div class="dashboard-body">
                
                <router-view/>
                <!-- <div class="text-color">
                  Your account has been de-activated by Admin! Please contact the admin for further
                </div> -->
              </div>
            </v-flex>
            <v-flex md1></v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- ChangePassword Component Model -->
        <changepassword></changepassword>
    <!-- End Of ChangePassword -->
  </div>
</template>

<script>
import ChangePassword from "../Auth/ChangePassword/ChangePassword.vue";
import router from "../../router/index";
import {mapGetters} from 'vuex';
import io from 'socket.io-client';
export default {
  components: {
    changepassword: ChangePassword
  },
  data() {
    return {
      drawer: null,
      mini: false,
      right: null,
      search : '',
      socket_url: process.env.VUE_APP_SOCKET_ENDPOINT,
      socket : io(process.env.VUE_APP_SOCKET_ENDPOINT)
    };
  },
  methods:{
    changeRouterState(path){
      router.push(path)
    },
    logout(){
      this.$store.dispatch('userSignOut', {});
    },
    openChangePassword(){
      
      this.$store.commit('changeIsChangePasswordModalOpen', true);
    },
    changeSearchZap(){
      this.$store.commit('setSearchZap', this.search);
    }
  },
  computed: {
    ...mapGetters([
        'user',
        'zapStats',
        'searchZap'
    ]),
    totalPageViews: function(){
      return this.zapStats.totalPageViews
      
      
    },
    totalZaps: function(){
      
      return this.zapStats.totalZaps
     
      
    },
    totalZapsTriggered: function(){
     
      return this.zapStats.totalZapsTriggered
      
      
    }
  },
  created(){
    this.$store.dispatch('getZapStats',{});
    if(!this.user.name){
      this.logout();
    }
    this.$store.dispatch('getUserCurrentSubscribtion');
  },
  mounted(){
    this.$store.dispatch('getUserPrimaryData', {});
    this.$store.commit('checkCookiePolicy');
    this.socket.emit('join', { user : this.user.email});
    this.socket.on('refresh-stats',(data)=> {
      this.$store.dispatch('getZapStats',{});
      this.$store.dispatch('getZap',this.user);

    })
  }
};
</script>


<style lang='scss'>

  @import "../../styles/common.scss";
  @import "./Dashboard.scss";

</style>
