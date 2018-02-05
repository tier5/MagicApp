<template>
  <div id='app'>
    <h1>Please give us your payment details:</h1>
    <card class='stripe-card'
      :class='{ complete }'
      stripe='pk_test_aFYmaDW3rf5AHh7MkX2BSshB'
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
    <button class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</button>
  </div>
</template>

<script>
//import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  data () {
    return {
        complete: false,
        stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
            style:{
                base: {
                    color: '#303238',
                    fontSize: '16px',
                    color: "#32325d",
                    fontSmoothing: 'antialiased',
                    '::placeholder': {
                    color: '#ccc',
                },
                },
                invalid: {
                    color: '#e5424d',
                    ':focus': {
                    color: '#303238',
                    },
                }
            }
        }
    }
  },

  components: { Card },

  methods: {
    pay () {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then(data => {
          //console.log(data.token)
          alert('Token');
          this.$store.commit('addCardToken',data.token.id);
        })
    }
  }
}
</script>

<style>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
</style>