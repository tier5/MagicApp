 <template>
    <v-layout row justify-center  class="loginWrap">
        <v-btn color="orangeButton" @click="dialog = true" v-on:click="isHidden = false">login</v-btn>
        <!-- <Loader v-if="!isHidden" /> -->
        <img src="../../../assets/images/smallcross.png" class="cross-btn" @click="dialog = false" v-if="!isHidden" v-on:click="isHidden = true"> 
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
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
                            <Success />
                            <Error />
                            <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                            <v-form>
                                <v-container>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Solo" v-model="email" placeholder="EMAIL" class="email" solo></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Solo" v-model="password" :type="show1 ? 'text' : 'password'" placeholder="PASSWORD" class="password" solo></v-text-field>
                                        </v-flex>
                                        <a href="#" class="forgotpass">forgot password?</a>
                                        <v-btn block color="orangeButton" dark><img src="../../../assets/images/lock.png" alt="login">login</v-btn>
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
 </template> 

<script>

    import Loader from '../../../components/Loader.vue';
    import Success from '../../../components/Success.vue';
    import Error from '../../../components/Error.vue';
    export default {
        data () {
            return {
                dialog: false,
                show1:false,
                email:'',
                password:'',
                isHidden: true
            }
        },
        name: 'loader',
        name: 'success',
        name: 'error',
        components: {
            Loader,
            Success,
            Error
        }
    }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './Login.scss';
</style>



