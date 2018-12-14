<template>
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
                    <span class="freetrialbtn" @click="dialogtrial = true" v-on:click="isHidden = false">14 day free trial</span>
                    <span class="loginbtn" @click="dialoglogin = true" v-on:click="isHidden = false"><img src="../../assets/images/user-icon-white.png" alt="user-icon"> Login</span>
                  </v-toolbar-items>
                </v-toolbar>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md7>
                <div class="banner-left">
                  <span class="makeweb">make your website</span>
                  <h1>a Sales Tool Again</h1>
                  <p>Personalise, Track, and Engage your website visitors with a simple yet powerful software</p>
                  <v-btn class="free-trial-btn">Start 14 Days FREE Trial</v-btn>
                </div>
              </v-flex>
              <v-flex md5>
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
                <p>Magic Zap is a very powerful and magical software. Magic Zap will allow you to present personalised dynamic websites to your visitors. It will also let you send follow up emails, calls, sms or chatbot messages while your visitors are on your site engaged and ready to buy. You have to have this tool if you want to compete. </p>
              </v-card-text>
            </v-flex>
            <v-flex md3></v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- POPUPs -->
    <!-- <Loader v-if="!isHidden" /> -->
    <v-layout row justify-center class="authWrap">
      <img src="../../assets/images/smallcross.png" class="cross-btn" @click="dialoglogin = false; dialogtrial = false" v-if="!isHidden" v-on:click="isHidden = true"> 
      <v-dialog v-model="dialoglogin" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="auth">
            <v-layout row wrap>
                <v-flex xs5>
                  <div class="loginpopText">
                    <h2>login</h2>
                    <h6>to your magic zap account</h6>
                  </div>
                </v-flex>
                <v-flex xs7>
                  <v-card-text class="login">
                    <Success />
                    <Error />
                    <img src="../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                    <v-form>
                      <v-container>
                          <v-layout row wrap>
                              <v-flex xs12>
                                  <v-text-field label="Solo" v-model="email" placeholder="EMAIL" class="email" solo></v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                  <v-text-field label="Solo" v-model="password" :type="show1 ? 'text' : 'password'" placeholder="PASSWORD" class="password" solo></v-text-field>
                              </v-flex>
                              <a href="#" class="forgotpass">forgot password?</a>
                              <v-btn block color="orangeButton" dark><img src="../../assets/images/lock.png" alt="login">login</v-btn>
                              <span>Don't have an account?<a href="#"> sign up now!</a></span>
                          </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-flex>
              </v-layout>
              <v-card-actions>
                  <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row justify-center class="authWrap">
      <v-dialog v-model="dialogtrial" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="auth">
          <v-layout row wrap>
            <v-flex xs5>
              <div class="trialpopText">
                <h2>Start getting the engagement and conversions from your website you deserve!</h2>
              </div>
            </v-flex>
            <v-flex xs7>
                <v-card-text class="trialPopup login">
                    <img src="../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                    <v-form>
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field label="Solo" v-model="name" placeholder="YOUR NAME" class="name" solo></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Solo" v-model="email" placeholder="YOUR EMAIL" class="email" solo></v-text-field>
                                </v-flex>
                                <v-btn block color="orangeButton" dark>get started</v-btn>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-layout>
    <!-- ======= -->
  </v-container>
</template>

<script>
  import Loader from '../../components/Loader.vue';
  import Success from '../../components/Success.vue';
  import Error from '../../components/Error.vue';
  export default {
    data () {
      return {
        dialoglogin: false,
        dialogtrial: false,
        show1:false,
        email:'',
        password:'',
        isHidden: true,
        name: '',
        email:''
      }
    },
    name: 'loader',
    name: 'success',
    name: 'error',
    components: {
        Loader,
        Success,
        Error
    }
  }
</script>

<style lang="scss">
  @import '../../styles/common.scss';
  @import './Home.scss';
</style>
