<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <button class="btn btn-default" @click="newCard">Add New Card</button>
        <stripe-new-card v-if="cardModal"></stripe-new-card>
      </div>
    </div>
    <div class="clearfix"></div>
   	<div class="row">
      <div class="col-md-4 col-sm-6 " v-for="userCard in userCards" :key="userCard.id">
        <div class="card-holder" :style="{'background-image': `url(${require('../assets/card-bg.jpg')})`}">
          <span class="card-cross">
            <a href="#" @click.prevent="deleteCard(userCard.id)">
              <img src="../assets/error.png" alt="img">
            </a>	
          </span>
          <div class="col-md-12 col-sm-12">
            <div class="heading">
              <h2 :style="{'background': `url(${require('../assets/stripe.png')})no-repeat bottom`}">
                <span v-if="userCard.brand =='Visa'">Visa Card</span>
                <span v-if="userCard.brand =='MasterCard'">Master Card</span>
              </h2>
            </div>
            <div class="card-no">
              <span>Card No:</span> XXXX XXXX XX {{userCard.last4}}
            </div>
            <div class="row card-bottom">
              <div class="col-md-6 col-sm-6">Expiry Date: {{userCard.exp_month}}/{{userCard.exp_year}}</div>
              <div class="col-md-6 col-sm-6 align-right">
                <div class="card-pic">
                  <img v-if="userCard.brand =='Visa'" src="../assets/visa.jpg" alt="img">
                  <img v-if="userCard.brand =='MasterCard'" src="../assets/master.png" alt="img">
                </div>
              </div>
            </div>
          </div>	
        </div>
        <div><button class="btn btn-default" :disabled="userCard.defaultCard" v-if="userCard.defaultCard">Default Card</button></div>
        <div><button class="btn btn-default" v-if="!userCard.defaultCard" @click="makeDefault(userCard.id)">Make Default</button></div>        
      </div>
		</div>
    <hr>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import StripeNewCard from './StripeNewCard';
export default {
  data () {
    return {
      
    }
  },
  computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'userCards',
          'isCardValid',
          'cardModal'
        ]),
  },
  methods:{
    deleteCard(id){
      this.$store.dispatch('deleteUserCard',id);
    },
    newCard(){
      this.$store.commit('changeCardModal',true);
    },
    makeDefault(id){
      this.$store.dispatch('changeDefaultCard',id);
    }
  },
  created(){
    this.$store.dispatch('getUserCards');
    this.$store.commit('changeIsCardValid',false);
  },
  components:{
    StripeNewCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Nunito:300,400,600');
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

  .card-holder{background-size: cover; min-height: 216px; border-radius: 7px;
  margin-top: 25px; color: #fff; position: relative;}
  .card-cross{width:24px; height: 24px; position: absolute; right: -11px; top: -11px; z-index: 998; }
  .heading{padding:20px 0 10px; }
  .heading h2{font-family: 'Nunito', sans-serif; background-size: 100%; padding-bottom: 13px;font-size: 17px;}
  .card-no{padding-top:16px; font-family: 'Roboto', sans-serif; font-size: 15px; letter-spacing: 5px;}
  .card-no span{font-size: 13px; font-weight: 300; letter-spacing: normal;}
  .card-bottom{padding-top:42px; font-size: 15px; font-family: 'Roboto', sans-serif;}
  .align-right{text-align:right;}
  .card-pic{width:51px; text-align: right; display: inline-block}
  .card-pic img{max-width:100%;}

  @media screen and (max-width: 600px) {

  .card-bottom{padding-top: 65px;}
  .card-no{font-size:24px;}
  }

  @media screen and (max-width: 480px) {

  .card-bottom{padding-top: 65px;}
  .card-no{font-size:20px;}
  .heading h2{font-size:19px;}
  }
</style>
