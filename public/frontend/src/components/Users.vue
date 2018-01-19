<template>
  <div>
     <div class="row">
         <div class="col-md-12">
            <h3>List of Users</h3>
            <!-- <paginate 
                name="USERS" 
                :list="USERS" 
                class="paginate-list"
                :per="10">
                <ul v-for="item in paginated('USERS')" :key="item._id">
                    <li> {{item._id}}</li>
                    <li> {{item.name}}</li>
                </ul>
            </paginate>
            <div class="col-md-12 pull-right">
                <paginate-links for="USERS" :limit="10" :show-step-links="true"></paginate-links>
            </div> -->
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
                                {{item.isActive}}
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

/* @charset "UTF-8";
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.paginate-list {
  width: 159px;
  margin: 0 auto;
  text-align: left;
}
.paginate-list li {
  display: inline-block;
}
.paginate-list li:before {
  display: block;
  content: '⚬ ';
  font-weight: bold;
  color: slategray;
}

.paginate-links.items {
  user-select: none;
}
.paginate-links.items a {
  cursor: pointer;
}
.paginate-links.items li.active a {
  font-weight: bold;
  display: inline-block;
}
.paginate-links.items li.next:before {
  display: inline-block;
  content: ' | ';
  margin-right: 13px;
  color: #ddd;
}
.paginate-links.items li.disabled a {
  color: #ccc;
  cursor: no-drop;
}

a {
  color: #42b983;
  cursor: pointer;
} */

</style>
