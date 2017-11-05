<template>
    <div class="header clearfix">
<nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Bookmarker</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <router-link to="/addbookmark" tag="li" active-class="active" exact><a>Bookmarks</a></router-link>
              <router-link to="/about" tag="li" active-class="active" exact><a>About</a></router-link>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <router-link v-bind:to="link1" tag="li" active-class="active" exact><a>{{ link1Name }}</a></router-link>
              <router-link v-bind:to="link2" tag="li" active-class="active" exact><a>{{ link2Name }}</a></router-link>
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>
    </div>
</template>

<script>
import firebase from 'firebase';
import { eventBus } from '../main';

  export default {
    data() {
      return {
        loggedIn: false,
        link1: '/signup',
        link1Name: 'Sign Up',
        link2: '/login',
        link2Name: 'Log In'
      }
    },
    created() {
      eventBus.$on('LoggedIn', (loggedIn)=> {
        console.log("eventBus@NavigationBar -> LoggedIn has been changed to " + loggedIn);
        this.loggedIn = loggedIn;
        if (loggedIn) {
          this.link1 = "/profile";
          this.link1Name = "Profile";
          this.link2 = "/logout";
          this.link2Name = "Log Out";
        } else {
          this.link1 = "/signup";
          this.link1Name = "Sign Up";
          this.link2 = "/login";
          this.link2Name = "Log In";
        }
        if(user) {
          console.log("[NavigationBar] found user!");
        }
        console.log("this.loggedIn = " + this.loggedIn);
        console.log("link1 changed to " + this.link1);
        console.log("link2 changed to " + this.link2);
        // this.$forceUpdate();
      })
      var user = firebase.auth().currentUser;
      if(user) {
        console.log("[NavigationBar] found user!");
        this.loggedIn = true;
        // this.$router.push('/success')
      } else {
        this.loggedIn = false;
        // this.$router.push('/auth')
      }
    }
  }

</script>
