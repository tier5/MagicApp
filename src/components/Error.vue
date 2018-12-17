<template>
  <div>
    <v-alert
      :value="errorAlert"
      type="error"
      transition="scale-transition"
    >
      {{errorMessage}}
    </v-alert>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
        errorAlert: true
      }
    },
    computed: {
        ...mapGetters([
            'errorMessage'
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