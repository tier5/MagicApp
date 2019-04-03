<template>
  <div class="HowItWorks">
    <v-card-text class="top-bar-text">
      <h2>Magic Zap Training Videos</h2>
      <p>Well here we are in action. Watch our training videos for your hand on experience. </p>
    </v-card-text>
    <v-card>
      <v-layout row wrap class="training-video" v-if="firstVideo.length">
        <v-flex md6>
          <a :href ="firstVideo[0].source" data-lity>
            <img :src="'https://img.youtube.com/vi/' +firstVideo[0].source.split('/')[3]+ '/maxresdefault.jpg' " alt="image" class="image">
          </a>
        </v-flex>
        <v-flex md6>
          <v-card-text class="right-text-block">
            <h3>
                {{firstVideo[0].title}}
            </h3>
            <div class="header-bottom">
              <span>by <span>Magic Zap</span></span>
              <!-- <span><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span> -->
            </div>
            <p>{{firstVideo[0].description}}</p>
          </v-card-text>
        </v-flex>
      </v-layout>
      <div class="bottom-section">
        <v-layout row wrap>
          <v-flex md3 sm6 v-for="vid in tutorials" :key="vid._id">
            <!-- https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg -->
             <a :href ="vid.source" data-lity>
              <img :src="'https://img.youtube.com/vi/' +vid.source.split('/')[3]+ '/maxresdefault.jpg' " alt="image" class="image">
             </a>
            <v-card-text class="right-text-block">
              <h3>
                  {{vid.title}}
              </h3>
              <div class="header-bottom">
                <span class="left">by <span>Magic Zap</span></span>
                <!-- <span class="right"><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span> -->
              </div>
              <p>{{vid.description}}</p>
            </v-card-text>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
import _ from 'lodash';
export default {
  data () {
    return {
      
    }
  },
  computed:{
    ...mapGetters([
          'tutorials'
      ]),
      orderedTutorials: function(){
          let data = this.tutorials.filter(o => o.order != 0);
          return _.orderBy(data, 'order');
      },
      firstVideo(){
        return this.tutorials.filter(o=> o.order == '1');
      }

  },
  created() {
    this.$store.dispatch('getTutorials',{});
  },
  mounted(){
    this.$store.commit('checkCookiePolicy');
  }
}
</script>
<style lang="scss">
@import "../../../styles/common.scss";
@import "./HowItWorks.scss";
</style>