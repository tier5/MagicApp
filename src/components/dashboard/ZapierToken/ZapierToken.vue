<template>
  <div>
    <v-card-text class="key-section">
      <h2>Zapier Api Key</h2>
      <div v-clipboard="token" class="copyscript">
        <v-btn slot="activator" class="hidden-sm-and-down">Copy</v-btn>
      </div>
      <h4>{{token}}</h4>
    </v-card-text>
    <v-card-text class="key-section">
      <h2>Zapier Invitation Link</h2>
      <div v-clipboard="token" class="copyscript">
        <v-btn slot="activator" class="hidden-sm-and-down">Copy</v-btn>
      </div>
      <h4>{{inviteLink}}</h4>
    </v-card-text>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      drawer: null,
      mini: false,
      right: null,
      inviteLink:'https://zapier.com/developer/invite/96885/cd80710164f70d1253e86dd35cb877fd/'
    };
  },
  computed:{
    ...mapGetters([
        'token',
        'user'
      ])
  }
};
</script>
<style lang="scss">
@import "../../../styles/common.scss";
@import "./ZapierToken.scss";
</style>