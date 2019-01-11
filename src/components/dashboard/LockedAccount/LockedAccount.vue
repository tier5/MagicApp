<template>
  <div>
    <v-card-text class="paymentinfo locked-acc">
      <div class="center-block">
        <img src="../../../assets/images/icon-acc-locked.png" alt="icon">
        <h1>Account Locked!</h1>
        <p>Hey Jon, your account has been suspended due to failure of your monthly subscription fees payment.</p>
        <p>Please <a href="#" class="makepayment">Make the Payment</a> to enjoy un-interrupted service.</p>
        <div class="gap"></div>
        <p>You may contact our <a href="#">Support Team</a> for further assistance.</p>
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
  @import "./LockedAccount.scss";
</style>