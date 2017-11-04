<template>
  <div>
    <div v-if="user.photoURL">
      <p>Profile Photo:</p>
      <img :src="user.photoURL" style="height: 120px">
    </div>
    <br>
    <p>ID: {{ user.userId }}</p>
    <p v-if="user.name">Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Website: {{ user.url }}</p>
    <p>Phone: {{ user.phone }}</p>

    <button @click="logout">Logout</button>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import { db } from '@/FirebaseConfig'

  var md5 = require('md5');

  export default {
    name: 'Profile',
    data() {
      return {
        user: {
        //   photoURL: '',
          userId: '',
          name: '',
          email: '',
          url: '',
          phone: ''
        }
      }
    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {
          eventBus.$emit('uID', null);
          this.$router.push({
            name: 'Login'
          });
        })
      }
    },
    created() {
      var user = firebase.auth().currentUser;

      if (user) {
        // this.user.photoURL = user.photoURL;
        this.user.userId = user.uid;
        this.user.name = user.displayName;
        this.user.email = user.email;

        var uid = md5(user.email);
        console.log(uid);

        db.ref('users/' + uid).once('value').then(
          snapshot => {
            if (snapshot) {
              console.log(snapshot);
              this.user.name = snapshot.val().name;
              this.user.url = snapshot.val().url;
              this.user.phone = snapshot.val().phone;
            }
          });

      }
    }

  }
</script>
