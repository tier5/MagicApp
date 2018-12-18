import Vue from 'vue';
import Router from 'vue-router';

import AuthGaurd from './gaurds/auth-gaurd'; 
import Home from '../views/Home/Home.vue';
import ChangePassword from '../components/Auth/ChangePassword/ChangePassword.vue';
import CreateNewZap from '../components/dashboard/CreateNewZap/CreateNewZap.vue';
import ZapierToken from '../components/dashboard/ZapierToken/ZapierToken.vue';
import MyZaps from '../components/dashboard/MyZaps/MyZaps.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import Loader from '../components/Loader.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: ChangePassword,
    },
    {
      path: '/magic',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGaurd,
      children:[
        {
          path:'',
          name: 'Zaps',
          component : MyZaps
        },
        {
          path:'zaps/new',
          name: 'CreateZap',
          component: CreateNewZap
        },
        {
          path:'zapier-token',
          name:'ZapierToken',
          component: ZapierToken
        }
      ]
    }
  ]
});