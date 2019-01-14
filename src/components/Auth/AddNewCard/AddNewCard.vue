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
                            <v-form>
                                <v-container>
                                    <v-card-text>
                                        <h4>credit card information</h4>
                                    </v-card-text>
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
                                                placeholder="01"
                                                solo
                                                ></v-select>
                                            </v-card-text>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-card-text>
                                                <label for="expyear">Expiry Year:</label>
                                                <v-select
                                                :items="itemsyear"
                                                placeholder="2019"
                                                solo
                                                ></v-select>
                                            </v-card-text>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <v-card-text>
                                                <v-btn block color="orangeButton" 
                                                    type='submit'
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
    import { required, sameAs, minLength} from 'vuelidate/lib/validators';
    import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
        name: '',
        email:'',
        password:'',
        user:{
            name: '',
            email:'',
            password:''
        },
        items: ['01', '02', '03', '04'],
        itemsyear: ['2019', '2020', '2021', '2022']
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'isAddNewCardOpen'
        ])
    },
    methods:{
        closeAddNewCard(){
            this.$store.commit('changeIsAddNewCardOpen', false);
        },
    }
  }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './AddNewCard.scss';
</style>



