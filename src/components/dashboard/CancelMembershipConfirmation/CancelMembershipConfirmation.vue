<template>
  <div>
    <v-card-text class="paymentinfo locked-acc">
      <div class="center-block">
        <img src="../../../assets/images/icon-confirmation.png" alt="icon">
        <h1>Your subscription has been cancelled successfully.</h1>
        <p>Hey Jon, Thanks for being a premium user of Magiczap so far</p>
        <p>We would be happy to see you back again.</p>
      </div>
    </v-card-text>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
      };
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./CancelMembershipConfirmation.scss";
</style>