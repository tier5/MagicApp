<template>
  <div class="viewZap">
    <v-card-text>
      <img src="../../../assets/images/logo.png" alt="Header Logo" class="header-logo">
      <h2>My ZAP</h2>
      <p>Take a look on the zap you have created</p>
    </v-card-text>
    <v-card class="create-zap-form">

      <v-form>
        <!-- Name Starts -->
        <v-layout row wrap>
          <span class="progress-bar" v-bind:class="{'filled' : zap.name.length}">
            <span class="dot"></span> Name
          </span>
          <v-flex xs12>
            <v-card-text class="name">
              {{zap.name}}
            </v-card-text>
          </v-flex>
        </v-layout>
        <!-- Name Ends -->

        <!-- Params Section Starts -->
        <v-layout row wrap>
          <span class="progress-bar" v-bind:class="{'filled' : zap.params.length}">
            <span class="dot"></span> Params
          </span>
          <v-flex md12 class="tags-section">
            <v-card-text>
              <ul>
                <li v-for="(obj, index) in zap.params" :key="index">
                  <span>{{obj.field_name}} : {{obj.validationType}} : {{obj.field_value}}</span>
                </li>
                <li v-if="!zap.params.length"><span>No Params</span></li>
              </ul>
            </v-card-text>
          </v-flex>
        </v-layout>
        <!-- Params Section Ends -->

        <!-- Attributes Section -->
        <v-layout row wrap>
          <span class="progress-bar" v-bind:class="{'filled' : zap.element_attributes.length}">
            <span class="dot"></span> Attributes
          </span>
          <v-flex md12 class="tags-section">
            <v-card-text>
              <ul>
                <li v-for="(obj, index) in zap.element_attributes" :key="index">
                  <span>{{obj.attribute_name}} - {{obj.attribute_type}}</span>
                </li>
                <li v-if="!zap.element_attributes.length"><span>No Attributes</span></li>
              </ul>
            </v-card-text>
          </v-flex>
        </v-layout>
        <!-- Attributes Section End -->

        <!-- Timeout Section -->
        <v-layout row wrap>
          <span class="progress-bar" v-bind:class="{'filled' : timeoutProgess}">
            <span class="dot filled" ></span> Timeout
          </span>
          <v-flex xs12>
            <v-card-text>
              <ul>
                <li>
                  <span>{{zap.timeout.days ? zap.timeout.days : 0}}
                  Days</span>
                </li>
                <li>
                  <span>{{zap.timeout.hours ? zap.timeout.hours : 0}}
                  Hour</span>
                </li>
                <li>
                  <span>{{zap.timeout.minutes ? zap.timeout.minutes: 0}}
                  Min</span>
                </li>

              </ul>
            </v-card-text>
          </v-flex>
        </v-layout>
        <!-- Timeout Section Ends -->
        <v-layout row wrap>
          <v-flex md12>
            
            <v-btn  
                class="submit-btn" 
                @click="customRoute('/magic')" 
                >
              <img src="../../../assets/images/icon-back-orange.png" alt="icon-back">
              <span>Return to My Zaps</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>

    </v-card>

    <span class="create-new-zap-mobile hidden-sm-and-up">
      <img src="../../../assets/images/icon-createzap.png" alt="icon-createzap">
    </span>

  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
    
    };
  },
  computed:{
    ...mapGetters([
            'zap'
    ]),
    timeoutProgess : function(){
      if ( (this.zap.timeout.days || this.zap.timeout.minutes || this.zap.timeout.hours)){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    customRoute(path){
      this.$store.commit('changeRoute', path);
    }
  },
  created(){

  }
};
</script>
<style lang="scss">
@import "../../../styles/common.scss";
@import "./ViewZap.scss";
</style>