<template>
  <div>
    <v-card-text class="myZaps">
      <div class="firstZap hidden-xs-only">
        <v-layout row wrap>
          <v-flex md7 sm8>
            <h2 class="zapHeading">zap name</h2>
          </v-flex>
          <v-flex md5 sm4>
            <v-layout row wrap>
              <v-flex md4 sm6>
                <h2 class="zapHeading">page views</h2>
              </v-flex>
              <v-flex md4 sm6>
                <h2 class="zapHeading">zaps</h2>
              </v-flex>
              <v-flex md4 sm2></v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
      <div class="eachZap" v-for="zap in filteredZaps" :key="zap._id">
        <v-layout row wrap>
          <v-flex md7 sm8>
            <div class="zapName">
              <h3 class="zapText">{{zap.name}}</h3>
              <v-btn slot="activator" v-clipboard="zap.scriptString" class="hidden-sm-and-down">copy script</v-btn>
              <img src="../../../assets/images/icon-copy.png" v-clipboard="zap.scriptString" alt="copy script" class="hidden-md-and-up">
              <v-flex hidden-sm-and-up>
                <div class="mobilezaps">
                  <ul>
                    <li>
                      <img src="../../../assets/images/pageviews.png" alt="page views">{{zap.pageViewCount}}
                    </li>
                    <li>
                      <img src="../../../assets/images/zaps.png" alt="zaps">{{zap.zapierTriggerCount}}
                    </li>
                  </ul>
                </div>
              </v-flex>
              
            </div>
          </v-flex>
          <v-flex md5 sm4>
            <div class="zaps">
              <v-layout row wrap>
                <v-flex md4 sm5 hidden-xs-only>
                  <h3 class="zapText">{{zap.pageViewCount}}</h3>
                </v-flex>
                <v-flex md4 sm5 hidden-xs-only>
                  <h3 class="zapText">{{zap.zapierTriggerCount}}</h3>
                </v-flex>
                <v-flex md4 sm2 text-xs-right>
                  <v-card>
                    <v-menu left offset-x>
                      <v-btn slot="activator" dark icon>
                        <img
                          src="../../../assets/images/menu.png"
                          alt="menu"
                          class="menu"
                          id="menu1"
                        >
                      </v-btn>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-title>
                            <a @click='ViewZap(zap)'>
                              <img src="../../../assets/images/view.png" alt="view">view
                            </a>
                          </v-list-tile-title>
                          <v-list-tile-title>
                            <a @click='EditZap(zap)'>
                              <img src="../../../assets/images/edit.png" alt="edit">edit
                            </a>
                          </v-list-tile-title>
                          <v-list-tile-title>
                            <a @click="deleteZap(zap._id)">
                              <img src="../../../assets/images/delete.png" alt="delete">delete
                            </a>
                          </v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-card>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md3 sm6 xs6>
            <div class="magicOption">
              <span>magic option :</span>
              <v-radio-group v-model="zap.magicOption" row @change="updateZap(zap)">
                <v-radio label="on" :value="true" class="" v-bind:class="{ 'on': zap.magicOption }"></v-radio>
                <v-radio label="off" :value="false" class="" v-bind:class="{ 'on': !zap.magicOption }"></v-radio>
              </v-radio-group>
            </div>
          </v-flex>
          <v-flex md3 sm6 xs6>
            <div class="magicOption">
              <span>append html :</span>
              <v-radio-group v-model="zap.elementOption" row @change="updateZap(zap)">
                <v-radio label="on" :value="true" class="" v-bind:class="{ 'on': zap.elementOption }"></v-radio>
                <v-radio label="off" :value="false" class="" v-bind:class="{ 'on': !zap.elementOption }"></v-radio>
              </v-radio-group>
            </div>
          </v-flex>
          <v-flex md3 sm6 xs6>
            <div class="magicOption">
              <span>cookie :</span>
              <v-radio-group v-model="zap.cookieOption" row @change="updateZap(zap)">
                <v-radio label="on" :value="true" class="" v-bind:class="{ 'on': zap.cookieOption }"></v-radio>
                <v-radio label="off" :value="false" class="" v-bind:class="{ 'on': !zap.cookieOption }"></v-radio>
              </v-radio-group>
            </div>
          </v-flex>
          <v-flex md3 sm6 xs6>
            <div class="magicOption">
              <span>timeout :</span>
              <v-radio-group v-model="zap.timeoutOption" row  @change="updateZap(zap)">
                <v-radio label="on" :value="true" class="" v-bind:class="{ 'on': zap.timeoutOption }"></v-radio>
                <v-radio label="off" :value="false" class="" v-bind:class="{ 'on': !zap.timeoutOption }"></v-radio>
              </v-radio-group>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
    <span class="create-new-zap-mobile hidden-sm-and-up">
      <img src="../../../assets/images/icon-createzap.png" alt="icon-createzap">
    </span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      deleteZap(id){
        this.$store.dispatch('deleteZap',id);
      },
      ViewZap(zap){
        this.$store.commit('viewZap',zap);
        this.$store.commit('changeRoute', '/magic/zaps/view');
      },
      EditZap(zap){
        this.$store.commit('viewZap',zap);
        this.$store.commit('changeRoute', '/magic/zaps/edit');
      },
      updateZap(zap){
        this.$store.dispatch('updateZap',zap);
      },
    },
    computed:{
      ...mapGetters([
            'user',
            'zaps',
            'isShowModal',
            'searchZap'
      ]),
      filteredZaps : function(){
        var vm = this;
          return this.zaps.filter(obj =>{
            return obj.name.toLowerCase().includes(vm.searchZap.toLowerCase())
          })
      }
    },
    created(){
      this.$store.dispatch('getZap',this.user);
    }
  };
</script>

<style lang="scss">
@import "../../../styles/common.scss";
@import "./MyZaps.scss";
</style>