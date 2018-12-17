<template>
  <div>
    <v-card-text class="key-section">
      <h2>Zapier Api Key</h2>
      <span>
        <img src="../../../assets/images/icon-copy.png" alt="icon" class="icon-copy">Copy
      </span>
      <h4>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvcmtAdGllcjUudXMiLCJpYXQiOjE1MTYwMjU2Njl9.Ku1jTxn3aOe6eqrwDz9OAweGNiT8YjzrRiWvTX1eziY</h4>
    </v-card-text>
    <v-card-text class="key-section">
      <h2>Zapier Invitation Link</h2>
      <span>
        <img src="../../../assets/images/icon-copy.png" alt="icon" class="icon-copy">Copy
      </span>
      <h4>https://zapier.com/developer/invite/96885/cd80710164f70d1253e86dd35cb877fd/</h4>
    </v-card-text>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      mini: false,
      right: null
    };
  }
};
</script>
<style lang="scss">
@import "../../../styles/common.scss";
@import "./ZapierToken.scss";
</style>