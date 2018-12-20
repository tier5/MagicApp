<template>
  <div class="HowItWorks">
    <v-card-text class="top-bar-text">
      <h2>Magic Zap Training Videos</h2>
      <p>Well here we are in action. Watch our training videos for your hand on experience. </p>
    </v-card-text>
    <v-card>
      <v-layout row wrap class="training-video">
        <v-flex md6>
          <img src="../../../assets/images/no-thumbnail.jpg" alt="image" class="image">
        </v-flex>
        <v-flex md6>
          <v-card-text class="right-text-block">
            <h3>
                Magic Zap - Follow Up Loops - Why I created Magic Zap
            </h3>
            <div class="header-bottom">
              <span>by <span>Magic Zap</span></span>
              <span><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span>
            </div>
            <p>Here is why I actually created Magic Zap and the real magic of the software.</p>
          </v-card-text>
        </v-flex>
      </v-layout>
      <div class="bottom-section">
        <v-layout row wrap>
          <v-flex md3 sm6>
            <img src="../../../assets/images/no-thumbnail.jpg" alt="image" class="image">
            <v-card-text class="right-text-block">
              <h3>
                  Magic Zap - Follow Up Loops - Why I created Magic Zap 
              </h3>
              <div class="header-bottom">
                <span class="left">by <span>Magic Zap</span></span>
                <span class="right"><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span>
              </div>
              <p>Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.</p>
            </v-card-text>
          </v-flex>
          <v-flex md3 sm6>
            <img src="../../../assets/images/no-thumbnail.jpg" alt="image" class="image">
            <v-card-text class="right-text-block">
              <h3>
                  Magic Zap - Follow Up Loops - Why I created Magic Zap
              </h3>
              <div class="header-bottom">
                <span class="left">by <span>Magic Zap</span></span>
                <span class="right"><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span>
              </div>
              <p>Here is why I actually created Magic Zap and the real magic of the software.</p>
            </v-card-text>
          </v-flex>
          <v-flex md3 sm6>
            <img src="../../../assets/images/no-thumbnail.jpg" alt="image" class="image">
            <v-card-text class="right-text-block">
              <h3>
                  Magic Zap - Follow Up Loops - Why I created Magic Zap
              </h3>
              <div class="header-bottom">
                <span class="left">by <span>Magic Zap</span></span>
                <span class="right"><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span>
              </div>
              <p>Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.Here is why I actually created Magic Zap and the real magic of the software.</p>
            </v-card-text>
          </v-flex>
          <v-flex md3 sm6>
            <img src="../../../assets/images/no-thumbnail.jpg" alt="image" class="image">
            <v-card-text class="right-text-block">
              <h3>
                  Magic Zap - Follow Up Loops - Why I created Magic Zap
              </h3>
              <div class="header-bottom">
                <span class="left">by <span>Magic Zap</span></span>
                <span class="right"><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span>
              </div>
              <p>Here is why I actually created Magic Zap and the real magic of the software.</p>
            </v-card-text>
          </v-flex>
          <v-flex md3 sm6>
            <img src="../../../assets/images/no-thumbnail.jpg" alt="image" class="image">
            <v-card-text class="right-text-block">
              <h3>
                  Magic Zap - Follow Up Loops - Why I created Magic Zap
              </h3>
              <div class="header-bottom">
                <span class="left">by <span>Magic Zap</span></span>
                <span class="right"><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span>
              </div>
              <p>Here is why I actually created Magic Zap and the real magic of the software.</p>
            </v-card-text>
          </v-flex>
          <v-flex md3 sm6>
            <img src="../../../assets/images/no-thumbnail.jpg" alt="image" class="image">
            <v-card-text class="right-text-block">
              <h3>
                  Magic Zap - Follow Up Loops - Why I created Magic Zap
              </h3>
              <div class="header-bottom">
                <span class="left">by <span>Magic Zap</span></span>
                <span class="right"><img src="../../../assets/images/view.png" alt="icon-view" /> 654789</span>
              </div>
              <p>Here is why I actually created Magic Zap and the real magic of the software.</p>
            </v-card-text>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
    <span class="create-new-zap-mobile hidden-sm-and-up">
      <img src="../../../assets/images/icon-createzap.png" alt="icon-createzap">
    </span>
  </div>
</template>
<script>
import { required, minValue, maxValue  } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      
      items: ["id", "name"],
      validationTypes:[
        "Exists",
        "=",
        "!="
      ],
      newZap:{
          id:'',
          name:'',
          params:[],
          element_attributes:[],
          timeout: {
            days:null,
            hours:null,
            minutes:null
          },
      },
      urlParams:{
        field_name : '',
        validationType:'',
        field_value:''
      },
      htmlIdentifier:{
        attribute_name:'',
        attribute_type:''
      }
    };
  },
  computed:{
    isValid : function() {
      return true
    }
  },
  methods: {
    createNewZap(){
        this.$store.dispatch('createNewZap',this.newZap);
    },
    addParams(){
      
      this.newZap.params.push(this.urlParams);
      this.urlParams = {
        field_name : '',
        validationType:'',
        field_value:''
      }
      this.$v.urlParams.$reset();
    },
    addAttributes(){

      this.newZap.element_attributes.push(this.htmlIdentifier);
      this.htmlIdentifier = {
        attribute_name:'',
        attribute_type:''
      }
      this.$v.htmlIdentifier.$reset();

    },
    removeParams(index){
      this.newZap.params.splice(index,1);
    },
    removeAttributes(index){
      this.newZap.element_attributes.splice(index,1);
    }
  },
  validations:{
      newZap:{

        name:{
          required
        },
        timeout:{
          days:{
            minValue : minValue(0),
            maxValue: maxValue(365),
            nonFLoat:function(n){
              return Number(n) % 1 === 0 ? true: false 
            }
          },
          hours:{
            minValue : minValue(0),
            maxValue: maxValue(23),
            nonFLoat:function(n){
              return Number(n) % 1 === 0 ? true: false 
            }
          },
          minutes:{
            minValue : minValue(0),
            maxValue: maxValue(59),
            nonFLoat:function(n){
              return Number(n) % 1 === 0 ? true: false 
            }
          }
        }
      },
      urlParams:{
          field_name: {
            required,
            noSpace:function(field_name){
              var indexOfWhiteSpace = field_name.indexOf(' ');
              if (indexOfWhiteSpace === -1){
                return true
                } else {
                return false
              }
            },
            noUpperCase:function(value){
              var toLowerCase = value.toLowerCase();
              if(toLowerCase === value){
                return true
              } else {
                return false
              }
            },
            noIdField:function(value){
              if (value !== 'id'){
                return true
              } else {
                return false
              }
              }
          },
          validationType: {
            required
          },
          field_value:{
            
          }
        },
        htmlIdentifier:{
          attribute_name: {
              required,
              noIdField:function(value){
                if (value !== 'id'){
                  return true
                } else {
                  return false
                }
              }
          },
          attribute_type: {
            required,
          }
        },
    },

};
</script>
<style lang="scss">
@import "../../../styles/common.scss";
@import "./HowItWorks.scss";
</style>