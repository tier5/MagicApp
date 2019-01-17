 <template>
    <v-layout row justify-center class="passwordWrap">
        <img src="../../../assets/images/smallcross.png" class="cross-btn" v-if="isAddNewCardOpen" @click="closeAddNewCard()">
        <v-dialog v-model="isAddNewCardOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card class="auth">
                <v-layout row wrap>
                    <v-flex xs5>
                        <div class="heading">
                            <h2>Add a New Card</h2>
                            <h6>to your magic zap account</h6>
                        </div>
                    </v-flex>
                    <v-flex xs7>
                        <!-- Add a New Card Section Start Here -->
                        <v-card-text class="changePassword addnewcard">
                            <v-form @submit.prevent="submit()">
                                <v-container>
                                    <v-card-text>
                                        <h4>credit card information</h4>
                                    </v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs8>
                                            <Error v-if="isError" />

                                        </v-flex>
                                        <v-flex xs8>
                                            <v-card-text>
                                                <label for="ccn">Credit Card Number:</label>
                                                <card-number class='stripe-element card-number'
                                                    ref='cardNumber'
                                                    :stripe='stripe'
                                                    :options='options'
                                                    @change='number = $event.complete'
                                                />
                                            </v-card-text>
                                        </v-flex>
                                        <v-flex xs4>
                                            <v-card-text>
                                                <label for="cvv">CVV Code:</label>
                                                <card-cvc class='stripe-element card-cvc payment_details'
                                                    ref='cardCvc'
                                                    :stripe='stripe'
                                                    :options='options'
                                                    @change='cvc = $event.complete'
                                                />
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs6>
                                            <v-card-text>
                                                <label for="expmonth">Expiry:</label>
                                                <card-expiry class='stripe-element card-expiry'
                                                    ref='cardExpiry'
                                                    :stripe='stripe'
                                                    :options='options'
                                                    @change='expiry = $event.complete'
                                                />
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <v-card-text>
                                                <v-btn block color="orangeButton" 
                                                    type='submit'
                                                    :disabled='!complete'
                                                    >
                                                    <span>Save This card</span>
                                                </v-btn>
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-form>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card-text>
                        <!-- Change Password Section Ends Here -->
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-layout>
 </template> 

<script>
    import Success from '../../../components/Success.vue';
    import Error from '../../../components/Error.vue';
    import { CardNumber, CardExpiry, CardCvc, createToken } from 'vue-stripe-elements-plus';
    import {mapGetters} from 'vuex';
    export default {
        data () {
        return {
            items: ['01', '02', '03', '04'],
            itemsyear: ['2019', '2020', '2021', '2022'],
            complete: false,
            number: false,
            expiry: false,
            cvc: false,
            options:{},
            stripe: process.env.VUE_APP_STRIPE_KEY
        }
        },
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters([
                'isAddNewCardOpen',
                'isError'
            ])
        },
        methods:{
            closeAddNewCard(){
                this.$store.commit('changeIsAddNewCardOpen', false);
            },
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
            submit(){
                this.complete = false;
                createToken().then(data=>{
                    this.complete = true
                    let requestData = {
                        cardToken : data.token.id
                    }
                    this.$store.dispatch('addUserCard', requestData);
                }).catch(err=>{
                    alert('Please refresh the page!');
                })
                
            }
        },
        components: { CardNumber, CardExpiry, CardCvc, Error, Success},
        watch: {
            number () { this.update() },
            expiry () { this.update() },
            cvc () { this.update() },
            isAddNewCardOpen : function(val){
                if(!val){
                    this.$refs.cardCvc.clear();
                    this.$refs.cardExpiry.clear();
                    this.$refs.cardNumber.clear();
                }
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './AddNewCard.scss';
</style>



