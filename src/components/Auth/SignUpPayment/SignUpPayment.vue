<template>
  <div>
    <v-container fluid>
        <v-layout row wrap class="signup auth payment">
            <v-flex lg4 md12 class="left-side">
                <v-card-text>
                    <div class="form-top">
                        <img src="../../../assets/images/dashboard-logo.png" alt="Header Logo" class="header-logo">
                        <p>Magic Zap is a very powerful and magical software. Magic Zap will allow you to present personalised dynamic websites to your visitors. Start your 14 day free trial and <span>pay nothing today!</span> </p>
                    </div>
                    <div class="trial">
                        <v-layout row wrap>
                            <v-flex md9 xs8>
                                <v-icon>mdi-check</v-icon>
                                <div class="trial-left">
                                    <h2>Magic Zap Starter</h2>
                                    <span>14 Days FREE Trial</span>
                                </div>
                            </v-flex>
                            <v-flex md3 xs4>
                                <h2>$27/mo</h2>
                                <h3>after trial period</h3>
                            </v-flex>
                        </v-layout>
                    </div>
                    <v-form @submit.prevent="register()">
                        <Error v-if="isError"/>
                        <v-container>
                            <v-flex>
                                <h4>credit card information</h4>
                            </v-flex>
                            <v-layout row wrap>
                                <v-flex xs8>
                                    <div>
                                        <label for="ccn">Credit Card Number:</label>
                                        <card-number class='stripe-element card-number'
                                            ref='cardNumber'
                                            :stripe='stripe'
                                            :options='options'
                                            @change='number = $event.complete'
                                            />
                                    </div>
                                </v-flex>
                                <v-flex xs4>
                                    <div>
                                        <label for="cvv">CVV Code:</label>
                                        <card-cvc class='stripe-element card-cvc payment_details'
                                            ref='cardCvc'
                                            :stripe='stripe'
                                            :options='options'
                                            @change='cvc = $event.complete'
                                            />
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs6>
                                    <div>
                                        <label for="expmonth">Expiry:</label>
                                        <card-expiry class='stripe-element card-expiry'
                                            ref='cardExpiry'
                                            :stripe='stripe'
                                            :options='options'
                                            @change='expiry = $event.complete'
                                            />
                                    </div>
                                </v-flex>

                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 >
                                    <v-btn block color="orangeButton" 
                                        type='submit'
                                        :disabled='!complete'
                                        
                                        >
                                        <h5>Start my 14 day FREE trial</h5>
                                        <span>You Pay Nothing Today</span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 text-xs-center class="creditCardImage">
                                    <img src="../../../assets/images/credit-only.png" alt="Credit Card"/>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-flex>
            <v-flex lg4 md6 sm6 class="middle">
                <v-card-text>
                    <h1>Here's What You'll Get:</h1>
                    <ul>
                        <li><v-icon>mdi-check</v-icon><span>14 Day Free Trial. Pay nothing today.</span></li>
                        <li><v-icon>mdi-check</v-icon><span>Increased engagement and conversions</span></li>
                        <li><v-icon>mdi-check</v-icon><span>MORE SALES</span></li>
                        <li><v-icon>mdi-check</v-icon><span>Simple and easy to use software</span></li>
                        <li><v-icon>mdi-check</v-icon><span>Ability to create completely customised websites and landing pages.</span></li>
                        <li><v-icon>mdi-check</v-icon><span>Ability to track website activity - Know who is on your website and when. Know what your website visitors are doing.</span></li>
                        <li><v-icon>mdi-check</v-icon><span>Ability to trigger custom automation when leads visit your website.</span></li>
                        <li><v-icon>mdi-check</v-icon><span>Ability to prepopulate form data
                            <br>
                        </span></li>
                        <li><v-icon>mdi-check</v-icon><span>Magic Option - Pass data to each new page that your visitor visits. You can turn this on or off.</span></li>
                        <li><v-icon>mdi-check</v-icon><span>Cookies - We'll store all your data in a site wide cookie so next time yours visit your site Magic Zap will work. You can also turn this feature on or off.</span></li>
                    </ul>
                    <ul class="ssl" >
                        <li>
                            <img src="../../../assets/images/moneyback.png" alt="SSL" >
                            <span>Money Back Guarantee</span>
                        </li>
                        <li>
                            <img src="../../../assets/images/privacy.png" alt="SSL" >
                            <span>Privacy Guaranteed</span>
                        </li>
                        <li>
                            <img src="../../../assets/images/secure.png" alt="SSL" >
                            <span>100% Secure Information</span>
                        </li>
                    </ul>
                </v-card-text>
            </v-flex>
            <v-flex lg4 md6 sm6 class="right-side"></v-flex>
        </v-layout>
    </v-container>
   
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { CardNumber, CardExpiry, CardCvc, createToken } from 'vue-stripe-elements-plus';
  import Error from '../../../components/Error.vue';
  export default {
    data() {
      return {
        complete: false,
        number: false,
        expiry: false,
        cvc: false,
        options:{},
        stripe: process.env.VUE_APP_STRIPE_KEY
      };
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'isError',
            'registerUser'
        ])
    },
    methods:{
        update(){
            this.complete = this.number && this.expiry && this.cvc 
             if (this.number) {
                if (!this.cvc) {
                    this.$refs.cardCvc.focus()
                } else if (!this.expiry) {
                    this.$refs.cardExpiry.focus()
                }
            } else if (this.expiry) {
                if (!this.cvc) {
                    this.$refs.cardCvc.focus()
                } else if (!this.number) {
                    this.$refs.cardNumber.focus()
                }
            }
        },
        register(){
            this.complete = false
            let createNewUser ={}
            
            createToken().then(data => {
                this.complete = true
                createNewUser = this.registerUser;
                createNewUser.cardToken = data.token.id;
                createNewUser.card = data.token.card;
                let affiliateId= localStorage.getItem('affiliateId');
                if(affiliateId){
                    createNewUser.affiliateId = affiliateId
                }
                
                this.$store.dispatch('userSignUp', createNewUser);
          }).catch((err)=> {
            console.log(err);
          })
        }
    },
    components: { CardNumber, CardExpiry, CardCvc, Error },
    created(){
        if(!this.registerUser.name){
            this.$store.commit('changeRoute', '/register');
        }
    },
    watch: {
        number () { this.update() },
        expiry () { this.update() },
        cvc () { this.update() }
    }
  };
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import "./SignUpPayment.scss";
</style>