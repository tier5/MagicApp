<template>
  <div>
    <v-card-text class="myZaps">
      <div class="firstZap">
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
      <div class="eachZap" id="zap_id1">
        <v-layout row wrap>
          <v-flex md7 sm8>
            <div class="zapName">
              <h3 class="zapText">sales bridge</h3>
              <img src="../../../assets/images/icon-copy.png" alt="copy script">
              <a>copy script</a>
              <div class="switchblock hidden-sm-and-up text-xs-right">
                <span class="cookie">Cookie:</span>
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="slider round">
                    <span class="on">ON</span>
                    <span class="off">OFF</span>
                  </span>
                </label>
              </div>
              <v-flex visible-xs-only>
                <div class="mobilezaps">
                  <ul>
                    <li>
                      <img src="../../../assets/images/pageviews.png" alt="page views">4521
                    </li>
                    <li>
                      <img src="../../../assets/images/zaps.png" alt="zaps">2158
                    </li>
                  </ul>
                </div>
              </v-flex>
              <v-layout row wrap>
                <v-flex xs4 sm4>
                  <div class="magicOption">
                    <span>magic option :</span>
                    <v-radio-group v-model="radios1" row :mandatory="false">
                      <v-radio label="on" value="on" class="on"></v-radio>
                      <v-radio label="off" value="off" class="off"></v-radio>
                    </v-radio-group>
                  </div>
                </v-flex>
                <v-flex xs4 sm4>
                  <div class="magicOption">
                    <span>append html :</span>
                    <v-radio-group v-model="radios2" row :mandatory="false">
                      <v-radio label="on" value="on" class="on"></v-radio>
                      <v-radio label="off" value="off" class="off"></v-radio>
                    </v-radio-group>
                  </div>
                </v-flex>
                <v-flex xs4 sm4 hidden-xs-only>
                  <div class="magicOption">
                    <span>cookie :</span>
                    <v-radio-group v-model="radios3" row :mandatory="false">
                      <v-radio label="on" value="on" class="on"></v-radio>
                      <v-radio label="off" value="off" class="off"></v-radio>
                    </v-radio-group>
                  </div>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex md5 sm4 hidden-xs-only>
            <div class="zaps">
              <v-layout row wrap>
                <v-flex md4 sm5>
                  <h3 class="zapText">2547</h3>
                </v-flex>
                <v-flex md4 sm5>
                  <h3 class="zapText">2142</h3>
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
                            <a>
                              <img src="../../../assets/images/view.png" alt="view">view
                            </a>
                          </v-list-tile-title>
                          <v-list-tile-title>
                            <a>
                              <img src="../../../assets/images/edit.png" alt="edit">edit
                            </a>
                          </v-list-tile-title>
                          <v-list-tile-title>
                            <a>
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
      </div>
    </v-card-text>
  </div>
</template>
    <script>
export default {
  data() {
    return {
      drawer: null,
      mini: false,
      right: null,
      value: "",
      radios1: "",
      radios2: "",
      radios3: ""
    };
  }
};
</script>
    <style lang="scss">
@import "../../../styles/common.scss";
@import "./MyZaps.scss";
</style>