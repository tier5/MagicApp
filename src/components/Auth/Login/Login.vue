 <template>
    <v-layout row justify-center  class="loginWrap">
        <v-btn color="orangeButton" @click="dialog = true">login</v-btn>
        <v-dialog v-model="dialog" max-width="412">
            <div class="heading leftSpace">
                <h2>login</h2>
                <h6>to your magic zap account</h6>
            </div>
            <v-card class="login">
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
 </template> 

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    }
  }
</script>

<style lang="scss">
    @import './Login.scss';
</style>



