<template>
  <div>
    <v-card-text class="paymentinfo">
      <div class="center-block">
        <h1>My payment information</h1>
        <p>You have attached below card informations with your account</p>
        <v-layout row wrap class="eachblock checked" v-if="cards.length"> 
          <!-- <v-flex md3 xs12>
            <v-radio-group v-model="card.defaultCard">
              <v-radio
                :value="true"
              ></v-radio>
              <label>Default</label>
            </v-radio-group>
          </v-flex> -->
          <v-flex md6 xs12>
            <span>Card number</span>
            <h2>XXX XXXX XXXX {{cards[0].last4}}</h2>
          </v-flex>
          <v-flex md3 xs12>
            <span>Expiry (MM/YY)</span>
            <h2>{{cards[0].exp_month}}/{{cards[0].exp_year}}</h2>
          </v-flex>
        </v-layout>
        <v-btn class="submit-btn"  @click="openAddNewCardModal()" v-if="!user.isHookedUser && !user.isAdmin">
          <span >Update Card</span>
        </v-btn>
        <v-btn class="submit-btn"  @click="payUnpaidInvoices()" v-if="loggedInUserSubscribtions.subscriptionStatus =='unpaid' || loggedInUserSubscribtions.subscriptionStatus=='past_due'">
          <span>Pay unpaid invoice</span>
        </v-btn>
      </div>
    </v-card-text>
    <v-card-text>
      <Success v-if="isSuccess"/>
      <Error v-if="isError"/>
    </v-card-text>
    <!-- AddNewCard Component Model -->
      <addnewcard></addnewcard>
    <!-- AddNewCard Component Model -->
  </div>
</template>

<script>
  import AddNewCard from "../../Auth/AddNewCard/AddNewCard.vue";
  import { mapGetters } from 'vuex';
  import Success from '../../../components/Success.vue';
  import Error from '../../../components/Error.vue';

  export default {
    components: {
      addnewcard: AddNewCard,
      Error,
      Success
    },
    data() {
      return {
        radioGroup: 1,
        
      };
    },
    computed:{
      ...mapGetters([
            'cards',
            'user',
            'loggedInUserSubscribtions',
            'isError',
            'isSuccess'
      ])
    },
    methods:{
      openAddNewCardModal(){
        this.$store.commit('changeIsAddNewCardOpen', true);
      },
      payUnpaidInvoices(){
        this.$store.dispatch('payUnpaidInvoices', {})
      }
    },
    created(){
      this.$store.dispatch('getUserCards',{});
    },
    mounted(){
      this.$store.commit('checkCookiePolicy');
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/common.scss";
  @import "./PaymentInfo.scss";
</style>