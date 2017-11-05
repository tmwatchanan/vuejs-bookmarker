<template>
  <div>
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <form class="form-horizontal" role="form">
        <fieldset>

          <!-- Form Name -->
          <legend>{{ user.name }}</legend>

          <!-- Text input-->
          <div class="form-group">
            <label class="col-sm-2 control-label" for="textinput">Full Name</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Full Name" class="form-control" v-bind:value="user.name" readonly>
            </div>
          </div>

          <!-- Text input-->
          <div class="form-group">
            <label class="col-sm-2 control-label" for="textinput">Email</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Email" class="form-control" v-bind:value="user.email" readonly>
            </div>
          </div>

          <!-- Text input-->
          <div class="form-group">
            <label class="col-sm-2 control-label" for="textinput">Phone</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Phone" class="form-control" v-bind:value="user.phone" readonly>
            </div>
          </div>

          <!-- Text input-->
          <div class="form-group">
            <label class="col-sm-2 control-label" for="textinput">Gender</label>
            <div class="col-sm-4">
              <input type="text" placeholder="Gender" class="form-control" v-bind:value="user.gender" readonly>
            </div>

            <label class="col-sm-2 control-label" for="textinput">Age</label>
            <div class="col-sm-4">
              <input type="text" placeholder="Age" class="form-control" v-bind:value="user.age" readonly>
            </div>
          </div>



          <!-- Text input-->
          <div class="form-group">
            <label class="col-sm-2 control-label" for="textinput">Facebook</label>
            <div class="col-sm-10">
              <input type="text" placeholder="Facebook Name" class="form-control" v-bind:value="user.facebook" readonly>
            </div>
          </div>

          <!-- <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <div class="pull-right">
                <button type="submit" class="btn btn-default">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
          </div> -->

        </fieldset>
      </form>
    </div><!-- /.col-lg-12 -->
</div><!-- /.row -->
    <!-- <div v-if="user.photoURL">
      <p>Profile Photo:</p>
      <img :src="user.photoURL" style="height: 120px">
    </div>
    <br>
    <p>ID: {{ user.userId }}</p>
    <p v-if="user.name">Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phone }}</p>
    <p>Gender: {{ user.gender }}</p>
    <p>Age: {{ user.age }}</p>
    <p>Facebook: {{ user.facebook }}</p> -->

    <button type="button" class="btn btn-danger" @click="logout">Logout</button>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import { db } from '@/FirebaseConfig'
  import { eventBus } from '../main';

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
          phone: '',
          gender: '',
          age: '',
          facebook: ''
        },
      }
    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {
          // eventBus.$emit('uID', null);
          eventBus.$emit('LoggedIn', false);
          this.$router.push({
            name: 'Login'
          });
        })
      }
    },
    created() {
      var user = firebase.auth().currentUser;

      if (user) {
        console.log("[Profile] found user!");
        // this.user.photoURL = user.photoURL;
        this.user.userId = user.uid;
        this.user.name = user.displayName;
        this.user.email = user.email;

        var uid = md5(user.email);
        console.log(uid);

        db.ref('users/' + uid).once('value').then(
          snapshot => {
            if (snapshot) {
              console.log(snapshot.val());
              this.user.name = snapshot.val().name;
              this.user.url = snapshot.val().url;
              this.user.phone = snapshot.val().phone;
              this.user.gender = snapshot.val().gender;
              this.user.age = snapshot.val().age;
              this.user.facebook = snapshot.val().facebook;
            }
          });

      } else {
          this.$router.push({
            name: 'Signup'
          });
      }
    }

  }
</script>
