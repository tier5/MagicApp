<template>
  <div class="tutorial">
    <v-card-text>
      <h2>Tutorial Video</h2>
      <p>Check out the list of all the Tutorial Videos</p>
      <img src="../../../assets/images/icon-video-big.png" alt="Video Icon" class="header-logo">
    </v-card-text>
    <v-card-text>
      <v-layout>
        <v-flex md12>
            <div class="addtutorial">
              <v-btn slot="activator" class="submit-btn" @click="addItem()">+ Add Tutorial</v-btn>
            </div>
            <div class="tutorial-list-table">
              <!-- Create/Edit Tutorial Starts -->
              <v-toolbar class="hide-nav">
                
                <v-dialog v-model="createAndUpdateModal" max-width="800px">
                  
                  <v-card>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-card-text>
                          <v-layout wrap>

                            <v-flex xs12 text-xs-center class="popup-head">
                              <h3>
                                <span v-if="!newTutorial._id">Add</span>
                                <span v-if="newTutorial._id">Edit</span> 
                                Tutorial
                              </h3>
                            </v-flex>
                            <v-flex xs12 text-xs-center>
                              <Error v-if="isError"/>
                              <Success v-if="isSuccess"/>
                            </v-flex>
                            <v-flex xs12>

                              <v-text-field 
                                v-model="newTutorial.title" 
                                label="Title"
                                @blur="$v.newTutorial.title.$touch">
                              </v-text-field>

                              <span class="validation-error-message"
                                v-if="!$v.newTutorial.title.required && $v.newTutorial.title.$error">
                                Title is required!
                              </span>

                            </v-flex>

                            <v-flex xs12>

                              <v-text-field 
                                v-model="newTutorial.description"
                                label="Description"
                                @blur="$v.newTutorial.description.$touch">
                              </v-text-field>

                              <span class="validation-error-message"
                                v-if="!$v.newTutorial.description.required && $v.newTutorial.description.$error">
                                Description is required!
                              </span>

                            </v-flex>

                            <v-flex xs12>

                              <v-text-field 
                                v-model="newTutorial.source"
                                label="Source"
                                @blur="$v.newTutorial.source.$touch">
                              </v-text-field>

                              <span class="validation-error-message"
                                v-if="!$v.newTutorial.source.required && $v.newTutorial.source.$error">
                                Source is required!
                              </span>

                            </v-flex>

                            <v-flex xs12>

                              <v-text-field 
                                v-model="newTutorial.order"
                                label="Order"
                                @blur="$v.newTutorial.order.$touch">
                              </v-text-field>
                              <span class="validation-error-message"
                                v-if="!$v.newTutorial.order.required && $v.newTutorial.order.$error">
                                Order is required!
                              </span>

                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click="save" v-if="!newTutorial._id" :disabled="$v.newTutorial.$invalid">Add</v-btn>
                      <v-btn color="blue darken-1" flat @click="update()" v-if="newTutorial._id" :disabled="$v.newTutorial.$invalid">Edit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <!-- Create/Edit Tutorial Ends -->

              <!-- View Tutorial Starts -->
              <v-data-table
                :headers="headers"
                :items="tutorials"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item._id }}</td>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.description }}</td>
                  <td>{{ props.item.source }}</td>
                  <td>{{ props.item.order }}</td>
                  <td>
                    <v-icon
                      small
                      class="mr-2"
                      @click.prevent="editItem(props.item)"
                    >
                      edit
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteItem(props.item._id)"
                    >
                      delete
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
              <!-- View Tutorials Ends -->
            </div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { required } from 'vuelidate/lib/validators';
  import Success from '../../../components/Success.vue';
  import Error from '../../../components/Error.vue';

  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: '#', value: 'id', sortable : false},
        { text: 'Title', value: 'title', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Source', value: 'source', sortable: false },
        { text: 'Order', value: 'order' },
        { text: 'Actions', value: 'actions', sortable: false}
      ],
      newTutorial:{
        title : '',
        description : '',
        source:'',
        order: null
      }
    }),
    methods: {

      deleteItem (id) {
        
        confirm('Are you sure you want to delete this item?') && this.$store.dispatch('deleteTutorial',id);
      },

      close () {
        this.newTutorial = {
          title: '',
          description: '',
          source:'',
          order:null
        };
        this.$v.newTutorial.$reset();
        this.$store.commit('changeCreateAndUpdateModal', false);
      },

      editItem (item) {
        this.newTutorial = item;
        this.addItem();
      },

      addItem () {
        this.$store.commit('changeCreateAndUpdateModal', true);
      },

      save () {
        this.$store.dispatch('createTutorial',this.newTutorial);
      },

      update(){
        this.$store.dispatch('updateTutorial', this.newTutorial);
      }
    },

    watch: {
      createAndUpdateModal : function(val){
        val === false && this.close()
      }
    },

    computed:{
      ...mapGetters([
            'user',
            'tutorials',
            'isError',
            'isSuccess',
            'createAndUpdateModal'
      ])
    },

    created(){
      this.$store.dispatch('getTutorials',{});
    },

    validations:{
      newTutorial: {
        title: {required},
        description : {required},
        source: {required},
        order:{required}
      }
    },

    components:{
      Success,
      Error
    }
  }
</script>

<style lang="scss">
@import "../../../styles/common.scss";
@import "./ViewTrainingVideos.scss";
</style>