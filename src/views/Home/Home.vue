<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex md12>
          <v-card class="section first-section">
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
                      <span class="freetrialbtn"  v-if="!isAuthenticated">14 day free trial</span>
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
                          <div v-if="!isAuthenticated">
                            <img src="../../assets/images/logo.svg" alt="icon" />
                          </div>
                          <div v-if="isAuthenticated">
                            <span>S</span>
                          </div>
                          <span class="username-text">User name</span>
                        </div>
                      </v-card-text>
                      <v-card-text class="left-menu">
                        <ul>
                          <li v-if="!isAuthenticated">
                            <img src="../../assets/images/icon-zap.png" alt="icon" class="icon-zap">
                            <span>Features</span>
                          </li>
                          <li v-if="!isAuthenticated">
                            <img src="../../assets/images/icon-help.png" alt="icon" class="icon-help">
                            <span>Pricing</span>
                          </li>
                          <li v-if="!isAuthenticated">
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
          <v-card class="section second-section"  v-animate.repeat.fade="'slide-up'">
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
          <v-card class="section third-section">
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
          <v-card class="section fourth-section">
            <v-layout row wrap>
              <v-flex md12>
                <div class="block-head">
                  <span>A Few Of MAGIC ZAP's</span>
                </div>
                <h2>Features You'll Love</h2>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md6>
                <v-layout row wrap>
                  <v-flex md6>
                    <v-layout row wrap>
                      <v-flex md2 sm12>
                        <img src="../../assets/images/feature-icon1.png" alt="feature_icon">
                      </v-flex>
                      <v-flex md10 sm12>
                        <div class="simple-text">
                          <h3>Dynamic Website Content</h3>
                          <p>Allows you to customise and display dynamic content that's relevant to your visitors. </p>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md6>
                    <v-layout row wrap>
                      <v-flex md2 sm12>
                        <img src="../../assets/images/feature-icon4.png" alt="feature_icon">
                      </v-flex>
                      <v-flex md10 sm12>
                        <div class="simple-text">
                          <h3>Pre-Populate Website Forms</h3>
                          <p>Get users to give you more information by pre-populating your website forms with the data that you've already collected from your leads. </p>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout  row wrap>
                  <v-flex md6>
                    <v-layout row wrap>
                      <v-flex md2 sm12>
                        <img src="../../assets/images/feature-icon2.png" alt="feature_icon">
                      </v-flex>
                      <v-flex md10 sm12>
                        <div class="simple-text">
                          <h3>Track Website Activity</h3>
                          <p>Know who is on your website and when. Know what your website visitors are doing.</p>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md6>
                    <v-layout row wrap>
                      <v-flex md2 sm12>
                        <img src="../../assets/images/feature-icon5.png" alt="feature_icon">
                      </v-flex>
                      <v-flex md10 sm12>
                        <div class="simple-text">
                          <h3>Trigger Automations</h3>
                          <p>Trigger custom Zapier automatons when specific traffic lands on your site. This let's you easy follow up or reach out to your leads while they're hot, and ready to buy on your site. </p>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex md6>
                    <v-layout row wrap>
                      <v-flex md2 sm12>
                        <img src="../../assets/images/feature-icon3.png" alt="feature_icon">
                      </v-flex>
                      <v-flex md10 sm12>
                        <div class="simple-text">
                          <h3>Magic Option</h3>
                          <p>Pass data to each new page that your visitor visits. You can turn this on or off. </p>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex md6>
                    <v-layout row wrap>
                      <v-flex md2 sm12>
                        <img src="../../assets/images/feature-icon6.png" alt="feature_icon">
                      </v-flex>
                      <v-flex md10 sm12>
                        <div class="simple-text">
                          <h3>Cookies</h3>
                          <p>We'll store all your data in a site wide cookie so next time yours visit your site Magic Zap will work. You can also turn this feature on or off.</p>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex md6  sm12 class="app-screen">
                <img src="../../assets/images/app-screen-view.png" alt="app-screen">
              </v-flex>
            </v-layout>
          </v-card>
          <v-card class="section fifth-section">
            <v-layout row wrap>
              <v-flex md5>
                <v-card-text class="client-image">
                  <img src="../../assets/images/client.png" alt="client">
                </v-card-text>
              </v-flex>
              <v-flex md7>
                <v-card-text class="simple-text">
                  <h2>We are loved by 10k+ clients worldwide</h2>
                  <v-layout row wrap>
                    <v-flex md2 sm2>
                      <div class="image">
                        <img src="../../assets/images/client.png" alt="client">
                      </div>
                    </v-flex>
                    <v-flex md10 sm10>
                      <p>Perfect tool for all online marketers to stay ahead of competetion. It's easy to use and makes the use of zapier much more natural. Give it a try.</p>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
          <v-card class="section sixth-section">
            <v-layout row wrap>
              <v-flex md12 text-xs-right>
                <div class="block-head">
                  <span>select a plan to</span>
                  <h2>Optimize your marketing in the next <span>5 minutes</span></h2>
                  <h3>* Billed monthly, no set up fee.</h3>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md4>
                <v-card-text>
                  <div class="plan">
                    <div class="head">
                      <span class="type">Starter</span>
                      <h4><span>$</span> 27</h4>
                    </div>
                    <div class="body">
                      <ul>
                        <li>10 magic zaps</li>
                        <li>1,000 Monthly Automations</li>
                        <li class="disabled">No Magic Option</li>
                        <li class="disabled">No Cookies</li>
                      </ul>
                    </div>
                  </div>
                </v-card-text>
              </v-flex>
              <v-flex md4>
                <v-card-text>
                  <div class="plan highlighted">
                    <div class="head">
                      <span class="type">Standard</span>
                      <h4><span>$</span> 47</h4>
                    </div>
                    <div class="body">
                      <ul>
                        <li>50 magic zaps</li>
                        <li>1,000 Monthly Automations</li>
                        <li>Magic Option</li>
                        <li class="disabled">No Cookies</li>
                      </ul>
                    </div>
                  </div>
                </v-card-text>
              </v-flex>
              <v-flex md4>
                <v-card-text>
                  <div class="plan">
                    <div class="head">
                      <span class="type">professional</span>
                      <h4><span>$</span> 97</h4>
                    </div>
                    <div class="body">
                      <ul>
                        <li>Unlimited magic zaps</li>
                        <li>Unlimited Monthly Automations</li>
                        <li>No Magic Option</li>
                        <li>Cookies</li>
                      </ul>
                    </div>
                  </div>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Child Components Modals -->
    <Login></Login>
    <ForgetPassword />
    <!-- End of Child Components -->
  </div>
</template>

<script>
import Login from "../../components/Auth/Login/Login.vue";
import ForgetPassword from "../../components/Auth/ForgetPassword/ForgetPassword.vue";
import { mapGetters } from "vuex";
import router from "../../router/index"
export default {
  data() {
    return {
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
    Login,
    ForgetPassword
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
