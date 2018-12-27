 <template>
    <v-layout row justify-center class="passwordWrap">
        <img src="../../../assets/images/smallcross.png" class="cross-btn" v-if="forgetPassword" @click="closeForgetPassword()">
        <v-dialog v-model="forgetPassword" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card class="auth">
                <v-layout row wrap>
                    <v-flex xs5>
                        <div class="heading">
                            <h2>Forget password</h2>
                            <h6>of your magic zap account</h6>
                        </div>
                    </v-flex>
                    <v-flex xs7>
                        <!-- Change Password Section Start Here -->
                        
                        <v-card-text class="changePassword">
                            <Error v-if="isError"/>
                            <Success v-if="isSuccess" />
                            <div v-if="!isSuccess">
                                <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                                    <v-form @submit.prevent="submitForgetPassword()">
                                        <v-container>
                                            <v-layout row wrap>
                                                <v-flex xs12 v-bind:class="{ 'form-error-box': $v.user.email.$error }">
                                                    <v-text-field
                                                        v-model="user.email"
                                                        @blur="$v.user.email.$touch()"
                                                        type="text"
                                                        placeholder="EMAIL" solo>
                                                    </v-text-field>
                                                    <span class="validation-error-message"
                                                                v-if="!$v.user.email.required && $v.user.email.$error">
                                                                This field is Required!
                                                    </span>
                                                    <span class="validation-error-message"
                                                                v-if="!$v.user.email.email && $v.user.email.$error">
                                                                Should be an email
                                                    </span>
                                                </v-flex>
                                                <v-btn block class="orangeButton" :disabled="$v.user.$invalid" type='submit'>
                                                    <img src="../../../assets/images/changepass.png" alt="changepassword">
                                                        Forget Password
                                                </v-btn>
                                            </v-layout>
                                        </v-container>
                                    </v-form>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                            </div>
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
    import { required, email} from 'vuelidate/lib/validators';
    import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
        user:{
            email:''
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
            'forgetPassword',
            'isError',
            'isSuccess',
        ])
    },
    methods:{
        closeForgetPassword(){
            this.$store.commit('changeForgetPassword', false);
        },
        submitForgetPassword(){
            var payload = {
                email: this.user.email
            }
            this.$store.dispatch('forgetPassword',payload);
        },
    },
    validations:{
        user:{
            email : {
                required,
                email
            }
        }
    },
    watch: {
            // Reset Login From
        forgetPassword : function(val){
            if (!val){
                this.user.email = '';
                this.$v.user.$reset();
            }
        }
    }
  }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './ForgetPassword.scss';
</style>



