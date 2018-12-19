 <template>
   <div>
        <v-layout row justify-center  class="loginWrap">
        
            <img src="../../../assets/images/smallcross.png" class="cross-btn" @click="closeModal()" v-if="isLoginModalOpen"> 
            <v-dialog v-model="isLoginModalOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card class="auth">
                    <v-layout row wrap>
                        <v-flex xs5>
                            <div class="heading leftSpace">
                                <h2>login</h2>
                                <h6>to your magic zap account</h6>
                            </div>
                        </v-flex>
                        <v-flex xs7>
                            <v-card-text class="login">
                                <v-menu transition="scale-transition" origin="center center">
                                    <Error v-if="isError"/>
                                </v-menu>
                                
                                <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                                <v-form>
                                    <v-container>
                                        <v-layout row wrap>
                                            <v-flex xs12 
                                                v-bind:class="{ 'form-error-box': $v.user.email.$error }">
                                                <v-text-field 
                                                    label="Solo"  
                                                    placeholder="EMAIL" 
                                                    class="email" solo
                                                    v-model="user.email"
                                                    @blur="$v.user.email.$touch()">
                                                </v-text-field>
                                                <span class="validation-error-message"
                                                        v-if="!$v.user.email.required && $v.user.email.$error">
                                                        This field is Required!
                                                </span>
                                                <span class="validation-error-message"
                                                    v-if="!$v.user.email.email && $v.user.email.$error">
                                                    Must be an Email!
                                                </span>
                                            </v-flex>

                                            <v-flex xs12
                                                v-bind:class="{ 'form-error-box': $v.user.password.$error }">
                                                <v-text-field 
                                                    label="Solo"  
                                                    placeholder="PASSWORD" 
                                                    class="password" 
                                                    solo
                                                    :type="'password'"
                                                    v-model="user.password"
                                                    @blur="$v.user.password.$touch()">
                                                </v-text-field>
                                                <span class="validation-error-message"
                                                    v-if="!$v.user.password.required && $v.user.password.$error">
                                                    This field is Required!
                                                </span>
                                            </v-flex>
                                            <a href="#" class="forgotpass">forgot password?</a>
                                            <v-btn block color="orangeButton" 
                                                :disabled="$v.user.$invalid"
                                                @click="onLogin">
                                                <img src="../../../assets/images/lock.png" alt="login">login
                                            </v-btn>
                                            <span>Don't have an account?<a href="#"> sign up now!</a></span>
                                        </v-layout>
                                    </v-container>
                                </v-form>
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
   </div>
 </template> 

<script>
    import Success from '../../../components/Success.vue';
    import Error from '../../../components/Error.vue';
    import { required, email} from 'vuelidate/lib/validators';
    import {mapGetters} from 'vuex';
    export default {
        data () {
            return {
                dialog: false,
                show1:false,
                email:'',
                password:'',
                isHidden: true,
                user:{
                    email:'',
                    password:''
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
                'isLoginModalOpen',
                'isError'
            ])
        },
        methods:{
            closeModal(){
                this.$store.commit('changeIsLoginModalOpen', false);
            },
            onLogin () {
                this.$store.dispatch('userSignIn', this.user)
            },
        },
        validations:{
            user:{
                email:{
                    required,
                    email
                },
                password:{
                    required
                }
            }
        },
        watch: {
            // Reset Login From
            isLoginModalOpen : function(val){
                if (!val){
                    this.user.email = '';
                    this.user.password = '';
                    this.$v.user.$reset();
                }
            }
        }

    }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './Login.scss';
</style>



