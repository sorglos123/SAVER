<template>
  <page-header />
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue';

export default {
  name: 'app',
  components: {
    PageHeader,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  background: #1b4332;
}
</style>
