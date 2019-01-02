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
              <v-toolbar class="hide-nav">
                <v-dialog v-model="dialog" max-width="800px">
                  <v-card>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-card-text>
                          <v-layout wrap>
                            <v-flex xs12 text-xs-center class="popup-head">
                              <h3>Add Tutorial</h3>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field v-model="editedItem.source" label="Source"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field v-model="editedItem.order" label="Order"></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click="save">Add</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-data-table
                :headers="headers"
                :items="tutorial_data"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.description }}</td>
                  <td>{{ props.item.source }}</td>
                  <td>{{ props.item.order }}</td>
                  <td>
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(props.item)"
                    >
                      edit
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteItem(props.item)"
                    >
                      delete
                    </v-icon>
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
        { text: 'Title', value: 'title', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Source', value: 'source', sortable: false },
        { text: 'Order', value: 'order' },
        { text: 'Actions', value: 'actions', sortable: false}
      ],
      tutorial_data : [
        {
          id: '1',
          title: 'Magic Zap Intro Video',
          description: 'An intro into Magic Zap. A brief overview of Magic Zap',
          source: 'https://www.youtube.com/watch?v=BTg_gYwHWTI&list=PLgwAAY-aCn6cfDgjvho9gHCwf0atLW0MZ',
          order: 0
        },
        {
          id: '2',
          title: 'Creating Your First Zap',
          description: 'This video will teach you how you can create you first zap',
          source: 'https://youtu.be/JV7bEiu0sVc',
          order: 1
        },
        {
          id: '3',
          title: 'Magic Zap - Installing the magic zap script',
          description: 'How to install the magic zap script on your website',
          source: 'https://www.youtube.com/watch?v=G3pj9W8pkZs&list=PLgwAAY-aCn6cfDgjvho9gHCwf0atLW0MZ&index=3',
          order: 2
        },
        {
          id: '4',
          title: 'What are URL Parameters',
          description: 'You will need to understand a little about URL parameters to understand how Magic Zap works. This video will teach you about that.',
          source: 'https://youtu.be/y77UO-Ei7x0',
          order: 3
        }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        title: 0,
        description: 0,
        source: 0,
        order: 0
      },
      defaultItem: {
        id: '',
        title: 0,
        description: 0,
        source: 0,
        order: 0
      }
    }),
    methods: {

      deleteItem (item) {
        const index = this.tutorial_data.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.tutorial_data.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      editItem (item) {
        this.editedIndex = this.tutorial_data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
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
            'tutorials'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
      
    },
    created(){
      this.$store.dispatch('getTutorials',{});
    }
  }
</script>

<style lang="scss">
@import "../../../styles/common.scss";
@import "./ViewTrainingVideos.scss";
</style>