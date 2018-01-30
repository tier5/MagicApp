<template>
  <div>
      <Header>
          <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                    <a class="navbar-brand" href="/" name='a'>WebSiteName</a>
                    </div>
                    <ul class="nav navbar-nav">
                    <li class="active"><a href="/home" name='b'>Home</a></li>
                    <li><a href="/page1/cb?a=c" name='c'>Page 1</a></li>
                    <li><a href="/page2?b=d&a=c">Page 2</a></li>
                    <li><a href="/page3">Page 3</a></li>
                    </ul>
                </div>
            </nav>
      </Header>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
