<template>
  <div class="login">
      <h3>Log In</h3>

    <div class="form-group">
        <div class="label">Phone</div>
        <div class="content"><input type="text" class="form-control" v-model="user.username" placeholder="Email"/></div>
    </div>
    <div class="form-group">
        <div class="label">Phone</div>
        <div class="content"><input type="password" class="form-control" v-model="user.password" placeholder="Password"/></div>
    </div>

    <div class="form-group">
        <div class="actions">
            <button type="button" class="btn btn-primary" @click="login">Login</button>
        </div>
    </div>
      <p>
          Did not register yet? 
          <router-link to="/signup" tag="span" active-class="active" exact><a>Sign Up</a></router-link>
          here
      </p>
  </div>
</template>

<script>
import firebase from 'firebase';
import { eventBus } from '../main';

var md5 = require('md5');

export default {
    name: 'Login',
    created() {
        var user = firebase.auth().currentUser;
        if (user) {
            console.log("[Login] found user!");
            this.$router.push('/Profile')
        }
    },
    data() {
        return {
            user: {
                username: '',
                password: ''
            }

        }
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.user.username, this.user.password).then(
                user => {
                    // alert('User authentication successful');
                    var uid = md5(this.user.username);
                    console.log("uid=" + uid + " <-- " + this.user.username);
                    eventBus.$emit('uID', uid);
                    eventBus.$emit('LoggedIn', true);
                    this.$router.push({ name: 'AddBookmark' });
                },
                err => {
                    if (err.code === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else if (err.code === 'auth/user-not-found') {
                        alert('User not found!');
                    } else if (err.code === 'auth/invalid-email') {
                        alert('Invalid email');
                    } else {
                        alert('Oops. ' + err.message);
                    }
                    
                }
            ).catch (error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password')
                } else {
                    alert(error.message);
                }
            })
        }
    }
}
</script>

<style scoped>
    /* .login {
        margin-top: 40px;
    } */
    input {
        margin: 0 auto;
        width: 40%;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }

</style>
