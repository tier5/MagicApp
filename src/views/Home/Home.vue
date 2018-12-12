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
                    <span class="freetrial">14 day free trial</span>
                    <span class="login"><img src="../../assets/images/user-icon.png" alt="user-icon"> Login</span>
                  </v-toolbar-items>
                </v-toolbar>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md6>
                <div class="banner-left">
                  <span class="makeweb">make your website</span>
                  <h1>a Sales Tool Again</h1>
                  <p>Personalise, Track, and Engage your website visitors with a simple yet powerful software</p>
                  <v-btn class="free-trial-btn">Start 14 Days FREE Trial</v-btn>
                </div>
              </v-flex>
              <v-flex md6>
                <img src="../../assets/images/video-screen.png">
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  @import '../../styles/common.scss';
  @import './Home.scss';
</style>
