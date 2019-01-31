 <template>
    <v-layout row justify-center class="passwordWrap">
        <img src="../../assets/images/smallcross.png" class="cross-btn" v-if="isAlertPopUpOpen" @click="close()">
        <v-dialog v-model="isAlertPopUpOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card class="auth">
                <v-layout row wrap>
                    <v-flex xs5>
                        <div class="heading">
                            <h2>Alert</h2>
                        </div>
                    </v-flex>
                    <v-flex xs7>
                        <v-card-text class="changePassword addnewcard">
                            <v-form>
                                <v-container>
                                    <v-card-text>
                                        <h4>{{alertMessage}}</h4>
                                    </v-card-text>
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
    
    import {mapGetters} from 'vuex';
    export default {
        data () {
        return {
            
        }
        },
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters([
                'isAlertPopUpOpen',
                'alertMessage'
            ])
        },
        methods:{
            close(){
                this.$store.commit('changeIsAlertPopUpOpen', false);
            },
            
        },
        watch: {

        },
        mounted(){
            
        },
    }
</script>

<style lang="scss">
    @import '../../styles/common.scss';
    @import './AlertPopUp.scss';
</style>



