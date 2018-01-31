import Vue from 'vue';
import router from '../../router';

const state = {
  isAuthenticated: false,
  token: '',
  user:{},
  forgotPassClicked:false,
};

const getters = {
  isAuthenticated: (state) => {
    return state.isAuthenticated;
  },
  token: (state) => {
    return state.token;
  },
  user: (state) => {
    return state.user;
  }
};

const mutations = {
  userSignIn: (state, payload) => {
    state.isAuthenticated = true;
    state.token = payload.token;
    state.user = payload.user;
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));
  },
  userSignOut: (state) => {
    state.isAuthenticated = false;
    state.token = '';
    state.user = {};
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  checkUserAuthentication: (state) => {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
      state.isAuthenticated = true;
      state.token = localStorage.getItem('token');
      state.user = JSON.parse(localStorage.getItem('user'));
      router.push('/magic');
    } else {
      state.isAuthenticated = false;
      state.token = '';
      state.user = {};
      router.push('/login');
    }
  },
  toggleForgotPasswordClicked:(state)=>{
    state.forgotPassClicked = !state.forgotPassClicked
  }
};

const actions = {
  userSignIn: ({commit}, payload) => {
    Vue.http.post('login', payload)
      .then(
        (res) => {
          if(res.body.status) {
            // console.log(res.body.response);
            commit('userSignIn',res.body);
            router.push('/magic');
          } else {

          }
        },
        (err) => {
          var message = err.body.message;
          console.log(message);
          commit('errorMessage',message);
          commit('errorTrue');
        }
      )
  },
  userSignUp: ({commit}, payload) => {
    Vue.http.post('register', payload)
      .then(
        (res) => {
          if(res.body.status) {
            // console.log(res.body.response);
            commit('userSignIn',res.body);
            router.push('/magic');
          } else {

          }
        },
        (err) => {
          var message = err.body.message;
          commit('errorMessage',message);
          commit('errorTrue');
        }
      )
  },
    userSignOut:({commit})=>{
      commit('userSignOut');
      router.push('/login');
    }
};

export default { state, getters, mutations, actions }
