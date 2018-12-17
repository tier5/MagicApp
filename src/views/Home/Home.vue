<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex md12>
          <v-card class="first-section">
            <v-card-text class="top-bar">
              <v-layout row wrap>
                <v-flex md6>
                  <div class="logo">
                    <img src="../../assets/images/dashboard-logo.png" class="logo" alt="Logo">
                  </div>
                </v-flex>
                <v-flex md6>
                  <v-toolbar>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn flat>Features</v-btn>
                      <v-btn flat>Pricing</v-btn>
                      <span
                        class="freetrialbtn"
                        @click="dialogtrial = true"
                        v-on:click="isHidden = false"
                      >14 day free trial</span>
                      <span
                        class="loginbtn"
                        @click="openLoginModel()"
                        
                      >
                        <img src="../../assets/images/user-icon-white.png" alt="user-icon"> Login
                      </span>
                    </v-toolbar-items>
                  </v-toolbar>
                </v-flex>
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
          <v-card class="second-section">
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
        </v-flex>
      </v-layout>
    </v-container>
    <Login ></Login>
  </div>
</template>

<script>
import Login from "../../components/Auth/Login/Login.vue";
import { mapGetters } from "vuex";
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
      email: ""
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["isLoginModalOpen"])
  },
  methods: {
    openLoginModel() {
      this.$store.commit("changeIsLoginModalOpen", true);
    }
  },
  components: {
    Login
  }
};
</script>

<style lang="scss">
@import "../../styles/common.scss";
@import "./Home.scss";
</style>
