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
      <v-flex md9 sm7 class="right-aside">
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
          <v-flex md2></v-flex>
          <v-flex md8>
            <div class="dashboard-body">
              <v-card-text>
                <img src="../../../assets/images/logo.png" alt="Header Logo" class="header-logo">
                <h2>Create a new ZAP</h2>
                <p>Add multiple Params and Attributes as you need</p>
              </v-card-text>
              <v-card class="create-zap-form" >
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-layout row wrap>
                    <span class="progress-bar filled"><span class="dot"></span> Name</span>
                    <v-flex xs12>
                      <v-card-text>
                        <v-text-field
                          v-model="name"
                          :rules="nameRules"
                          placeholder="Zap Name"
                          required
                        ></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <span class="progress-bar filled"><span class="dot"></span> Params</span>
                    <v-flex md4 xs12>
                      <v-card-text>
                        <v-text-field
                          v-model="paramName"
                          placeholder="Param Name"
                          required
                        ></v-text-field>
                        <span>ex.email</span>
                      </v-card-text>
                    </v-flex>
                    <v-flex md3 xs12>
                      <v-card-text>
                        <v-select
                          v-model="select"
                          :items="items"
                          :rules="[v => !!v || 'Required']"
                          placeholder="Select"
                          required
                        ></v-select>
                      </v-card-text>
                    </v-flex>
                    <v-flex md4 xs12>
                      <v-card-text>
                        <v-text-field
                          v-model="value"
                          placeholder="Value"
                          required
                        ></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex md1 xs12>
                      <v-card-text class="add-zap-field">
                        <img src="../../../assets/images/Add_record_icon.png" alt="icon" class="icon-add">
                      </v-card-text>
                    </v-flex>
                    <v-flex md12 class="tags-section">
                      <v-card-text>
                        <ul>
                          <li>
                            <span>email : Exists</span> 
                            <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross">
                          </li>
                          <li>
                            <span>name : !=</span> 
                            <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross">
                          </li>
                        </ul>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <span class="progress-bar"><span class="dot"></span> Attributes</span>
                    <v-flex md6 xs12>
                      <v-card-text>
                        <v-text-field
                          v-model="paramName2"
                          placeholder="Param Name"
                          required
                        ></v-text-field>
                        <span>ex.email</span>
                      </v-card-text>
                    </v-flex>
                    <v-flex md5 xs12>
                      <v-card-text>
                        <v-select
                          v-model="selectType"
                          :items="items"
                          :rules="[v => !!v || 'Type is required']"
                          placeholder="Select Type"
                          required
                        ></v-select>
                        <span>ex.name</span>
                      </v-card-text>
                    </v-flex>
                    <v-flex md1 xs12>
                      <v-card-text class="add-zap-field">
                        <img src="../../../assets/images/Add_record_icon.png" alt="icon" class="icon-add">
                      </v-card-text>
                    </v-flex>
                    <v-flex md12 class="tags-section">
                      <v-card-text>
                        <ul>
                          <li>
                            <span>email - name</span> 
                            <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross">
                          </li>
                          <li>
                            <span>name - name</span> 
                            <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross">
                          </li>
                        </ul>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex md12 text-xs-center>
                      <v-btn
                        :disabled="!valid"
                        @click="submit"
                        class="submit-btn"
                      >
                        <img src="../../../assets/images/icon-zap-white.png"> 
                        <span>Create my ZAP</span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card>
              <span class="create-new-zap hidden-sm-and-up">
                <img src="../../../assets/images/icon-createzap.png" alt="icon-createzap"/>
              </span>
            </div>
          </v-flex>
          <v-flex md2></v-flex>
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
  @import './CreateNewZap.scss';
</style>