import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth';
import Zap from './modules/zap';
import Ms from './modules/ms';
import Alert from './modules/alert';
import Users from './modules/users';
import Loader from './modules/loader';
import Card from './modules/card';
import Tutorials from './modules/tutorials';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Zap,
    Ms,
    Alert,
    Users,
    Loader,
    Card,
    Tutorials
  }
})
