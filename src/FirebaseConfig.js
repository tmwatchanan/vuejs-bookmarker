// Initialize Firebase
var config = {
  apiKey: "AIzaSyDI5lMf2oE_5RlUb0hVt-cBn3AfAy1Yynk",
  authDomain: "note-app-83bf9.firebaseapp.com",
  databaseURL: "https://note-app-83bf9.firebaseio.com",
  projectId: "note-app-83bf9",
  storageBucket: "note-app-83bf9.appspot.com",
  messagingSenderId: "75507176619"
};

import firebase from 'firebase';

let firebaseApp = firebase.initializeApp(config);
let db = firebaseApp.database();

export { firebaseApp, db };
