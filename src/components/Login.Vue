<template>
  <div class="login">
      <h3>Sign in</h3>
      <input type="text" v-model="user.username" placeholder="Email"><br>
      <input type="password" v-model="user.password" placeholder="Password"><br>
      <button @click="login">Login</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import { eventBus } from '../main';

var md5 = require('md5');

export default {
    name: 'Login',
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
                    alert('User authentication successful');
                    var uid = md5(this.user.username);
                    console.log("uid=" + uid + " <-- " + this.user.username);
                    eventBus.$emit('uID', uid);
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
    .login {
        margin-top: 40px;
    }
    input {
        margin: 10px 0;
        width: 40%;
        padding: 15px;
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
