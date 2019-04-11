<template>
    <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex md12>
          <v-card class="section first-section">
            <v-card-text class="top-bar">
              <v-layout row wrap>
                <v-flex md6 sm12>
                  <div class="logo" @click="customRouter('/')">
                    <a>
                      <img src="../../assets/images/dashboard-logo.png" class="logo" alt="Logo">
                    </a>
                  </div>
                </v-flex>
                <v-flex md6 hidden-sm-and-down>
                  <v-toolbar>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn flat v-if="!isAuthenticated" @click="customRouter('/#feature')">Features</v-btn>
                      <v-btn flat v-if="!isAuthenticated" @click="customRouter('/#pricing')">Pricing</v-btn>
                      <v-btn flat v-if="isAuthenticated" @click="customRouter('/magic')">Dashboard</v-btn>
                      <v-btn flat  @click="customRouter('/support')">Support</v-btn>
                      <span class="freetrialbtn"  v-if="!isAuthenticated" @click="customRouter('/register')">14 day free trial</span>
                      <span
                        class="loginbtn"
                        @click="openLoginModel()"
                        v-if="!isAuthenticated"
                      >
                        <img src="../../assets/images/user-icon-white.png" alt="user-icon"> Login
                      </span>
                      <span
                        class="loginbtn"
                        @click="signOut()"
                        v-if="isAuthenticated"
                      >
                        <img src="../../assets/images/icon-logout.png" alt="user-icon"> Logout
                      </span>
                    </v-toolbar-items>
                  </v-toolbar>
                </v-flex>
              </v-layout>
              <v-layout class="hidden-md-and-up top-bar right">
                <v-card class="mobile-hamburger-menu" @click.stop="drawer = !drawer">
                  <img src="../../assets/images/hamburger-button.png" alt="icon">
                </v-card>
                <v-navigation-drawer v-model="drawer" :mini-variant="mini" fixed temporary right>
                  <v-card class="left-aside left-aside-mobile">
                    <v-card>
                      <v-card-text class="username">
                        <div class="back-btn" @click.stop="drawer = !drawer">
                          <img src="../../assets/images/icon-back.png" alt="icon" />
                        </div>
                        <div class="userMobile">
                          <div v-if="isAuthenticated">
                            <img src="../../assets/images/logo.svg" alt="icon" />
                          </div>
                          <div v-if="isAuthenticated">
                            <span>S</span>
                          </div>
                          <span class="username-text" v-if="isAuthenticated">User name</span>
                        </div>
                      </v-card-text>
                      <v-card-text class="left-menu">
                        <ul>
                          <li v-if="!isAuthenticated" @click="customRouter('/#feature')">
                            <img src="../../assets/images/icon-zap.png" alt="icon" class="icon-zap">
                            <span>Features</span>
                          </li>
                          <li v-if="!isAuthenticated" @click="customRouter('/#pricing')">
                            <img src="../../assets/images/icon-help.png" alt="icon" class="icon-help">
                            <span>Pricing</span>
                          </li>
                          <li v-if="!isAuthenticated" @click="customRouter('/register')">
                            <span class="freetrialbtn">14 day free trial</span>
                          </li>
                          <li v-if="!isAuthenticated">
                            <span class="loginbtn" @click="openLoginModel()">
                              <img src="../../assets/images/user-icon-white.png" alt="user-icon"> Login
                            </span>
                          </li>
                          <li v-if="isAuthenticated">
                            <span class="loginbtn" @click="customRouter('/magic')">
                              <img src="../../assets/images/user-icon-white.png" alt="user-icon"> Dashboard
                            </span>
                          </li>
                          <li v-if="isAuthenticated">
                            <span @click="signOut()" v-if="isAuthenticated">
                              <img src="../../assets/images/icon-logout.png" alt="user-icon"> 
                              <span>Logout</span>
                            </span>
                          </li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-card>
                </v-navigation-drawer>
              </v-layout>
             
              <v-layout row wrap>
                <v-flex md12>
                        <div id="root">
                            <iframe src="https://magiczap.nolt.io/" class="iframe-div"></iframe>
                            <div>
                            <p>
                                For any product related support please click on the messenger button showing on the right bottom corner of this page and connect with us.
                            </p>
                            </div>
                        </div>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card class="section frontend-footer">
            <v-layout row wrap>
              <v-flex md12>
                <v-card-text class='text-xs-center'>
                  <div class="footer-top">
                    <v-btn class="free-trial-btn" @click="customRouter('/register')">Start 14 Days FREE Trial</v-btn>
                    <img src="../../assets/images/footer-logo.png" alt="footer-logo">
                  </div>
                  <div class="footer-bottom">
                    <span>A marketing effort by</span>
                    <h5>Jon Vaughn </h5>
                  </div>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-flex md12 xs12 class="acceptanceTxt">
              <div class="container">
                <p>By creating your account to use Magiczap, you are agreeing to our <a @click.prevent="customRouter('/terms-and-conditions')">Terms of Service</a> and <a @click.prevent="customRouter('/privacy-policy')">Privacy Policy</a></p>
              </div>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
     <!-- Child Components Modals -->
        <Login></Login>
        <ForgetPassword />
    <!-- End of Child Components -->
    <div class="fb-customerchat fb_invisible_flow" page_id="205868603526267" ref="b64:V2VsY29tZSBtZXNzYWdl"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Login from "../../components/Auth/Login/Login.vue";
import ForgetPassword from "../../components/Auth/ForgetPassword/ForgetPassword.vue";
export default {
    data(){
        return {
            drawer: null,
            mini: false,
            duration: 300,
            offset: 0,
        }
    },
     computed: {
    // mix the getters into computed with object spread operator
        ...mapGetters([
        "isLoginModalOpen",
        "isAuthenticated"
        ]),
        options () {
            return {
                duration: this.duration,
                offset: this.offset,
                easing: this.easing
            }
        },
    
    },
    components: {
        Login,
        ForgetPassword
    },
    methods: {
        openLoginModel() {
            this.$store.commit("changeIsLoginModalOpen", true);
        },
        signOut(){
            this.$store.commit('userSignOut');
        },
        customRouter(path){
            this.$store.commit('changeRoute', path);
        }
    },
    created(){
        //this.$store.commit('checkUserAuthentication');
        this.$store.commit('checkCookiePolicy');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, 
    mounted(){
        // var div = document.createElement('div');
        // div.className = 'fb-customerchat';
        // div.setAttribute('page_id', '205868603526267');
        // div.setAttribute('ref', 'b64:V2VsY29tZSBtZXNzYWdl');
        // document.body.appendChild(div);
        // console.log(div);
        window.fbMessengerPlugins = window.fbMessengerPlugins || {
        init: function () {
            FB.init({
            appId            : '1678638095724206',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v3.0'
            });
        }, callable: []
        };
        window.fbAsyncInit = window.fbAsyncInit || function () {
        window.fbMessengerPlugins.callable.forEach(function (item) { item(); });
        window.fbMessengerPlugins.init();
        };
        setTimeout(function () {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        }, 0);
    },
    destroyed(){
        // let nodes = document.getElementsByClassName('fb-customerchat');
        // if (nodes.length){
        //     for(let i = 0; i < nodes.length; i ++){
        //         nodes[i].remove()
        //     }
        // }
    }
}
</script>

<style>
 @import '../../styles/common.scss';
 @import '../../views/Home/Home.scss';
 @import './Support.scss';
</style>
