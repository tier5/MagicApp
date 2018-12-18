 <template>
    <v-layout row justify-center class="passwordWrap">
        <img src="../../../assets/images/smallcross.png" class="cross-btn" v-if="isChangePasswordModalOpen" @click="closeChangePassword()">
        <v-dialog v-model="isChangePasswordModalOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card class="auth">
                <v-layout row wrap>
                    <v-flex xs5>
                        <div class="heading">
                            <h2>change password</h2>
                            <h6>of your magic zap account</h6>
                        </div>
                    </v-flex>
                    <v-flex xs7>
                        <!-- Change Password Section Start Here -->
                        <v-card-text class="changePassword">
                            <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                            <v-form>
                                <v-container>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <v-text-field 
                                                label="Solo" 
                                                v-model="user.password"
                                                @blur="$v.user.password.$touch()"
                                                type="text"
                                                placeholder="NEW PASSWORD" solo>
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field 
                                                    label="Solo" 
                                                    v-model="user.confirmPassword"
                                                    @blur="$v.user.confirmPassword.$touch()"
                                                    type="text" 
                                                    placeholder="CONFIRM PASSWORD" solo>
                                            </v-text-field>
                                        </v-flex>
                                        <v-btn block class="orangeButton" :disabled="$v.user.$invalid" @click="onResetPassword()">
                                            <img src="../../../assets/images/changepass.png" alt="changepassword">
                                                change password
                                        </v-btn>
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
    components: {
        // Loader,
        Success,
        Error
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'isChangePasswordModalOpen',
            'isError'
        ])
    },
    methods:{
        closeChangePassword(){
            this.$store.commit('changeIsChangePasswordModalOpen', false);
        },
        onResetPassword(){
            var payload = {
                password: this.user.password
            };
            this.$store.dispatch('changePassord',payload)
        }
    },
    validations:{
        user:{
            password:{
                required,
                minLength: minLength(6)
            },
            confirmPassword:{
                sameAsPassword: sameAs('password')
            }
        }
    },
  }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './ChangePassword.scss';
</style>



