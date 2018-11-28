<template>
  <div>
        <div class="col-md-4" v-for="(tutorial) in orderedTutorials " :key="tutorial._id">
            <div class="cart">
                <h3>{{tutorial.title}}</h3>
                <p>{{tutorial.description}}</p>
                <a :href ="tutorial.source" data-lity>view</a>
            </div>
        </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
export default {
  data () {
    return {
      
    }
  },
  computed:{
      ...mapGetters([
            'tutorials'
        ]),
        orderedTutorials: function(){
            return _.orderBy(this.tutorials, 'order');
        }
  },
  created() {
            this.$store.dispatch('getTutorials',{});
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart{
    padding: 20px;
    box-shadow: 0px 0px 10px 5px #ccc;
    border-radius: 5px;
    margin-bottom: 40px;
}
.cart h3{
    text-transform: capitalize;
}
.cart a{
    background-color: #3170fd;
    border-radius: 2px;
    padding: 5px 10px;
    color: #fff;
    transition: 0.3s;
    border: 1px solid #3170fd;  
    text-transform: capitalize;
    margin-top: 20px;
    display: inline-block;
}
.cart a:hover{
    text-decoration: none;
    background-color: transparent;
    border: 1px solid #3170fd;
    transition: 0.3s;
    color: #3170fd;
}
</style>
