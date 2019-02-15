<template>
  <div>
    <v-container fluid>
        <v-layout row wrap class="signup auth">
            <v-flex md9 hidden-md-and-up class="left-side-mobile">
                <v-card>
                    <img src="../../../assets/images/signup.png" alt="banner"/>
                </v-card>
            </v-flex>
            <v-flex md3 class="left-side">
                <v-card-text>
                    <div class="form-top">
                        <img src="../../../assets/images/dashboard-logo.png" alt="Header Logo" class="header-logo">
                        <p>Sign Up to Magic Zap to Start Your <span>14 days FREE Trial</span> </p>
                    </div>
                    <v-form @submit.prevent="checkSignUp()">
                        <Error v-if="isError"/>
                        <v-container>
                            <v-layout row wrap>

                                <v-flex xs12 v-bind:class="{ 'form-error-box': $v.user.name.$error }">
                                    <v-text-field 
                                        label="Solo"  
                                        placeholder="FULL NAME" 
                                        class="name" solo
                                        v-model="user.name"
                                        @blur="$v.user.name.$touch()">
                                    </v-text-field>
                                    <span class="validation-error-message"
                                        v-if="!$v.user.name.required && $v.user.name.$error">
                                        Name is Required!
                                    </span>
                                </v-flex>
                                <v-flex xs12 v-bind:class="{ 'form-error-box': $v.user.email.$error }">
                                    <v-text-field 
                                        label="Solo"  
                                        placeholder="EMAIL" 
                                        class="email" solo
                                        v-model="user.email"
                                        @blur="$v.user.email.$touch()">
                                    </v-text-field>
                                    <span class="validation-error-message"
                                        v-if="!$v.user.email.required && $v.user.email.$error">
                                        Email is Required!
                                    </span>
                                    <span class="validation-error-message"
                                        v-if="!$v.user.email.email && $v.user.email.$error">
                                        Must be an Email!
                                    </span>
                                </v-flex>
                                <v-flex xs12 v-bind:class="{ 'form-error-box': $v.user.password.$error }">
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
                                        Password is Required!
                                    </span>
                                    <span class="validation-error-message"
                                        v-if="!$v.user.password.minLength && $v.user.password.$error">
                                        Minimum Length of password should be 6
                                    </span>
                                </v-flex>
                                <v-flex xs12 v-bind:class="{ 'form-error-box': $v.user.confirmPassword.$error }">
                                    <v-text-field 
                                        label="Solo"  
                                        placeholder="CONFIRM PASSWORD" 
                                        class="password" 
                                        solo
                                        :type="'password'"
                                        v-model="user.confirmPassword"
                                        @blur="$v.user.confirmPassword.$touch()">
                                    </v-text-field>
                                    <span class="validation-error-message"
                                        v-if="!$v.user.confirmPassword.required && $v.user.confirmPassword.$error">
                                        Confirm Password is Required!
                                    </span>
                                    <span class="validation-error-message"
                                        v-if="!$v.user.confirmPassword.sameAsPassword && $v.user.confirmPassword.$error">
                                        Confirm Password didn't matched!
                                    </span>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn block color="orangeButton" 
                                        type='submit'
                                        :disabled="$v.user.$invalid"
                                        >
                                        <img src="../../../assets/images/lock.png" alt="sign up">sign up
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12>
                                    <p>Already have an account?<a @click.prevent="openLogin"> Login </a>in here.</p>
                                    <p>By creating your account to use Magiczap, you are agreeing to our <a> Terms of Service </a>and <a>Privacy Policy</a></p>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-flex>
            <v-flex md9 hidden-sm-and-down class="right-side"></v-flex>
        </v-layout>
    </v-container>
    <Login/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { required, email, minLength, sameAs} from 'vuelidate/lib/validators';
  import Login from '../Login/Login.vue';
  import Error from '../../../components/Error.vue';
  export default {
    data() {
      return {
        name: '',
        email:'',
        password:'',
        user:{
            name: '',
            email:'',
            password:'',
            confirmPassword:''
        }
      };
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'isError'
        ])
    },
    methods:{
        openLogin(){
            this.$store.commit("changeIsLoginModalOpen", true);
        },
        checkSignUp(){
            this.$store.dispatch('validateEmail', this.user);
        }
    },
    components:{
        Login,
        Error
    },
    validations:{
        user : {
            name:{
                required
            },
            email:{
                required,
                email
            },
            password:{
                required,
                minLength: minLength(6)
            },
            confirmPassword:{
                required,
                sameAsPassword: sameAs('password')
            }
        }
    }
  };
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import "./SignUp.scss";
</style>