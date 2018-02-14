import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/Dashboard'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Magic from '../components/Magic.vue'
import AuthGaurd from './gaurds/auth-gaurd';
import NotAuthGaurd from './gaurds/not-auth-gaurd';
import ZapierAuth from '../components/ZapierAuth.vue';
import Users from '../components/Users.vue';
import Plans  from '../components/Plans.vue';
import ResetPassword from '../components/ResetPassword.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,beforeEnter: AuthGaurd,children :[
      {
        path:'magic',
        name:'Magic',
        component:Magic
      },
      {
        path:'zapier-auth',
        name:'ZapierAuth',
        component:ZapierAuth
      },
      {
        path:'users',
        name:'Users',
        component: Users
      },
      {
        path:'plans',
        name:'Plans',
        component: Plans
      }
    ]
    },
    {
      path: '/register',
      name: 'Register',
      beforeEnter:NotAuthGaurd,
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter:NotAuthGaurd,
      component: Login
    },
    {
      path: '/reset-password/:token',
      name: 'ResetPassword',
      component: ResetPassword
    },
    
  ]
})
