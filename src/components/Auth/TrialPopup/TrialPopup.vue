 <template>
    <v-layout row justify-center  class="trialPopupWrap">

        <v-btn color="orangeButton" @click="dialog = true">get started</v-btn>

        <v-dialog v-model="dialog" max-width="412" offset-md2>
            <div class="startText">
                <h2>
                    Start getting the engagement and conversions from your website you deserve!
                </h2>
            </div>
            
            <v-card class="trialPopup">

                <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">

                <v-form>
                    <v-container>
                        <v-layout row wrap>

                            <v-flex xs12>
                                <v-text-field label="Solo" v-model="name" placeholder="your name" class="name" solo></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field label="Solo" v-model="email" placeholder="your email" class="email" solo></v-text-field>
                            </v-flex>
                            
                            <v-btn block color="orangeButton" dark>get started</v-btn>

                        </v-layout>
                    </v-container>
                </v-form>

            </v-card>

        </v-dialog>

    </v-layout>

 </template> 

<script>
  export default {
    data () {
      return {
        dialog: false,
        name: '',
        email:''
      }
    }
  }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './TrialPopup.scss';
</style>



