<template>
  <div id="app">
    <navbar></navbar>
    <notifier></notifier>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Notifier from './components/Notifier'

  export default {
    components: { Navbar, Notifier }
  }
</script>

<style>
#app {
  margin: 20px;
}
</style>
