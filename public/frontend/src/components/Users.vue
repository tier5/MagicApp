<template>
  <div>
     <div class="row">
         <div class="col-md-12">
            <h3>List of Users</h3>
         </div>
     </div>
     <div class="row">
         <div class="col-md-12">
             <div class="table-responsive">
                 <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>De/Activate</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in USERS" :key="item._id">
                            <td>{{index+1}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.email}}</td>
                            <td>
                                <toggle-button v-model='item.isActive' @change="updateUser(item)"/>
                            </td>
                        </tr>
                    </tbody>
                 </table>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {paginate} from 'vue-paginate';
import ToggleButton from 'vue-js-toggle-button'
export default {
    data () {
        return {
            test:[],
            paginate: ['USERS'],
            
        }
    },

    methods:{
        updateUser(data){
            this.$store.dispatch('updateUsers',data);
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'USERS'
        ])
    },
    created(){
        this.$store.dispatch('getUsers');
    },
    component:{
        'paginate':paginate,
        'ToggleButton':ToggleButton
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
