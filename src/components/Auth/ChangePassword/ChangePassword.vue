 <template>

    <v-layout row justify-center class="passwordWrap">

        <v-btn color="orangeButton" @click="dialog = true">change password</v-btn>

        <v-dialog v-model="dialog" max-width="412">

            <div class="heading">
                <h2>change password</h2>
                <h6>of your magic zap account</h6>
            </div>

            <!-- Change Password Section Start Here -->
            <v-card class="changePassword">

                <img 
                    src="../../../assets/images/smalllogo.svg" 
                    aspect-ratio="2.75" 
                    class="smalllogo" 
                    alt="smalllogo">

                <v-form>

                    <v-container>

                        <v-layout row wrap>

                            <v-flex xs12>
                                <v-text-field 
                                        label="Solo" 
                                        v-model="password" 
                                        :type="show1 ? 'text' : 'password'" 
                                        placeholder="NEW PASSWORD" solo>
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field 
                                        label="Solo" 
                                        v-model="confirmPassword" 
                                        :type="show1 ? 'text' : 'password'" 
                                        placeholder="CONFIRM PASSWORD" solo>
                                </v-text-field>
                            </v-flex>

                            <v-btn block class="orangeButton">
                                <img src="../../../assets/images/changepass.png" alt="changepassword">
                                    change password
                            </v-btn>

                        </v-layout>

                    </v-container>

                </v-form>

                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>

            </v-card>
            <!-- Change Password Section Ends Here -->
        </v-dialog>

    </v-layout>

 </template> 

<script>
  export default {
    data () {
      return {
        dialog: false,
        password:'',
        show1:false,
        confirmPassword:''
      }
    }
  }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './ChangePassword.scss';
</style>



