import Vue from 'vue';
import Router from 'vue-router';

import AuthGaurd from './gaurds/auth-gaurd'; 
import Home from '../views/Home/Home.vue';

import CreateNewZap from '../components/dashboard/CreateNewZap/CreateNewZap.vue';
import ZapierToken from '../components/dashboard/ZapierToken/ZapierToken.vue';
import MyZaps from '../components/dashboard/MyZaps/MyZaps.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import ViewZap from '../components/dashboard/ViewZap/ViewZap.vue';
import EditZap from '../components/dashboard/EditZap/EditZap.vue';
import HowItWorks from '../components/dashboard/HowItWorks/HowItWorks.vue';
import SignUp from '../components/Auth/SignUp/SignUp.vue';
import SignUpPayment from '../components/Auth/SignUpPayment/SignUpPayment.vue';
import ResetPassword from '../components/Auth/ResetPassword/ResetPassword.vue';
import ViewTrainingVidoes from '../components/dashboard/TrainingVideo/ViewTrainingVideos.vue';
import Users from '../components/dashboard/Users/Users.vue';

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
      path: '/reset-password/:token',
      name: 'ResetPassword',
      component: ResetPassword,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/signup-payment',
      name: 'SignUpPayment',
      component: SignUpPayment,
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
          path:'zaps/view',
          name: 'ViewZap',
          component: ViewZap
        },
        {
          path:'zaps/edit',
          name: 'EditZap',
          component: EditZap
        },
        {
          path:'zapier-token',
          name:'ZapierToken',
          component: ZapierToken
        },
        {
          path:'training',
          name: 'HowItWorks',
          component: HowItWorks
        },
        {
          path:'settings/tutorials',
          name: 'ViewTrainingVideos',
          component: ViewTrainingVidoes
        },
        {
          path:'users',
          name: 'Users',
          component: Users
        }
      ]
    }
  ]
});