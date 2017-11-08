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
              <router-link v-if="!loggedIn" v-bind:to="'/signup'" tag="li" active-class="active" exact><a>Sign Up</a></router-link>
              <router-link v-if="!loggedIn" v-bind:to="'/login'" tag="li" active-class="active" exact><a>Login</a></router-link>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <router-link v-if="loggedIn" v-bind:to="'/profile'" tag="li" active-class="active" exact><a>Profile</a></router-link>
              <li v-if="loggedIn" @click="logout" active-class="active" exact><a href="#">Sign Out</a></li>
            </ul>
            <!-- <ul class="nav navbar-nav navbar-right">
              <router-link v-if="!loggedIn" v-bind:to="'/signup'" tag="li" active-class="active" exact><a>Sign Up</a></router-link>
              <router-link v-if="!loggedIn" v-bind:to="'/login'" tag="li" active-class="active" exact><a>Login</a></router-link>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <router-link v-if="loggedIn" v-bind:to="'/profile'" tag="li" active-class="active" exact><a>Profile</a></router-link>
              <router-link v-if="loggedIn" @click="logout" tag="li" active-class="active" exact><a>Sign Out</a></router-link>
            </ul> -->
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
          // this.link1 = "/profile";
          // this.link1Name = "Profile";
          // this.link2 = "/logout";
          // this.link2Name = "Log Out";
        } else {
          // this.link1 = "/signup";
          // this.link1Name = "Sign Up";
          // this.link2 = "/login";
          // this.link2Name = "Log In";
        }
        if(user) {
          console.log("[NavigationBar] found user!");
        }
        console.log("this.loggedIn = " + this.loggedIn);
        console.log("link1 changed to " + this.link1);
        console.log("link2 changed to " + this.link2);
      })
      var user = firebase.auth().currentUser;
      if(user) {
        console.log("[NavigationBar] found user!");
        this.loggedIn = true;
        // this.$router.push('/success')
        // this.link1 = "/profile";
        // this.link1Name = "Profile";
        // this.link2 = "/logout";
        // this.link2Name = "Log Out";
      } else {
        this.loggedIn = false;
        // this.$router.push('/auth')
          // this.link1 = "/signup";
          // this.link1Name = "Sign Up";
          // this.link2 = "/login";
          // this.link2Name = "Log In";
      }
    },
    methods: {
      logout() {
        var user = firebase.auth().currentUser;
        if(user) {
            firebase.auth().signOut().then(() => {
                eventBus.$emit('uID', null);
                eventBus.$emit('LoggedIn', false);
                // this.link1 = "/signup";
                // this.link1Name = "Sign Up";
                // this.link2 = "/login";
                // this.link2Name = "Log In";
                this.$router.push({
                  name: 'Login'
                });
            });
            console.log("[Logout] not found user");
            this.$router.push({
              name: 'Login'
            });
        }
      }
    }
  }

</script>
