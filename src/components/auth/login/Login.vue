 <template class="login">
    <v-layout row justify-center>
        <v-btn
        color="loginBtn"
        dark
        @click="dialog = true"
        >
        login
        </v-btn>
        
        <v-dialog v-model="dialog" max-width="364">
            <div>    </div>
        <v-card>
            <img src="../../../assets/images/smalllogo.svg" aspect-ratio="2.75" class="smalllogo">
            <v-form>
                <v-container>
                <v-layout row wrap>

                    <v-flex xs12>
                    <v-text-field label="Solo" placeholder="EMAIL" solo></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                    <v-text-field label="Solo" placeholder="PASSWORD" solo></v-text-field>
                    </v-flex>

                </v-layout>
                </v-container>
            </v-form>
           

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog = false"
            >
                Disagree
            </v-btn>

            <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog = false"
            >
                Agree
            </v-btn>
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

// colors
$orange: #ff6100;
$lightblue: #eef6ff;
$lightblueShadow: #a4b9d2;
$inputBlue: #7CA8DC;
$inputBackgroundblue: #F9FCFF;

// placeholder css
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: $inputBlue !important;
  opacity: 1;
  font-family: 'Avenir LT Std 85 Heavy';
  font-size: 12px;
  letter-spacing: 1px;
}
::-moz-placeholder { /* Firefox 19+ */
  color: pink;
}
:-ms-input-placeholder { /* IE 10+ */
  color: pink;
}
:-moz-placeholder { /* Firefox 18- */
  color: pink;
}
    .loginBtn{
    background-color: $orange !important;
    border-color: $orange;
    }
    .v-dialog{
        overflow-y: inherit;
        border-radius: 20px;
        box-shadow: 0 18px 54px $lightblueShadow;
        border: 0px;
        .v-card{
            padding: 38px;
            border-radius: 20px;
            position: relative;
            .smalllogo{
               position: absolute;
               left: -50px;
               top: 32px;
               width: 30%;
            }
            .v-form{
                margin-top: 60px;
            }
        }
    }
    .theme--light.v-text-field--solo .v-input__slot{
        background-color: $inputBackgroundblue;
    }
    .theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea{
         color: $inputBlue;
         font-size: 12px;
         font-weight: bold;
    }
    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) .v-input__slot{
        box-shadow: 0 7px 49px #d2d2d2;
        border-radius: 5px;
        margin: 0px;
    }
    .v-text-field.v-text-field--solo .v-input__control{
        height: 55px;
    }
    .v-form>.container>.layout>.flex{
        margin-bottom: 25px;
        padding: 0px;
    }
    .v-text-field.v-text-field--enclosed .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details{
        padding: 0 18px;
    }
    .v-overlay:before{
        content:'';
        top: 0;
        right: 0;
        position: absolute;
        background:url('../../../assets/images/smallcross.png') $lightblue;
        background-repeat: no-repeat;
        background-position:99% 2%;
        cursor: pointer;
        opacity: 0.9;
    }

</style>



