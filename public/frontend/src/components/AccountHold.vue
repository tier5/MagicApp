<template>
  <div>
      <h3 class="hold_message">{{message}}</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
        message : 'You account is suspended. For details please contact to the admin.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hold_message{
    color: red
}
</style>
