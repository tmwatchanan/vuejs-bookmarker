<template>
  
</template>

<script>
import firebase from 'firebase';
import { eventBus } from '../main';

export default {
    created() {
        var user = firebase.auth().currentUser;
        if(user) {
            firebase.auth().signOut().then(() => {
                eventBus.$emit('uID', null);
                eventBus.$emit('LoggedIn', false);
                this.$router.push({
                name: 'AddBookmark'
                });
            })
        } else {
            console.log("[Logout] not found user");
            // this.$router.push({
            // name: 'Login'
            // });
        }
    }
}
</script>
