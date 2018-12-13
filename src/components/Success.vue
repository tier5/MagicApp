<template>
  <div>
    <v-alert
      :value="successAlert"
      type="success"
      transition="scale-transition"
    >
      This is a success alert.
    </v-alert>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        successAlert: true
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