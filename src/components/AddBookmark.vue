<template>
  <div>
    <div v-if="loggedIn" class="jumbotron">
    <h2>Bookmark Your Favorite Sites</h2>
    <form id="myForm">
      <div class="form-group">
        <label>Site Name</label>
        <input v-model="bookmark.name" type="text" class="form-control" id="siteName" placeholder="Website Name">
      </div>
      <div class="form-group">
        <label>Site URL</label>
        <input v-model="bookmark.url" type="text" class="form-control" id="siteUrl" placeholder="Website URL">
      </div>
      <a @click.prevent="addNewBookmark" class="btn btn-primary">Submit</a>
    </form>

    <!-- show fetching data in a list -->
    <hr>
    <h2>Bookmark List</h2>
    <!-- <button class="btn bth-primary" @click="fetchData">Get Data</button> -->
    <br>
    <br>
    <ul class="list-group">
      <li class="list-group-item" v-for="bm in bookmarks" :key="bm.key"><p>{{ bm.name }}</p>
          <a v-bind:href="'http://' + bm.url">{{ bm.url }}</a><br/>
        <a class="btn btn-sm btn-default" v-bind:href="'http://' + bm.url">Go</a>
        <a class="btn btn-sm btn-danger" @click="deleteBookmark(bm.key)">Delete</a>
      </li>
    </ul>

    <div class="row marketing">
      <div class="col-lg-12">
        <div id="bookmarksResults"></div>
      </div>
    </div>
    </div>
    <div v-if="!loggedIn">
    <div class="alert alert-danger">
      <strong>Alert!</strong> You should login first to use bookmarker app :3
    </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import { eventBus } from '../main';
  var md5 = require('md5');

  export default {
    name: 'AddBookmark',
    data() {
      return {
        bookmark: {
          name: '',
          url: ''
        },
        bookmarks: [],
        uid: '',
        loggedIn: false
      }
    },

    methods: {
      addNewBookmark() {
        console.log("[uid=" + this.uid + "] add {" + this.bookmark.name + ", " + this.bookmark.url + '} to bookmarks');
        this.$http.post('https://note-app-83bf9.firebaseio.com/users/{/id}/bookmarks.json', this.bookmark, {
          params: {
            id: this.uid
          }
        })
          .then(response => { // define how to deal with the response
            console.log(response);
            alert("Bookmark has been added.")
            this.fetchData();
          }, error => { // define how to deal with error
            console.log(error);
          });
      },
      fetchData() {
        this.$http.get('https://note-app-83bf9.firebaseio.com/users/{/id}/bookmarks.json', {
          params: {
            id: this.uid
          }})
          .then(response => {
            return response.json(); // return an a javascript object
          })
          .then(data => { // define what to do with the returned javascript object
            const resultArray = [];
            for (let key in data) {
                var loadedBookmark = new Object();
                loadedBookmark['key'] = key
                loadedBookmark['name'] = data[key].name
                loadedBookmark['url'] = data[key].url
                resultArray.push(loadedBookmark);
            }
            this.bookmarks = resultArray; // trigger Vue.js to update the DOM
          });
      },
      deleteBookmark: function (deletedKey) {
          console.log('deletedKey = ', deletedKey)
            this.$http.delete('https://note-app-83bf9.firebaseio.com/users/{/id}/bookmarks/{/keyBookmark}.json', {
              params: {
                id: this.uid,
                keyBookmark: deletedKey
              }
            })
              .then(response => {
                  alert('Deleted!')
                  this.fetchData();
              });
        // for (let bm in this.bookmarks) {
        //   if (bm.name == bmName) {
        //     // alert('matched')
        //     this.$http.delete('', {params: {name: bmName}})
        //       .then(response => {
        //           alert('Deleted!')
        //       });
        //   }
        // }
      }
    },
    created() {
      var user = firebase.auth().currentUser;

      if (user) {
        console.log("[AddBookmark] found user!");
        this.loggedIn = true;
        // this.user.photoURL = user.photoURL;
        // this.user.userId = user.uid;
        // this.user.name = user.displayName;
        // this.user.email = user.email;

        var uid = md5(user.email);
        this.uid = uid;
        console.log(uid);

        this.fetchData();
      } else {
          this.loggedIn = false;
          // this.$router.push({ name: 'Login' });
      }
    },
    // mounted() {
    //   eventBus.$on('uID', (uid)=> {
    //     this.uid = uid;
    //     console.log("uID from eventBus = " + uid);
    //   });
    //   if (this.uid == "") {
    //       this.$router.push({ name: 'Login' });
    //   }
    //   this.fetchData();
    // }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
