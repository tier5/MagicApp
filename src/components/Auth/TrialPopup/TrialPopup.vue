 <template>
    <v-layout row justify-center  class="trialPopupWrap">
        <img src="../../../assets/images/smallcross.png" class="cross-btn" v-if="!isHidden" @click="dialog = false" v-on:click="isHidden = true">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card class="auth">
                <v-layout row wrap>
                    <v-flex xs5>
                        <div class="startText">
                            <h2>
                                Start getting the engagement and conversions from your website you deserve!
                            </h2>
                        </div>
                    </v-flex>
                    <v-flex xs7>
                        <v-card-text class="trialPopup">
                            <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo" alt="smalllogo">
                            <v-form>
                                <v-container>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Solo" v-model="name" placeholder="YOUR NAME" class="name" solo></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field label="Solo" v-model="email" placeholder="YOUR EMAIL" class="email" solo></v-text-field>
                                        </v-flex>
                                        <v-btn block color="orangeButton" dark>get started</v-btn>
                                    </v-layout>
                                </v-container>
                            </v-form>
                        </v-card-text>
                    </v-flex>
                </v-layout>
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
        email:'',
        isHidden: true
      }
    }
  }
</script>

<style lang="scss">
    @import '../../../styles/common.scss';
    @import './TrialPopup.scss';
</style>



