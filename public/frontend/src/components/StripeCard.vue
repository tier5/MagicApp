<template>
  <div class='credit-card-inputs' :class='{ complete }'>
    <div class="row">
      <div class="col-md-4 col-sm-4">
    <card-number class='stripe-element card-number form-control'
      ref='cardNumber'
      :stripe='stripe'
      :options='options'
      @change='number = $event.complete'
    />
      </div>
      <div class="col-md-4 col-sm-4">
    <card-expiry class='stripe-element card-expiry form-control'
      ref='cardExpiry'
      :stripe='stripe'
      :options='options'
      @change='expiry = $event.complete'
    />
      </div>
      <div class="col-md-4 col-sm-4">
    <card-cvc class='stripe-element card-cvc form-control' 
      ref='cardCvc'
      :stripe='stripe'
      :options='options'
      @change='cvc = $event.complete'
    />
      </div>
    </div>
  </div>
</template>

<script>
import { CardNumber, CardExpiry, CardCvc, createToken } from 'vue-stripe-elements-plus';
import { mapGetters } from 'vuex';

export default {
  props: [ 'stripe', 'options' ],
  data () {
    return {
      complete: false,
      number: false,
      expiry: false,
      cvc: false
    }
  },
  components: { CardNumber, CardExpiry, CardCvc },
  methods: {
    update () {
      this.complete = this.number && this.expiry && this.cvc 
      this.$store.commit('changeIsCardValid',this.complete);
      // field completed, find field to focus next
      if (this.number) {
        if (!this.expiry) {
          this.$refs.cardExpiry.focus()
        } else if (!this.cvc) {
          this.$refs.cardCvc.focus()
        }
      } else if (this.expiry) {
        if (!this.cvc) {
          this.$refs.cardCvc.focus()
        } else if (!this.number) {
          this.$refs.cardNumber.focus()
        }
      }
      // no focus magic for the CVC field as it gets complete with three
      // numbers, but can also have four
    }
    
  },
  computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'isCardValid'
        ]),
  },
  watch: {
    number () { this.update() },
    expiry () { this.update() },
    cvc () { this.update() }
  }
}
</script>

<style>
/* .credit-card-inputs {
  width: 300px
}  */
/* .credit-card-inputs input{
  float:left;
} */

</style>