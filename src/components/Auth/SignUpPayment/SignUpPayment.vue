<template>
  <div>
    <v-container fluid>
        <v-layout row wrap class="signup auth payment">
            <v-flex md4 hidden-md-and-up class="left-side-mobile">
                <v-card>
                    <img src="../../../assets/images/signup-payment.png" alt="banner"/>
                </v-card>
            </v-flex>
            <v-flex md4 class="left-side">
                <v-card-text>
                    <div class="form-top">
                        <img src="../../../assets/images/dashboard-logo.png" alt="Header Logo" class="header-logo">
                        <p>Magic Zap is a very powerful and magical software. Magic Zap will allow you to present personalised dynamic websites to your visitors. Start your 14 day free trial and <span>pay nothing today!</span> </p>
                    </div>
                    <div class="trial">
                        <v-layout row wrap>
                            <v-flex md9>
                                <v-icon>mdi-check</v-icon>
                                <div class="trial-left">
                                    <h2>Magic Zap Starter</h2>
                                    <span>14 Days FREE Trial</span>
                                </div>
                            </v-flex>
                            <v-flex md3>
                                <h2>$27/mo</h2>
                                <h3>after trial period</h3>
                            </v-flex>
                        </v-layout>
                    </div>
                    <v-form>
                        <v-container>
                            <v-flex>
                                <h4>credit card information</h4>
                            </v-flex>
                            <v-layout row wrap>
                                <v-flex xs8>
                                    <v-card-text>
                                        <label for="ccn">Credit Card Number:</label>
                                        <v-text-field 
                                            label="Solo"  
                                            placeholder="CARD NUMBER" 
                                            class="payment_details" solo>
                                        </v-text-field>
                                    </v-card-text>
                                </v-flex>
                                <v-flex xs4>
                                    <v-card-text>
                                        <label for="cvv">CVV Code:</label>
                                        <v-text-field 
                                            label="Solo"  
                                            placeholder="CVV" 
                                            class="payment_details" solo>
                                        </v-text-field>
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs6>
                                    <v-card-text>
                                        <label for="expmonth">Expiry Month:</label>
                                        <v-select
                                        :items="items"
                                        solo
                                        ></v-select>
                                    </v-card-text>
                                </v-flex>
                                <v-flex xs6>
                                    <v-card-text>
                                        <label for="expyear">Expiry Year:</label>
                                        <v-select
                                        :items="items"
                                        solo
                                        ></v-select>
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-btn block color="orangeButton" 
                                        type='submit'
                                        >
                                        <h5>Start my 14 day FREE trial</h5>
                                        <span>You Pay Nothing Today</span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-flex>
            <v-flex md4 class="middle">
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
                </v-card-text>
            </v-flex>
            <v-flex md4 hidden-sm-and-down class="right-side">
                <v-card>
                    <img src="../../../assets/images/signup-payment.png" alt="banner"/>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
   
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        name: '',
        email:'',
        password:'',
        user:{
            name: '',
            email:'',
            password:''
        },
        items: ['01', '02', '03', '04']
      };
    }
  };
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import "./SignUpPayment.scss";
</style>