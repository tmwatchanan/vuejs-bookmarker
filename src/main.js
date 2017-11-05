// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router';
import { routes } from './routes'; // routes.js
// import VeeValidate from 'vee-validate';
import SimpleVueValidation from 'simple-vue-validator';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes, // or just 'routes' in ES6
  mode: 'history'
});

Vue.config.productionTip = false

Vue.use(VueResource);
// Vue.http.options.root = 'https://note-app-83bf9.firebaseio.com/bookmarks.json';

export const eventBus = new Vue();

// Vue.use(VeeValidate);
Vue.use(SimpleVueValidation);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router,
})
