<template>
  <div>
    <v-alert
      :value="successAlert"
      type="success"
      transition="scale-transition"
    >
      {{ successMessage }}
    </v-alert>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
        successAlert: true
      }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'successMessage'
        ])
    },
  }
</script>

<style lang="scss">
    .v-alert.v-alert {
        font-family: 'Avenir LT Std 95 Black';
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 12px;
    }
</style>