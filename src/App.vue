<template>
  <div id="app">
    <div class="container">

    <navigationBar/>

    <transition name="slide" mode="out-in">
        <router-view></router-view>
    </transition>


      <footer class="footer">
        <p>&copy; 2016 Bookmarker, Inc.</p>
      </footer>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld/> -->
  </div>
  <!-- /container -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import AddBookmark from './components/AddBookmark'
import NavigationBar from './components/NavigationBar'

export default {
  name: 'app',
  components: {
    HelloWorld,
    AddBookmark,
    NavigationBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
