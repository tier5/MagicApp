<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs3 class="left-aside">
        <v-card>
          <v-card class="px-0">
            <div class="logo">
              <img src="../../../assets/images/dashboard-logo.png" class="logo" alt="Logo">
            </div>
            <v-card-text class="username">
              <div><span>A</span></div> Alexander
            </v-card-text>
            <v-card-text class="left-menu">
              <ul>
                <li>
                  <img src="../../../assets/images/icon-zap.png" alt="icon" class="icon-zap">
                  <span>my zaps</span>
                </li>
                <li>
                  <img src="../../../assets/images/icon-zaptoken.png" alt="icon" class="icon-zaptoken">
                  <span>zapier token</span>
                </li>
                <li>
                  <img src="../../../assets/images/icon-help.png" alt="icon" class="icon-help">
                  <span>help</span>
                </li>
              </ul>
            </v-card-text>
            <v-card-text class="create-new-zap">
              <img src="../../../assets/images/icon-createzap.png" alt="icon">
              <h2>Create a New Zap</h2>
            </v-card-text>
            <v-card-text class="total-zaps">
              <v-card-text>
                <h3>total zaps</h3>
                <h4>06</h4>
              </v-card-text>
              <v-card-text>
                <h3>total page views</h3>
                <h4>15,282</h4>
              </v-card-text>
              <v-card-text>
                <h3>total zaps triggered</h3>
                <h4>12,852</h4>
              </v-card-text>
            </v-card-text>
            <v-card-text class="left-footer">
              <ul>
                <li><img src="../../../assets/images/back-icon.png" alt="icon" class="back-icon"></li>
                <li><img src="../../../assets/images/user-icon.png" alt="icon" class="user-icon"></li>
                <li>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                    >
                      <img src="../../../assets/images/icon-logout.png" alt="icon" class="icon-logout">
                    </v-btn>
                    <span>LOGOUT</span>
                  </v-tooltip>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-card>
      </v-flex>
      <v-flex xs9 class="right-aside">
        <v-card>
          <v-card-text class="px-0">
            <v-layout row wrap>
              <v-flex xs6>
                <v-card-text class="search-bar">
                  <v-text-field
                    placeholder="Search your zaps"
                  ></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="how-it-works text-xs-right">
                  <img src="../../../assets/images/icon-video.png" alt="icon" class="icon-video">
                  <span>how it works </span>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss">
  @import './CreateNewZap.scss';
</style>