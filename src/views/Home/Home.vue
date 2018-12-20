<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex md12>
          <v-card class="first-section">
            <v-card-text class="top-bar">
              <v-layout row wrap>
                <v-flex md6 sm12>
                  <div class="logo">
                    <img src="../../assets/images/dashboard-logo.png" class="logo" alt="Logo">
                  </div>
                </v-flex>
                <v-flex md6 hidden-sm-and-down>
                  <v-toolbar>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn flat v-if="!isAuthenticated">Features</v-btn>
                      <v-btn flat v-if="!isAuthenticated">Pricing</v-btn>
                      <v-btn flat v-if="isAuthenticated" @click="customRouter('/magic')">Dashboard</v-btn>
                      <span
                        class="freetrialbtn"
                        
                       v-if="!isAuthenticated"
                      >14 day free trial</span>
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
                          <div>
                            <span>home</span>
                          </div>
                        </div>
                      </v-card-text>
                      <v-card-text class="left-menu">
                        <ul>
                          <li>
                            <img src="../../assets/images/icon-zap.png" alt="icon" class="icon-zap">
                            <span>my zaps</span>
                          </li>
                          <li>
                            <img src="../../assets/images/icon-help.png" alt="icon" class="icon-help">
                            <span>help</span>
                          </li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-card>
                </v-navigation-drawer>
              </v-layout>
              <v-layout row wrap>
                <v-flex md7 sm7>
                  <div class="banner-left">
                    <span class="makeweb">make your website</span>
                    <h1>a Sales Tool Again</h1>
                    <p>Personalise, Track, and Engage your website visitors with a simple yet powerful software</p>
                    <v-btn class="free-trial-btn">Start 14 Days FREE Trial</v-btn>
                  </div>
                </v-flex>
                <v-flex md5 sm5>
                  <div class="banner-right">
                    <img src="../../assets/images/video-screen.png" alt="video-screen">
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card class="second-section"  v-animate.repeat.fade="'slide-up'">
            <v-layout row wrap>
              <v-flex md3></v-flex>
              <v-flex md6>
                <v-card-text class="simple-text">
                  <h2>Create a Customized Sales Experience for Your Customers</h2>
                  <p>Magic Zap is a very powerful and magical software. Magic Zap will allow you to present personalised dynamic websites to your visitors. It will also let you send follow up emails, calls, sms or chatbot messages while your visitors are on your site engaged and ready to buy. You have to have this tool if you want to compete.</p>
                </v-card-text>
              </v-flex>
              <v-flex md3></v-flex>
            </v-layout>
          </v-card>
          <v-card class="third-section">
            <v-layout row wrap>
              <v-flex md12>
                <div class="block-head">
                  <span>how it works</span>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="three-blocks">
              <v-flex md4>
                <div class="hwt-block">
                  <img src="../../assets/images/hiw_icon1.png" alt="hiw_icon">
                  <v-card-text class="simple-text">
                    <h3>Create Personalized &amp; Pre-Populated Forms</h3>
                    <p>Increase your sales and conversions by removing the hassle of inputting redundant information. Magic Zap can personalize your landing page and populate the forms automatically.</p>
                  </v-card-text>
                </div>
              </v-flex>
              <v-flex md4>
                <div class="hwt-block">
                  <img src="../../assets/images/hiw_icon2.png" alt="hiw_icon">
                  <v-card-text class="simple-text">
                    <h3>Track Website Views and Traffic</h3>
                    <p>Get the data and analytics that you need. Don't let sales fall through the cracks! Create a way that different platforms to communicate with each other so that you can convert your traffic. </p>
                  </v-card-text>
                </div>
              </v-flex>
              <v-flex md4>
                <div class="hwt-block">
                  <img src="../../assets/images/hiw_icon3.png" alt="hiw_icon">
                  <v-card-text class="simple-text">
                    <h3>Trigger Zapier Automation On Specific Website Activity</h3>
                    <p>Track your users as they progress through your sales funnel. Magic Zap allows your website to seamlessly communicate with other apps and softwares. Follow up with visitors while they are on your site!</p>
                  </v-card-text>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <Login ></Login>
  </div>
</template>

<script>
import Login from "../../components/Auth/Login/Login.vue";
import { mapGetters } from "vuex";
import router from "../../router/index"
export default {
  data() {
    return {
      dialoglogin: false,
      dialogtrial: false,
      show1: false,
      email: "",
      password: "",
      isHidden: true,
      name: "",
      email: "",
      drawer: null,
      mini: false
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "isLoginModalOpen",
      "isAuthenticated",

    ])
  },
  methods: {
    openLoginModel() {
      this.$store.commit("changeIsLoginModalOpen", true);
    },
    signOut(){
      this.$store.commit('userSignOut');
    },
    customRouter(path){
      router.push(path);
    }
  },
  components: {
    Login
  },
  created(){
    this.$store.commit('checkUserAuthentication');
  }
};
</script>

<style lang="scss">
@import "../../styles/common.scss";
@import "./Home.scss";
</style>
