<template>
  <div class="tutorial">
    <v-card-text>
      <h2>Users</h2>
      <p>Check out the list of Users</p>
      <img src="../../../assets/images/icon-user.png" alt="User Icon">
    </v-card-text>
    <v-card-text>
      <v-layout>
        <v-flex md12>
            <div class="addtutorial">
              <v-btn slot="activator" class="submit-btn" @click="addItem()">+ Add User</v-btn>
            </div>
            <div class="tutorial-list-table">
              <v-toolbar class="hide-nav">
                <v-dialog v-model="openCreateUsersModel" max-width="800px">
                  <v-card>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-card-text>
                          <v-layout wrap>
                            <v-flex xs12 text-xs-center class="popup-head">
                              <h3>Add User</h3>
                            </v-flex>
                            <v-flex xs12 text-xs-center>
                              <Error v-if="isError"/>
                              <Success v-if="isSuccess"/>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field 
                                label="Name"
                                v-model="newUser.name"
                                @blur="$v.newUser.name.$touch"
                                >
                              </v-text-field>
                              <span class="validation-error-message"
                                v-if="!$v.newUser.name.required && $v.newUser.name.$error">
                                Required!
                              </span>
                            </v-flex>

                            <v-flex xs12>
                              <v-text-field 
                                label="Email"
                                type='email'
                                v-model="newUser.email" 
                                @blur="$v.newUser.email.$touch">
                              </v-text-field>
                              <span class="validation-error-message"
                                v-if="!$v.newUser.email.required && $v.newUser.email.$error">
                                Should be an email type!
                              </span>
                            </v-flex>

                            <v-flex xs12>
                              <v-text-field 
                                :type="'password'" 
                                label="Password"
                                v-model="newUser.password" 
                                @blur="$v.newUser.password.$touch">
                              </v-text-field>
                              <span class="validation-error-message"
                                v-if="!$v.newUser.password.required && $v.newUser.password.$error">
                                Required!
                              </span>
                              <span class="validation-error-message"
                                v-if="!$v.newUser.password.minLength && $v.newUser.password.$error">
                                Minimum length should be 6!
                              </span>
                            </v-flex>

                            <v-flex xs12>
                              <v-text-field 
                                :type="'password'"
                                label="Confirm Password"
                                v-model="newUser.confirmPassword" 
                                @blur="$v.newUser.confirmPassword.$touch">
                              </v-text-field>
                              <span class="validation-error-message"
                                v-if="!$v.newUser.confirmPassword.sameAsPassword && $v.newUser.confirmPassword.$error">
                                Password didn't match!
                              </span>

                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click="save" :disabled="$v.newUser.$invalid">Create User</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-data-table
                :headers="headers"
                :items="USERS"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item._id }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.email}}</td>
                  <td>
                    <label class="switch">
                      <input type="checkbox" 
                        checked 
                        v-if= "props.item.isActive === true" 
                        @change="updateUser(props.item)" v-model="props.item.isActive">
                      <input 
                        type="checkbox" 
                        v-if= "props.item.isActive === false" 
                        @change="updateUser(props.item)" v-model="props.item.isActive">
                      <span class="slider round"></span>
                    </label>
                  </td>
                </template>
              </v-data-table>
            </div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { required,sameAs, minLength, email} from 'vuelidate/lib/validators';
  import Success from '../../../components/Success.vue';
  import Error from '../../../components/Error.vue';
  export default {
    data: () => ({
      headers: [
        { text: '#', value: 'id', sortable: false},
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Status', value: 'status', sortable: false }
      ],
      newUser:{
        name: '',
        email:'',
        password:'',
        confirmPassword:''
      }
    }),
    methods: {

      close () {
        this.$store.commit('changeOpenCreateUsersModel', false);
        this.newUser = {
          name : '',
          email: '',
          password: '',
          confirmPassword: ''
        }
        this.$v.newUser.$reset();
      },

      addItem () {
        this.$store.commit('changeOpenCreateUsersModel', true);
      },

      save () {
        this.$store.dispatch('createNewUser',this.newUser);
      },
      updateUser(data){
        
        this.$store.dispatch('updateUsers',data);
      },
    },

    watch: {
      openCreateUsersModel : function(val){
        if(!val){
          this.close();
        }
      }
    },
    computed:{
      ...mapGetters([
            'user',
            'USERS',
            'isError',
            'isSuccess',
            'openCreateUsersModel'
      ]),
      
    },
    validations:{
      newUser:{
        email: {
            required,
            email
        },
        name : {
            required
        },
        password:{
          required,
          minLength: minLength(6)
        },
        confirmPassword:{
          sameAsPassword: sameAs('password')
        }
      }
    },
    created(){
      this.$store.dispatch('getUsers');
    },
    components:{
      Success,
      Error
    }
  };
</script>

<style lang="scss">
@import "../../../styles/common.scss";
@import "./Users.scss";
</style>