<template>
  <div>
    <div class="container">
         <div class="row">
            <div class="col-md-4 col-sm-4" v-for="(plan,index) in plans" :key="index" v-if="plan.amount">
               <div class="cd-pricing-header">
                  <h2>{{plan.name}}</h2>
                  <div class="cd-price">
                     <span>${{plan.amount/100}}</span>
                     <span>/month</span>
                  </div>
               </div>
               <div class="body-wrap">
               <div class="cd-pricing-features">
                 <div class="col-md-12">
                    <div class="col-md-10">
                      <card class='stripe-card form-control'
                        :class='{ complete }'
                        stripe='pk_test_aFYmaDW3rf5AHh7MkX2BSshB'
                        :options='stripeOptions'
                        @change='complete = $event.complete'
                      />
                    </div>  
                  </div>
               </div>
               <footer class="cd-pricing-footer">
                  <button class="btn btn-primary" :disabled="!complete" @click="updateSubscription(plan)">Subscribe</button>
               </footer>
               </div>
            </div>
         </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Card, createToken } from 'vue-stripe-elements-plus';
export default {
  data () {
    return {
      plan : {},
      complete: false,
      stripeOptions: {
      // see https://stripe.com/docs/stripe.js#element-options for details
          
      }
    }
  },
  computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'plans',
        ]),
  },
  methods:{
    updateSubscription(plan){
      createToken()
        .then(data => {
            var payload = {}

            payload.cardToken = data.token.id;
            payload.card = data.token.card;
            payload.plan = plan 
            this.$store.dispatch('updateSubscription',payload)
        }).catch((err)=>{
            console.log(err);
        })
    }
  },
  created(){
      this.$store.dispatch('getPlans');
  },
  components:{
    Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');


body{margin:0; padding:0; font-family: "Open Sans", sans-serif;}
.cd-pricing-header {
    padding: 25px 1em;
    background-color: #337ab7;
    border-radius: .25em .25em 0 0;
    box-shadow: inset 0 1px 0 #c1cfa2;
    color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-family: "Open Sans", sans-serif;
    margin-top: 20px;
}


 .cd-pricing-header h2 {
	font-size: 2.6rem;
	margin: 0;
	padding: 5px;
	font-weight: 700;
}
.cd-pricing-header .cd-price {
	display: inline-block;
	font-weight: bold;
	font-size: 16px;
}

.body-wrap{ border: 1px solid #ccc;}

.cd-pricing-features {
	padding: 2.8em 1em 2.5em;
 
}
.cd-pricing-features li {
    line-height: 1.5;
    margin-bottom: .4em;
    list-style: none;
    font-size: 20px;
    
}
.cd-pricing-features em {
    position: relative;
    padding-left: 28px;
}
.cd-pricing-features em::before {
	position: absolute;
	content: '';
	left: 0;
	top: 50%;
	bottom: auto;
	-webkit-transform: translateY(-50%);
	-moz-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	-o-transform: translateY(-50%);
	transform: translateY(-50%);
	height: 24px;
	width: 24px;
}

.cd-pricing {
	text-align: center;
}
.cd-pricing-features .available em::before {
    background-position: 0 0;
}

.cd-pricing-features{background: #fff;}
.cd-pricing-footer {
	padding-bottom: 1.7em; background:#fff; text-align: center;
}
.cd-pricing-footer a, .cd-form input[type="submit"] {
	display: inline-block;
	padding: 1em 1.8em;
	border-radius: 50em;
	text-transform: uppercase;
	font-size: 1.3rem;
	font-weight: bold;
}
.cd-pricing-footer a {
	border: 1px solid rgba(223, 79, 113, 0.4);
	color: #df4f71;
}
.cd-pricing-footer a:hover{text-decoration: none;}

.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
</style>
