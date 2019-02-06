<template>
  <div>
    <div v-if="user.isSubscribed && user.isActive">
      <v-card-text class="myZaps" v-if="zaps.length">
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
                <v-btn
                  slot="activator"
                  v-clipboard="zap.scriptString"
                  class="hidden-sm-and-down"
                >copy script</v-btn>
                <img
                  src="../../../assets/images/icon-copy.png"
                  v-clipboard="zap.scriptString"
                  alt="copy script"
                  class="hidden-md-and-up"
                >
                <v-flex hidden-sm-and-up>
                  <div class="mobilezaps">
                    <ul>
                      <li>
                        <img src="../../../assets/images/pageviews.png" alt="page views">
                        {{zap.pageViewCount}}
                      </li>
                      <li>
                        <img src="../../../assets/images/zaps.png" alt="zaps">
                        {{zap.zapierTriggerCount}}
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
                            <v-list-tile-title @click="ViewZap(zap)">
                              <img src="../../../assets/images/view.png" alt="view">view
                            </v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                        <v-list>
                          <v-list-tile>
                            <v-list-tile-title @click="EditZap(zap)">
                              <img src="../../../assets/images/edit.png" alt="edit">edit
                            </v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                        <v-list>
                          <v-list-tile>
                            <v-list-tile-title @click="deleteZap(zap._id)">
                              <img src="../../../assets/images/delete.png" alt="delete">delete
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

                <v-radio-group
                  row
                  v-model="zap.magicOption"
                  @click.prevent="notAllowed()"
                  v-if="loggedInUserSubscribtions.currentPlanName === 'STARTER'"
                >
                  <v-radio
                    label="on"
                    :value="true"
                    class="disabled"
                    v-bind:class="{ 'on': zap.magicOption }"
                  ></v-radio>
                  <v-radio
                    label="off"
                    :value="false"
                    class="disabled"
                    v-bind:class="{ 'on': !zap.magicOption }"
                  ></v-radio>
                </v-radio-group>

                <v-radio-group row v-model="zap.magicOption" @change="updateZap(zap)" v-else>
                  <v-radio label="on" :value="true" class v-bind:class="{ 'on': zap.magicOption }"></v-radio>
                  <v-radio
                    label="off"
                    :value="false"
                    class
                    v-bind:class="{ 'on': !zap.magicOption }"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-flex>
            <v-flex md3 sm6 xs6>
              <div class="magicOption">
                <span>append html :</span>
                <v-radio-group v-model="zap.elementOption" row @change="updateZap(zap)">
                  <v-radio
                    label="on"
                    :value="true"
                    class
                    v-bind:class="{ 'on': zap.elementOption }"
                  ></v-radio>
                  <v-radio
                    label="off"
                    :value="false"
                    class
                    v-bind:class="{ 'on': !zap.elementOption }"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-flex>
            <v-flex md3 sm6 xs6>
              <div class="magicOption">
                <span>cookie :</span>

                <v-radio-group
                  v-model="zap.cookieOption"
                  row
                  @click.prevent="notAllowed()"
                  v-if="loggedInUserSubscribtions.currentPlanName === 'STARTER' || loggedInUserSubscribtions.currentPlanName === 'STANDARD'"
                >
                  <v-radio
                    label="on"
                    :value="true"
                    class="disabled"
                    v-bind:class="{ 'on': zap.cookieOption }"
                  ></v-radio>
                  <v-radio
                    label="off"
                    :value="false"
                    class="disabled"
                    v-bind:class="{ 'on': !zap.cookieOption }"
                  ></v-radio>
                </v-radio-group>

                <v-radio-group v-model="zap.cookieOption" row @change="updateZap(zap)" v-else>
                  <v-radio label="on" :value="true" class v-bind:class="{ 'on': zap.cookieOption }"></v-radio>
                  <v-radio
                    label="off"
                    :value="false"
                    class
                    v-bind:class="{ 'on': !zap.cookieOption }"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-flex>
            <v-flex md3 sm6 xs6>
              <div class="magicOption">
                <span>timeout :</span>
                <v-radio-group
                  v-model="zap.timeoutOption"
                  row
                  @change="updateZap(zap)"
                  v-if="loggedInUserSubscribtions.currentPlanName === 'PROFESSIONAL'"
                >
                  <v-radio
                    label="on"
                    :value="true"
                    class
                    v-bind:class="{ 'on': zap.timeoutOption }"
                  ></v-radio>
                  <v-radio
                    label="off"
                    :value="false"
                    class
                    v-bind:class="{ 'on': !zap.timeoutOption }"
                  ></v-radio>
                </v-radio-group>
                <v-radio-group v-else v-model="zap.timeoutOption" row @click.prevent="notAllowed()">
                  <v-radio
                    label="on"
                    :value="true"
                    class="disabled"
                    v-bind:class="{ 'on': zap.timeoutOption }"
                  ></v-radio>
                  <v-radio
                    label="off"
                    :value="false"
                    class="disabled"
                    v-bind:class="{ 'on': !zap.timeoutOption }"
                  ></v-radio>
                </v-radio-group>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-card-text>
      <v-layout row wrap v-else>
        <v-flex xs12>
          <v-card>
            <h2>Welcome to Magiczap Create Your First Zap</h2>
            <div class="upgrade-box">
              <v-btn class="upgrade-button" @click.prevent="changeRouterState('/magic/zaps/new')">
                <span>Create</span>
              </v-btn>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
       <v-layout row wrap v-if="!user.isSubscribed">
        <v-flex xs12>
          <h2>Your subscription is inactive. Please activate your subscription !</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap  v-if="!user.isActive">
        <v-flex xs12>
          <h2>Your account has been suspended. Contact the person from whom you have bought the app</h2>
        </v-flex>
      </v-layout>
    </div>
    <AlertPopUp/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlertPopUp from "../../Common/AlertPopUp.vue";
export default {
  data() {
    return {};
  },
  methods: {
    deleteZap(id) {
      this.$store.dispatch("deleteZap", id);
    },
    ViewZap(zap) {
      this.$store.commit("viewZap", zap);
      this.$store.commit("changeRoute", "/magic/zaps/view");
    },
    EditZap(zap) {
      this.$store.commit("viewZap", zap);
      this.$store.commit("changeRoute", "/magic/zaps/edit");
    },
    updateZap(zap) {
      this.$store.dispatch("updateZap", zap);
    },
    notAllowed() {
      this.$store.commit("changeIsAlertPopUpOpen", true);
      this.$store.commit(
        "addAlertMessage",
        "Please upgrade your membership to unlock this feature"
      );
    },
    changeRouterState(path) {
      this.$store.commit("changeRoute", path);
    }
  },
  computed: {
    ...mapGetters([
      "user",
      "zaps",
      "isShowModal",
      "searchZap",
      "loggedInUserSubscribtions"
    ]),
    filteredZaps: function() {
      var vm = this;
      return this.zaps.filter(obj => {
        return obj.name.toLowerCase().includes(vm.searchZap.toLowerCase());
      });
    }
  },
  components: {
    AlertPopUp
  },
  created() {
    this.$store.dispatch("getZap", this.user);
  }
};
</script>

<style lang="scss">
@import "../../../styles/common.scss";
@import "./MyZaps.scss";
</style>