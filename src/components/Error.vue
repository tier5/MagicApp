<template>
  <div>
    <v-alert
      :value="errorAlert"
      type="error"
      transition="scale-transition"
    >
      This is a error alert.
    </v-alert>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        errorAlert: true
      }
    }
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