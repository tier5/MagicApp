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
                <v-dialog v-model="dialog" max-width="800px">
                  <v-card>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-card-text>
                          <v-layout wrap>
                            <v-flex xs12 text-xs-center class="popup-head">
                              <h3>Add User</h3>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field label="Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field label="Email"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field :type="'password'" label="Password"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field :type="'password'" label="Confirm Password"></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click="save">Create User</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-data-table
                :headers="headers"
                :items="user_data"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>
                    <label class="switch">
                      <input type="checkbox" checked v-if= "props.item.status === 1">
                      <input type="checkbox" v-if= "props.item.status === 0">
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
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: '#', value: 'id'},
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Status', value: 'status', sortable: false }
      ],
      user_data : [
        {
          id: '1',
          name: 'bluebox',
          email: 'bluebox51@gmx.com',
          status: 1
        },
        {
          id: '2',
          name: 'charlotte',
          email: 'charlotte@gmail.com',
          status: 0
        },
        {
          id: '3',
          name: 'cheripkr',
          email: 'cheripkr2@gmail.com',
          status: 0
        },
        {
          id: '4',
          name: 'tony',
          email: 'bluebox51@besthusbandintheworld.com',
          status: 1
        }
      ],
      defaultItem: {
        id: '',
        name: 0,
        email: 0,
        status: 0
      }
    }),
    methods: {

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      addItem () {
        this.dialog = true
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.tutorial_data[this.editedIndex], this.editedItem)
        } else {
          this.tutorial_data.push(this.editedItem)
        }
        this.close()
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed:{
      ...mapGetters([
            'user',
            'USERS'
      ]),
      
    },
    created(){
      //this.$store.dispatch('getTutorials',{});
    }
  };
</script>

<style lang="scss">
@import "../../../styles/common.scss";
@import "./Users.scss";
</style>