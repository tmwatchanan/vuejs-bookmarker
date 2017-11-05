<template>
  <div class="sign-up">
      <p>Let's create a new account!</p>
        <!-- <input type="text" ref="name" v-model="user.name" placeholder="Full Name"><br> -->
        <div class="form-group" :class="{'has-error': errors.has('email') }" >
            <label class="control-label" for="email">Email: </label>
            <input style="display: none;" v-validate="user.email" data-rules="required|email" class="form-control" type="email" placeholder="Email">
            <input v-model="user.email" v-validate="'required|email'" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Email">
            <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
        </div>

        <div class="form-group">
            <!-- <div class="input-group-addon">
            Enter Password
            </div> -->

            <label class="control-label" for="password1">Password: </label>
            <div class="input-fields">
                <input v-model="user.password1" v-validate="'required|min:8'" name="password" type="password" class="form-control" placeholder="Password">
                <div class="text-danger" v-show="errors.any()">
                    <div v-if="errors.has('password')">
                    {{ errors.first('password') }}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label class="control-label" for="password2">Confirm Password: </label>
            <div class="input-fields">
                <input v-model="user.password2" v-validate="'required|min:8|confirmed:password'" name="password_confirmation" type="password" class="form-control" placeholder="Password, Again" data-vv-as="password">
                <div class="text-danger" v-show="errors.any()">
                    <div v-if="errors.has('password_confirmation')">
                    {{ errors.first('password_confirmation') }}
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group" :class="{'has-error': errors.has('name') }" >
            <label class="control-label" for="name">Full Name: </label>
            <input style="display: none;" v-validate="user.name" data-rules="required|alpha|min:2" class="form-control" type="text" placeholder="Name">
            <input v-model="user.name" v-validate="'required|alpha|min:2'" class="form-control" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" type="text" placeholder="Name">
            <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
        </div>

        <div class="form-group" :class="{'has-error': errors.has('birthdate') }" >
            <label class="control-label" for="birthdate">Birthdate: </label>
            <input style="display: none;" v-validate="user.birthdate" data-rules="required|date_format:DD/MM/YYYY" class="form-control" type="text" placeholder="Name">
            <input v-model="user.birthdate" v-validate="'required|date_format:DD/MM/YYYY'" class="form-control" :class="{'input': true, 'is-danger': errors.has('birthdate') }" name="birthdate" type="text" placeholder="DD/MM/YYYY">
            <p class="text-danger" v-if="errors.has('birthdate')">{{ errors.first('birthdate') }}</p>
        </div>

        <div class="form-group" :class="{'has-error': errors.has('facebook') }" >
            <label class="control-label" for="facebook">Facebook Name: </label>
            <input style="display: none;" v-validate="user.facebook" data-rules="required|alpha|min:2" class="form-control" type="text" placeholder="Name">
            <input v-model="user.facebook" v-validate="'required|alpha|min:2'" class="form-control" :class="{'input': true, 'is-danger': errors.has('facebook') }" name="facebook" type="text" placeholder="Facebook">
            <p class="text-danger" v-if="errors.has('facebook')">{{ errors.first('facebook') }}</p>
        </div>

        <!-- <div class="form-group" :class="{'has-error': errors.has('age') }" >
            <label class="control-label" for="age">Age: </label>
            <input style="display: none;" v-validate="user.facebook" data-rules="required|digits:3" class="form-control" type="text" placeholder="Name">
            <input v-model="user.facebook" v-validate="'required|digits:3'" class="form-control" :class="{'input': true, 'is-danger': errors.has('age') }" name="age" type="number" placeholder="Facebook">
            <p class="text-danger" v-if="errors.has('age')">{{ errors.first('age') }}</p>
        </div> -->

<!-- <div class="column is-12"> -->
    <!-- <label class="label" for="email">Email</label> -->
    <!-- <p :class="{ 'control': true }"> -->
        <!-- <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span> -->
    <!-- </p> -->
<!-- </div> -->
        <!-- <input v-validate="{ required: true, email: true, regex: /[0-9]+/ }" type="text" name="email"> -->
        <!-- <input type="text" ref="email" v-model="user.email" placeholder="Email"><br>
        <input type="password" v-model="user.password1" placeholder="Password"><br>
        <input type="password" ref="password2" v-model="user.password2" placeholder="Confirm password"><br>
        <input type="text" ref="url" v-model="user.url" placeholder="Website"><br>
        <input type="text" ref="phone" v-model="user.phone" placeholder="Phone number"><br> -->

        <!-- <button  @click="validateBeforeSubmit">Sign Up</button> -->
        <!-- <button  @click="validateBeforeSubmit">Sign Up</button> -->
      <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/FirebaseConfig'

var md5 = require('md5');
let usersRef = db.ref('users');

export default {
  name: 'signUp',
  data() {
      return {
          user: {
              email: '',
              password1: '',
              password2: '',
              name: '',
              birthdate: '',
              facebook: '',
              url: '',
              phone: ''
          }
      }
  },
  methods: {
      validateBeforeSubmit() {
          console.log("email: " + this.user.email);
          console.log("password1: " + this.user.password1);
          console.log("password2: " + this.user.password2);
          console.log("name: " + this.user.name);
          console.log("birthdate: " + this.user.birthdate);
          console.log("facebook: " + this.user.facebook);
          if (this.user.email && (this.user.password1 === this.user.password2)) {
              this.signup();
          } else {
              if(!this.user.name) {
                  alert('Name cannot be empty');
                  this.$refs.name.focus();
                  return;
              }
              if(!this.user.email) {
                  alert('Email cannot be empty');
                  this.$refs.email.focus();
                  return;
              }
              if(this.user.password1 != this.user.password2) {
                  alert('Password mismatch');
                  this.$refs.password2.focus();
                  return;
              }
          }
      },
      signup() {
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password1).then( 
                user => {
                    alert('Your accound has been created!');

                    /* add user info to database */
                    // var newUser = this.addUserInfo();
                    this.addUserInfo();

                    this.$router.push({ name: 'Profile' });
                }, 
                error => {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too week');
                    } else {
                        alert('Oops.' + errorMsg);
                    }
                }
            );
      },
      addUserInfo() {
          var newUser = {
              name: this.user.name,
              email: this.user.email,
              phone: this.user.phone,
              url: this.user.url
          }

          var uid = md5(this.user.email);
          console.log(uid);
          db.ref('users/'+ uid).set(newUser);

      }
    }
}
</script>

<style scoped>
    .signUp {
        margin-top: 40px;
    }
    input, .alert {
        /* margin: 5px 0; */
        margin: 0 auto;
        width: 40%;
        /* padding: 15px; */
    }
    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }

</style>

