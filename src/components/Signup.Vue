<template>
  <div class="sign-up">
      <p>Let's create a new account!</p>

        <div class="layout-form">
            <div class="form-group" :class="{error: validation.hasError('user.email')}">
                <div class="label">* Email:</div>
                <div class="content"><input type="text" class="form-control" v-model="user.email" placeholder="abc@email.com"/></div>
                <div class="message">{{ validation.firstError('user.email') }}</div>
            </div>

            <div class="form-group" :class="{error: validation.hasError('user.password1')}">
                <div class="label">* Password:</div>
                <div class="content"><input type="password" class="form-control" v-model="user.password1" placeholder="*********"/></div>
                <div class="message">{{ validation.firstError('user.password1') }}</div>
            </div>
            <div class="form-group" :class="{error: validation.hasError('user.password2')}">
                <div class="label">* Confirm Password:</div>
                <div class="content"><input type="password" class="form-control" v-model="user.password2" placeholder="*********"/></div>
                <div class="message">{{ validation.firstError('user.password2') }}</div>
            </div>

            <div class="form-group" :class="{error: validation.hasError('user.name')}">
                <div class="label">* Name</div>
                <div class="content"><input type="text" class="form-control" v-model="user.name" placeholder="Watchanan Chantapakul" /></div>
                <div class="message">{{ validation.firstError('user.name') }}</div>
            </div>
            <div class="form-group" :class="{error: validation.hasError('user.gender')}">
                <div class="label">* Gender</div>
                <div class="content">
                    <label>
                    <input type="radio" class="form-control" name="user.gender" value="male" v-model="user.gender" />
                    Male
                    </label>
                    <label>
                    <input type="radio" class="form-control" name="user.gender" value="female" v-model="user.gender" />
                    Female
                    </label>
                </div>
                <div class="message">{{ validation.firstError('user.gender') }}</div>
            </div>
            <div class="form-group" :class="{error: validation.hasError('user.phone')}">
                <div class="label">Phone</div>
                <div class="content"><input type="text" class="form-control" v-model="user.phone" placeholder="0123456789"/></div>
                <div class="message">{{ validation.firstError('user.phone') }}</div>
            </div>
            <div class="form-group" :class="{error: validation.hasError('user.age')}">
                <div class="label">Age</div>
                <div class="content"><input type="text" class="form-control" v-model="user.age" placeholder="21"/></div>
                <div class="message">{{ validation.firstError('user.age') }}</div>
            </div>
            <div class="form-group" :class="{error: validation.hasError('user.facebook')}">
                <div class="label">* Facebook Name</div>
                <div class="content"><input type="text" class="form-control" v-model="user.facebook" placeholder="Watchanan Chantapakul" /></div>
                <div class="message">{{ validation.firstError('user.facebook') }}</div>
            </div>
            <div class="form-group">
                <div class="actions">
                    <button type="button" class="btn btn-default" @click="reset">Reset</button>
                    <button type="button" class="btn btn-primary" @click="submit">Submit</button>
                </div>
            </div>
        </div>
      <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/FirebaseConfig'
import { eventBus } from '../main';
import SimpleVueValidation from 'simple-vue-validator';
var Validator = SimpleVueValidation.Validator;

var md5 = require('md5');
let usersRef = db.ref('users');

export default {
  name: 'signUp',
  created() {
    var user = firebase.auth().currentUser;
    if(user) {
        console.log("[SignUp] found user!");
        this.$router.push({ name: 'Profile' });
    }
  },
  data() {
      return {
          user: {
              email: '',
              password1: '',
              password2: '',
              name: '',
              gender: '',
              phone: '',
              age: '',
              facebook: ''
          },
          submitted: false
      }
  },
  validators: {
    'user.email': function (value) {
        return Validator.value(value).required().email();
    },
    'user.password1': function (value) {
        return Validator.value(value).required().minLength(8);
    },
    'user.password2, user.password1': function (password2, password1) {
        if (this.submitted || this.validation.isTouched('user.password2')) {
            return Validator.value(password2).required().match(password1);
        }
    },
    'user.name': function(value) {
        return Validator.value(value).required().regex('^[A-Za-z ]*$', 'Must only contain alphabetic characters.');
      },
    'user.gender': function(value) {
        return Validator.value(value).required();
      },
    'user.phone': function(value) {
        return Validator.value(value).digit().length(10);
      },
    'user.age': function(value) {
        return Validator.value(value).integer().greaterThan(12).lessThan(100);
      },
    'user.facebook': function(value) {
        return Validator.value(value).regex('^[A-Za-z ]*$', 'Must only contain alphabetic characters.');
      }
  },
  methods: {
      submit: function () {
        var vueThis = this;
        this.submitted = true;
        this.$validate()
          .then(function (success) {
            if (success) {
              vueThis.signup();
            }
          });
      },
    //   computed: {
    //       validated() {
    //           if (this.validated) {
    //               this.validated = false;
    //               this.signup();
    //           }
    //       }
    //   },
      reset: function() {
        this.user.email = '';
        this.user.password1 = '';
        this.user.password2 = '';
        this.user.name = '';
        this.user.gender = '';
        this.user.phone = '';
        this.user.age = '';
        this.user.facebook = '';
        this.validation.reset();
      },
      signup() {
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password1).then( 
                user => {
                    alert('Your accound has been created!');

                    /* add user info to database */
                    // var newUser = this.addUserInfo();
                    this.addUserInfo();

                    eventBus.$emit('LoggedIn', true);
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
              email: this.user.email,
              name: this.user.name,
              gender: this.user.gender,
              phone: this.user.phone,
              age: this.user.age,
              facebook: this.user.facebook
          }

          var uid = md5(this.user.email);
          console.log(uid);
          db.ref('users/'+ uid).set(newUser);

      }
    }
}
</script>

<style scoped>

.layout-form .form-group {
  display: flex;
  margin: 15px 0;
}

.layout-form .form-group .label {
  width: 20%;
  padding: 10px 10px 0 0;
  font-weight: bold;
  color: #374853;
  text-align: right;
}

.layout-form .form-group.error .label {
  color: #ff6666;
}

.layout-form .form-group .content {
  width: 50%;
  min-width: 120px;
}

.layout-form .form-group .content label {
  display: inline-block;
  padding: 5px 20px 0 0;
}

.layout-form .form-group .message {
  flex: 1;
  padding: 5px 0 0 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
}

.layout-form .form-group.error .message {
  color: #ff6666;
}

.layout-form .form-group .form-control {
  font-size: 14px;
}

.layout-form .form-group .actions {
  margin-left: 100px;
  width: 50%;
  text-align: right;
}

@media (max-width: 768px) {
  .layout-form {
    font-size: 12px;
  }

  .layout-form .form-group .label {
    width: 60px;
    padding-right: 10px;
  }

  .layout-form .form-group .form-control {
    font-size: 12px;
  }


  .layout-form .form-group .actions {
    margin-left: 60px;
  }
}

.layout-form .form-group input[type="text"].form-control,
.layout-form .form-group input[type="password"].form-control {
  width: 100%;
  font-weight: lighter;
  padding: 4px 6px;
  border: solid #acacac 1px;
  outline: none;
}

.layout-form .form-group input[type="text"].form-control:focus,
.layout-form .form-group input[type="password"].form-control:focus {
  border-color: #374853;
}

.layout-form .form-group.error input[type="text"].form-control,
.layout-form .form-group.error input[type="password"].form-control,
.layout-form .form-group.error input[type="text"].form-control:focus,
.layout-form .form-group.error input[type="password"].form-control:focus {
  border-color: #ff6666;
}

.layout-form .form-group .btn {
  font-size: 12px;
  font-weight: normal;
  padding: 6px 10px;
  border-radius: 4px;
  outline: none;
  appearance: none;
  cursor: pointer;
  text-transform: uppercase;
}

.layout-form .form-group .btn + .btn {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .layout-form .form-group .btn {
    padding: 3px 6px;
  }

  .layout-form .form-group .btn + .btn {
    margin-left: 4px;
  }
}

.layout-form .form-group .btn-primary {
  color: #fff;
  background-color: #41b883;
  border: solid #39a073 1px;
}

.layout-form .form-group .btn-primary:focus {
  background-color: #3dad7c;
}

.layout-form .form-group .btn-primary:active {
  background-color: #39a073;
}

.layout-form .form-group .btn-default {
  color: #374853;
  background-color: #fff;
  border: solid #acacac 1px;
}

.layout-form .form-group .btn-default:focus {
  background-color: #eee;
}

.layout-form .form-group .btn-default:active {
  background-color: #ccc;
}
</style>

