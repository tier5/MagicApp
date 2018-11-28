<template>
  <div>
    <div class="row">
        <div class="col-md-12">
            <button class="btn btn-primary" @click.prevent="openModal()">New Tutorial</button>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="row">
        <div class="col-md-12">
            <div class="table-responsive" v-if="tutorials.length">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Source</th>
                            <th>Order</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(tutorial,index) in tutorials" :key="tutorial._id">
                            <td>{{index + 1}}</td>
                            <td>{{tutorial.title}}</td>
                            <td>{{tutorial.description}}</td>
                            <td>{{tutorial.source}}</td>
                            <td>{{tutorial.order}}</td>
                            <td>
                                <a href="#" @click.prevent="deleteTutorial(tutorial._id)">
                                    <i class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                                </a>
                                <a href="#" @click.prevent="editTutorial(tutorial)" style="margin-left:10px;">
                                    <i class="fa fa-edit fa-2x" aria-hidden="true"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <modalForm v-if="createAndUpdateModal"></modalForm>
  </div>
</template>

<script>
    import modalForm from './createUpdateTutorial.vue';
    import { mapGetters } from 'vuex';
    import swal from 'sweetalert2';
    export default {
        data () {
            return {
            msg: 'Welcome to Your Vue.js App'
            }
        },
        computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'tutorials',
            'createAndUpdateModal'
        ]),

        },
        created(){
            this.$store.dispatch('getTutorials',{});
        },
        methods:{
            deleteTutorial(id) {
                swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover the tutorial',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, keep it'
                }).then((result) => {
                    if (result.value) {
                        this.$store.dispatch('deleteTutorial',id);
                    } else if (result.dismiss === 'cancel') {
                        swal(
                        'Cancelled',
                        'Your tutorial is safe :)',
                        'error'
                        )
                    }
                })
                
            },
            openModal(){
                this.$store.commit('changeCreateAndUpdateModal', true)
            },
            editTutorial(tutorial){
                this.$store.commit('changeEditTutorial', tutorial);
                this.$store.commit('changeCreateAndUpdateModal', true);
            }
        },
        components: {
            modalForm
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
