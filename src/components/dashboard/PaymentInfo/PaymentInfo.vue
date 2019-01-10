<template>
  <div>
    <v-card-text class="paymentinfo">
      <div class="center-block">
        <h1>My payment information</h1>
        <p>You have attached below card informations with your account</p>
        <v-layout row wrap class="eachblock checked"> 
          <v-flex md3 xs12>
            <v-radio-group v-model="radioGroup">
              <v-radio
                :value="1"
              ></v-radio>
              <label>Default</label>
            </v-radio-group>
          </v-flex>
          <v-flex md6 xs12>
            <span>Card number</span>
            <h2>XXX XXXX XXXX 1234</h2>
          </v-flex>
          <v-flex md3 xs12>
            <span>Expiry (MM/YY)</span>
            <h2>03/22</h2>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="eachblock"> 
          <v-flex md3 xs12>
            <v-radio-group v-model="radioGroup">
              <v-radio
                :value="2"
                checked=true
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex md6 xs12>
            <span>Card number</span>
            <h2>XXX XXXX XXXX 5678</h2>
          </v-flex>
          <v-flex md3 xs12>
            <span>Expiry (MM/YY)</span>
            <h2>03/22</h2>
          </v-flex>
        </v-layout>
        <v-btn class="submit-btn">
          <span>add a new card</span>
        </v-btn>
      </div>
    </v-card-text>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        radioGroup: 1
      };
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./PaymentInfo.scss";
</style>