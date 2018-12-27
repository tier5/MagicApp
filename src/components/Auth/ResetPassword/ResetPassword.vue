 <template>
    <v-layout row justify-center class="passwordWrap">
        <img src="../../../assets/images/smallcross.png" class="cross-btn" v-if="'true'" @click="back()">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card class="auth">
                <v-layout row wrap>
                    <v-flex xs5>
                        <div class="heading">
                            <h2>reset password</h2>
                            <h6>of your magic zap account</h6>
                        </div>
                    </v-flex>
                    <v-flex xs7>
                        <!-- Reset Password Section Start Here -->
                        <v-card-text class="changePassword">
                            <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                            <Error v-if="isError"/>
                            <Success v-if="isSuccess"/>
                            <div v-if="!isSuccess">
                                <v-form @submit.prevent='onResetPassword()'>
                                    <v-container>
                                        <v-layout row wrap>
                                            <v-flex xs12 v-bind:class="{ 'form-error-box': $v.user.password.$error }">
                                                <v-text-field
                                                    v-model="user.password"
                                                    @blur="$v.user.password.$touch()"
                                                    type="password"
                                                    placeholder="NEW PASSWORD" solo>
                                                </v-text-field>
                                                <span class="validation-error-message"
                                                            v-if="!$v.user.password.required && $v.user.password.$error">
                                                            This field is Required!
                                                </span>
                                                <span class="validation-error-message"
                                                            v-if="!$v.user.password.minLength && $v.user.password.$error">
                                                            Minimum size should be 6
                                                </span>
                                            </v-flex>
                                            <v-flex xs12 v-bind:class="{ 'form-error-box': $v.user.confirmPassword.$error }">
                                                <v-text-field
                                                        v-model="user.confirmPassword"
                                                        @blur="$v.user.confirmPassword.$touch()"
                                                        type="password" 
                                                        placeholder="CONFIRM PASSWORD" solo>
                                                </v-text-field>
                                                <span class="validation-error-message"
                                                            v-if="!$v.user.confirmPassword.sameAsPassword && $v.user.confirmPassword.$error">
                                                            Password didn't match
                                                </span>
                                            </v-flex>
                                            <v-btn block class="orangeButton" :disabled="$v.user.$invalid" type='submit'>
                                                <img src="../../../assets/images/changepass.png" alt="changepassword">
                                                    Reset password
                                            </v-btn>
                                        </v-layout>
                                    </v-container>
                                </v-form>
                            </div>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card-text>
                        <!-- Reset Password Section Ends Here -->
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
        dialog : true,
        user:{
            password:'',
            confirmPassword:''
        },
        resetToken:''
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
            'forgetPassword',
            'isError',
            'isSuccess',
        ])
    },
    methods:{
        back(){
            this.$store.commit('changeRoute', '/');
        },
        
         onResetPassword(){
            var payload = {
                password: this.user.password,
                token : this.resetToken
            };
            this.$store.dispatch('resetForget',payload)
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
    created(){
        this.resetToken = this.$route.params.token
    }
  }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './ResetPassword.scss';
</style>



