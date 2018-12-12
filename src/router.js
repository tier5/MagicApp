import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue';
import Login from './components/Auth/Login/Login.vue';
import ChangePassword from './components/Auth/ChangePassword/ChangePassword.vue';
import CreateNewZap from './components/dashboard/CreateNewZap/CreateNewZap.vue';
import TrialPopup from './components/Auth/TrialPopup/TrialPopup.vue';
import ZapierToken from './components/dashboard/ZapierToken/ZapierToken.vue';
import MyZaps from './components/dashboard/MyZaps/MyZaps.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/landing',
      name: 'home',
      component: Home,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: ChangePassword,
    },
    {
      path: '/dashboard/createnewzap',
      name: 'CreateNewZap',
      component: CreateNewZap
    },
    {
      path: '/trialpopup',
      name: 'TrialPopup',
      component: TrialPopup,
    },
    {
      path: '/dashboard/zapiertoken',
      name: 'ZapierToken',
      component: ZapierToken,
    },
    {
      path: '/dashboard/myzaps',
      name: 'MyZaps',
      component: MyZaps,
    }
  ]
});