import AddBookmark from './components/AddBookmark.vue';
import About from './components/About.vue';
import Profile from './components/Profile.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';

export const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/addbookmark',
    component: AddBookmark,
    name: 'AddBookmark'
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile'
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/signup',
    component: Signup,
    name: 'Signup'
  }
]