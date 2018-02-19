<template>
  <div class="container-fluid">
   <div class="row">
       <div class="col-md-12">
           <h3>Lists of cards</h3>
       </div>
   </div>
   <div class="row">
     <div class="card col-md-3" v-for="userCard in userCards" :key="userCard.id">
      <div class="container">
        <span> Ending with : <p>xxxxxxxxxx{{userCard.last4}}</p></span>
        <span>Exp Date : <p>{{userCard.exp_month}}/{{userCard.exp_year}}</p></span>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
    }
  },
  computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'userCards'
        ]),
    },
  created(){
    this.$store.dispatch('getUserCards');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
}

</style>
