 <template>
    <v-layout row justify-center class="passwordWrap">
        <img src="../../../assets/images/smallcross.png" class="cross-btn" v-if="isAddNewCardModalOpen" @click="closeAddNewCard()">
        <v-dialog v-model="isAddNewCardModalOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card class="auth">
                <v-layout row wrap>
                    <v-flex xs5>
                        <div class="heading">
                            <h2>Add a New Card Information</h2>
                            <h6>to your magic zap account</h6>
                        </div>
                    </v-flex>
                    <v-flex xs7>
                        <!-- Add a New Card Section Start Here -->
                        <v-card-text class="changePassword">
                            <v-form>
                                <v-container>
                                    <v-layout row wrap>
                                        
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
        user:{
            password:'',
            confirmPassword:''
        }
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'isAddNewCardModalOpen'
        ])
    },
    methods:{
        closeAddNewCard(){
            this.$store.commit('changeIsAddNewCardModalOpen', false);
        },
    }
  }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './AddNewCard.scss';
</style>



