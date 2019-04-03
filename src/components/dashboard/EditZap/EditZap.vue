<template>
  <div class="createNewZap">
    <v-card-text>
      <img src="../../../assets/images/logo.png" alt="Header Logo" class="header-logo">
      <h2>Edit My ZAP</h2>
      <p>Add multiple Params and Attributes as you need</p>
    </v-card-text>
    <v-card class="create-zap-form">

      <v-form>
        <!-- Name Starts -->
        <v-layout row wrap>
          <span class="progress-bar" v-bind:class="{'filled' : newZap.name.length}">
            <span class="dot"></span> Name
          </span>
          <v-flex xs12 v-bind:class="{ 'form-error-box': $v.newZap.name.$error }">
            <v-card-text>
              <v-text-field 
                  placeholder="Zap Name"
                  v-model="newZap.name"
                  @blur="$v.newZap.name.$touch">
              </v-text-field>
              <span class="validation-error-message"
                  v-if="!$v.newZap.name.required && $v.newZap.name.$error">
                        Zap Name is Required
              </span>
            </v-card-text>
          </v-flex>
        </v-layout>
        <!-- Name Ends -->

        <!-- Params Section Starts -->
        <v-layout row wrap>
          <span class="progress-bar" v-bind:class="{'filled' : newZap.params.length}">
            <span class="dot"></span> Params
          </span>
          <v-flex md4 xs12 v-bind:class="{ 'form-error-box': $v.urlParams.field_name.$error }">
            <v-card-text>
              <v-text-field 
                  v-model="urlParams.field_name" 
                  placeholder="Param Name"
                  @blur="$v.urlParams.field_name.$touch"
                  >
              </v-text-field>
              <span>ex.email</span>
              <span class="validation-error-message"
                  v-if="!$v.urlParams.field_name.required && $v.urlParams.field_name.$error">
                        Param Name is Required!
              </span>
              <span class="validation-error-message"
                  v-if="!$v.urlParams.field_name.noSpace && $v.urlParams.field_name.$error">
                        No Space is allowed!
              </span>
              <span class="validation-error-message"
                  v-if="!$v.urlParams.field_name.noUpperCase && $v.urlParams.field_name.$error">
                        Uppercase are not allowed!
              </span>
              <span class="validation-error-message"
                  v-if="!$v.urlParams.field_name.noIdField && $v.urlParams.field_name.$error">
                        id param are not allowed!
              </span>
            </v-card-text>
          </v-flex>
          <v-flex md3 xs12>
            <v-card-text>
              <v-select
                v-model="urlParams.validationType"
                :items="validationTypes"
                placeholder="Select"
                @blur="$v.urlParams.validationType.$touch">
              </v-select>
            </v-card-text>
          </v-flex>
          <v-flex md4 xs12 v-if="!!urlParams.validationType && (urlParams.validationType === '=' || urlParams.validationType === '!=') ">
            <v-card-text >
              <v-text-field 
                v-model="urlParams.field_value" 
                placeholder="Value"
                >
              </v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex md1 xs12 v-if="!$v.urlParams.$invalid">
            <v-card-text class="add-zap-field" @click="addParams()">
              <img src="../../../assets/images/Add_record_icon.png" alt="icon" class="icon-add">
            </v-card-text>
          </v-flex>
          <v-flex md12 class="tags-section">
            <v-card-text>
              <ul>
                <li v-for="(obj, index) in newZap.params" :key="index">
                  <span>{{obj.field_name}} : {{obj.validationType}} : {{obj.field_value}}</span>
                  <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross" @click="removeParams(index)">
                </li>
              </ul>
            </v-card-text>
          </v-flex>
        </v-layout>
        <!-- Params Section Ends -->

        <!-- Attributes Section -->
        <v-layout row wrap>
          <span class="progress-bar" v-bind:class="{'filled' : newZap.element_attributes.length}">
            <span class="dot"></span> Attributes
          </span>
          <v-flex md6 xs12 v-bind:class="{ 'form-error-box': $v.htmlIdentifier.attribute_name.$error }">
            <v-card-text>
              <v-text-field 
                v-model="htmlIdentifier.attribute_name" 
                placeholder="Param Name"
                @blur="$v.htmlIdentifier.attribute_name.$touch">
              </v-text-field>
              <span>ex.email</span>
              <span class="validation-error-message"
                  v-if="!$v.htmlIdentifier.attribute_name.required && $v.htmlIdentifier.attribute_name.$error">
                  Param Name is Required!
              </span>
              <span class="validation-error-message"
                  v-if="!$v.htmlIdentifier.attribute_name.noIdField && $v.htmlIdentifier.attribute_name.$error">
                  Id Name is not allowed!
              </span>
            </v-card-text>
          </v-flex>
          <v-flex md5 xs12 v-bind:class="{ 'form-error-box': $v.htmlIdentifier.attribute_type.$error }">
            <v-card-text>
              <v-select
                v-model="htmlIdentifier.attribute_type"
                :items="items"
                placeholder="Select Type"
                @blur="$v.htmlIdentifier.attribute_name.$touch">
              </v-select>
              <span>ex.name</span>
              <span class="validation-error-message"
                  v-if="!$v.htmlIdentifier.attribute_type.required && $v.htmlIdentifier.attribute_type.$error">
                  Param Name is Required!
              </span>
            </v-card-text>
          </v-flex>
          <v-flex md1 xs12>
            <v-card-text class="add-zap-field" @click="addAttributes()" v-if="!$v.htmlIdentifier.$invalid">
              <img src="../../../assets/images/Add_record_icon.png" alt="icon" class="icon-add">
            </v-card-text>
          </v-flex>
          <v-flex md12 class="tags-section">
            <v-card-text>
              <ul>
                <li v-for="(obj, index) in newZap.element_attributes" :key="index">
                  <span>{{obj.attribute_name}} - {{obj.attribute_type}}</span>
                  <img src="../../../assets/images/cross_btn.png" alt="icon" class="icon-cross" @click="removeAttributes(index)">
                </li>
              </ul>
            </v-card-text>
          </v-flex>
        </v-layout>
        <!-- Attributes Section End -->

        <!-- Timeout Section -->
        <v-layout row wrap>
          <span class="progress-bar" v-bind:class="{'filled' : timeoutProgess}">
            <span class="dot filled" ></span> Timeout
          </span>
          <v-flex md4 xs12 v-bind:class="{'form-error-box': $v.newZap.timeout.days.$error }">
            <v-card-text class="timeout-field">
              <v-text-field 
                v-model="newZap.timeout.days" 
                placeholder="0" 
                @blur="$v.newZap.timeout.days.$touch">
              </v-text-field>
              <span>Days</span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.days.minValue && $v.newZap.timeout.days.$error">
                  Minimum value is 0
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.days.maxValue && $v.newZap.timeout.days.$error">
                  Maximum value is 365
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.days.nonFLoat && $v.newZap.timeout.days.$error">
                  Must be a whole number
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.days.numeric && $v.newZap.timeout.days.$error">
                  Must be a number
              </span>
            </v-card-text>
          </v-flex>
          <v-flex md4 xs12 v-bind:class="{'form-error-box': $v.newZap.timeout.hours.$error }">
            <v-card-text class="timeout-field">
              <v-text-field 
                v-model="newZap.timeout.hours"
                placeholder="0"
                @blur="$v.newZap.timeout.hours.$touch">
              </v-text-field>
              <span>Hour</span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.hours.minValue && $v.newZap.timeout.hours.$error">
                  Minimum value is 0
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.hours.maxValue && $v.newZap.timeout.hours.$error">
                  Maximum value is 23
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.hours.nonFLoat && $v.newZap.timeout.hours.$error">
                  Must be a whole number
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.hours.numeric && $v.newZap.timeout.hours.$error">
                  Must be a number
              </span>
            </v-card-text>
          </v-flex>
          <v-flex md4 xs12 v-bind:class="{'form-error-box': $v.newZap.timeout.minutes.$error }">
            <v-card-text class="timeout-field">
              <v-text-field 
                v-model="newZap.timeout.minutes"
                placeholder="0"
              @blur="$v.newZap.timeout.minutes.$touch">
              </v-text-field>
              <span>Min</span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.minutes.minValue && $v.newZap.timeout.minutes.$error">
                  Minimum value is 0
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.minutes.maxValue && $v.newZap.timeout.minutes.$error">
                  Maximum value is 59
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.minutes.nonFLoat && $v.newZap.timeout.minutes.$error">
                  Must be a whole number
              </span>
              <span class="validation-error-message"
                  v-if="!$v.newZap.timeout.minutes.numeric && $v.newZap.timeout.minutes.$error">
                  Must be a number
              </span>
            </v-card-text>
          </v-flex>
        </v-layout>
        <!-- Timeout Section Ends -->
        <v-layout row wrap>
          <v-flex md12 text-xs-center>
            
            <v-btn  
                class="submit-btn" 
                @click="updateZap()" 
                :disabled="$v.newZap.$invalid && $v.urlParams.$invalid && $v.htmlIdentifier.$invalid">
              <img src="../../../assets/images/icon-zap-white.png">
              <span>Edit ZAP</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>

    </v-card>



  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { required, minValue, maxValue, numeric } from 'vuelidate/lib/validators'
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
    ...mapGetters([
        'user',
        'zap'
    ]),
    timeoutProgess : function(){
      if ( (this.newZap.timeout.days || this.newZap.timeout.minutes || this.newZap.timeout.hours) && !this.$v.newZap.timeout.$invalid ){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    updateZap(){
        // changing the value of Exists to null
        this.newZap.params = this.newZap.params.map(element => {
          if (element.validationType === 'Exists'){
              element.field_value = ''
          }
          return element;
        });
        this.$store.dispatch('updateZap',this.newZap);
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
            },
            numeric
          },
          hours:{
            minValue : minValue(0),
            maxValue: maxValue(23),
            nonFLoat:function(n){
              return Number(n) % 1 === 0 ? true: false 
            },
            numeric
          },
          minutes:{
            minValue : minValue(0),
            maxValue: maxValue(59),
            nonFLoat:function(n){
              return Number(n) % 1 === 0 ? true: false 
            },
            numeric
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
    created:function(){
      
        this.newZap = this.zap;
      
    },
    mounted(){
      this.$store.commit('checkCookiePolicy');
    },
    destroyed: function(){
      this.$store.commit('viewZap',{});
    }

};
</script>
<style lang="scss">
@import "../../../styles/common.scss";
@import "./EditZap.scss";
</style>