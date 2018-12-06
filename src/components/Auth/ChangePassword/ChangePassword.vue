 <template class="login">
    <v-layout row justify-center>
        <v-btn color="orangeButton" dark @click="dialog = true">change password</v-btn>
        <v-dialog v-model="dialog" max-width="412">
            <div class="heading">
                <h2>change password</h2>
                <h6>of your magic zap account</h6>
            </div>
            <v-card>
                <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                <v-form>
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field label="Solo" v-model="password" :type="show1 ? 'text' : 'password'" placeholder="NEW PASSWORD" solo></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Solo" v-model="password" :type="show1 ? 'text' : 'password'" placeholder="CONFIRM PASSWORD" solo></v-text-field>
                            </v-flex>
                            <v-btn block color="orangeButton" dark><img src="../../../assets/images/changepass.png" alt="changepassword">change password</v-btn>
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
    @import 'ChangePassword.scss';
</style>



