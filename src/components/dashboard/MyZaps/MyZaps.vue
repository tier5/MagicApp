<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md3 sm5 hidden-xs-only class="left-aside">
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
      <v-flex md9 sm7 class="right-aside myZapWrap">
        <v-layout xs12 class="hidden-sm-and-up top-bar">
          <v-flex xs8>
            <v-card class="logo">
              <img src="../../../assets/images/dashboard-logo.png" class="logo" alt="Logo">
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card class="zaps text-xs-right">
              <img src="../../../assets/images/icon-zap-mobile.png" alt="icon">
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card class="mobile-hamburger-menu text-xs-right"  @click.stop="drawer = !drawer">
              <img src="../../../assets/images/hamburger-button.png" alt="icon">
            </v-card>
          </v-flex>
          <v-navigation-drawer v-model="drawer" :mini-variant="mini" fixed temporary right>
            <v-card class="left-aside left-aside-mobile">
              <v-card>
                <v-card-text class="username">
                  <div class="back-btn" @click.stop="drawer = !drawer">
                    <img src="../../../assets/images/icon-back.png" alt="icon">
                  </div>
                  <div class="userMobile">
                    <div><span>A</span></div> Alexander
                  </div>
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
                <v-card-text class="left-footer text-xs-right">
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
          </v-navigation-drawer>
        </v-layout>
        <v-card>
          <v-card-text class="px-0">
            <v-layout row wrap>
              <v-flex sm6 xs12>
                <v-card-text class="search-bar">
                  <v-text-field
                    placeholder="Search your zaps"
                  ></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex sm6 xs12 hidden-xs-only>
                <v-card-text class="how-it-works text-xs-right">
                  <img src="../../../assets/images/icon-video.png" alt="icon" class="icon-video">
                  <span class="hidden-sm-only">how it works </span>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-layout>
          <v-flex md1></v-flex>
          <v-flex md10>
            <div class="dashboard-body">
              <v-card-text class="myZaps">
                  <div class="eachZap">
                        <v-layout row wrap>
                            <v-flex md7>
                                <h2 class="zapHeading">zap name</h2>
                            </v-flex>
                            <v-flex md5>
                                <v-layout row wrap>
                                    <v-flex md4>
                                        <h2 class="zapHeading">page views</h2>
                                    </v-flex>
                                    <v-flex md4>
                                        <h2 class="zapHeading">zaps</h2>
                                    </v-flex>
                                    <v-flex md4>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </div>
                  <div class="eachZap">
                        <v-layout row wrap>
                            <v-flex md7>
                                <div class="zapName">
                                    <h3 class="zapText">sales bridge</h3>
                                    <a href="#"><img src="../../../assets/images/icon-copy.png" alt="copy script">copy script</a>
                                    <v-layout row wrap>
                                        <v-flex xs4>
                                            <div class="magicOption">
                                                <span>magic option :</span>
                                                <v-radio-group v-model="radios" :mandatory="false">
                                                    <v-layout row wrap>
                                                    <v-flex md6>
                                                        <v-radio label="on" value="on" class="on"></v-radio>
                                                    </v-flex>
                                                    <v-flex md6>
                                                        <v-radio label="off" value="off" class="off"></v-radio>
                                                    </v-flex>
                                                    </v-layout>
                                                </v-radio-group>
                                            </div>
                                        </v-flex>
                                        <v-flex xs4>
                                            <div class="magicOption">
                                                <span>append html :</span>
                                                <v-radio-group v-model="radios" :mandatory="false">
                                                    <v-layout row wrap>
                                                    <v-flex md6>
                                                        <v-radio label="on" value="on" class="on"></v-radio>
                                                    </v-flex>
                                                    <v-flex md6>
                                                        <v-radio label="off" value="off" class="off"></v-radio>
                                                    </v-flex>
                                                    </v-layout>
                                                </v-radio-group>
                                            </div>
                                        </v-flex>
                                        <v-flex xs4>
                                            <div class="magicOption">
                                                <span>cookie :</span>
                                                <v-radio-group v-model="radios" :mandatory="false">
                                                    <v-layout row wrap>
                                                    <v-flex md6>
                                                        <v-radio label="on" value="on" class="on"></v-radio>
                                                    </v-flex>
                                                    <v-flex md6>
                                                        <v-radio label="off" value="off" class="off"></v-radio>
                                                    </v-flex>
                                                    </v-layout>
                                                </v-radio-group>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </div>
                            </v-flex>
                            <v-flex md5>
                                <div class="zaps">
                                    <v-layout row wrap>
                                        <v-flex md4>
                                            <h3 class="zapText">2547</h3>
                                        </v-flex>
                                        <v-flex md4>
                                            <h3 class="zapText">2142</h3>
                                        </v-flex>
                                        <v-flex md4>
                                            <v-card height="200px">

                                                <v-menu bottom left>
                                                    <v-btn
                                                    slot="activator"
                                                    dark
                                                    icon
                                                    >
                                                    <img src="../../../assets/images/menu.png" alt="">
                                                    </v-btn>

                                                    <v-list>
                                                    <v-list-tile
                                                        v-for="(item, i) in items"
                                                        :key="i"
                                                        @click=""
                                                    >
                                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                                    </v-list-tile>
                                                    </v-list>
                                                </v-menu>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </div>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-card-text>
            </div>
          </v-flex>
          <v-flex md1></v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        drawer: null,
        mini: false,
        right: null,

        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        valid: true,
        name: '',
        paramName: '',
        value: '',
        paramName2: '',
        selectType: '',
        select: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            select: this.select
          })
        }
      }
    }
  }
</script>
<style lang="scss">
    @import '../../../styles/common.scss';
    @import './MyZaps.scss';
</style>