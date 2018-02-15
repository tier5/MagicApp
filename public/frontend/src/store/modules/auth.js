import Vue from 'vue';
import router from '../../router';
import swal from 'sweetalert2';

const state = {
  isAuthenticated: false,
  token: '',
  user:{},
  forgetPassword:false,
  plans:[],
  cardToken:''
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  token: state => state.token,
  user: state => state.user,
  plans: state => state.plans,
  cardToken: state => state.cardToken,
  forgetPassword : state => state.forgetPassword
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
      //router.push('/login');
    }
  },
  toggleForgotPasswordClicked:(state)=>{
    state.forgotPassClicked = !state.forgotPassClicked
  },
  getPlans:(state,payload)=>{
    state.plans = [...payload]
  },
  addCardToken:(state,payload)=>{
    state.cardToken = payload
  },
  changeForgetPassword:(state,payload)=>{
    state.forgetPassword = payload
  }
};

const actions = {
  userSignIn: ({commit}, payload) => {
    commit('changeLoading',true);
    Vue.http.post('login', payload)
      .then(
        (res) => {
          commit('changeLoading',false);
          if(res.body.status) {
            // console.log(res.body.response);
            commit('userSignIn',res.body);
            router.push('/magic');
          } else {

          }
        },
        (err) => {
          commit('changeLoading',false);
          var message = err.body.message;
          console.log(message);
          commit('errorMessage',message);
          commit('errorTrue');
        }
      )
  },
  userSignUp: ({commit}, payload) => {
    commit('changeLoading',true);
    Vue.http.post('register', payload)
      .then(
        (res) => {
          commit('changeLoading',false);
          if(res.body.status) {
            // console.log(res.body.response);
            commit('userSignIn',res.body);
            router.push('/magic');
          } else {
          }
        },
        (err) => {
          commit('changeLoading',false);
          var message = err.body.message;
          commit('errorMessage',message);
          commit('errorTrue');
        }
      )
  },
  userSignOut:({commit})=>{
    commit('userSignOut');
    router.push('/login');
  },
  getPlans:({commit})=>{
    commit('changeLoading',true);
    Vue.http.get('plans')
      .then(
        (res) => {
          commit('changeLoading',false);
          if(res.body.status) {
            // console.log(res.body.response);
            commit('getPlans',res.body.data);
          } else {
          }
        },
        (err) => {
          commit('changeLoading',false);
          var message = err.body.message;
        }
      )
  },
  forgetPassword:({commit}, payload) => {
    commit('changeLoading',true);
    Vue.http.post('forget-password',payload)
      .then(
        (res)=>{
          commit('changeLoading',false);
          if(res.body.status){
            var message = res.body.message 
            commit('successMessage',message);
            commit('successTrue');
            commit('changeForgetPassword',false);
          }
        },  
        (err) => {
          commit('changeLoading',false);
          var message = err.body.message; 
          commit('errorMessage',message);
          commit('errorTrue');
        }
      )
  },
  resetForget:({commit},payload)=>{
    commit('changeLoading',true);
    Vue.http.post('reset-password/' + payload.token,payload)
      .then(
        (res)=>{
          commit('changeLoading',false);
          if(res.body.status){
            var message = res.body.message 
            // commit('successMessage',message);
            // commit('successTrue');
            swal({
              position: 'center',
              type: 'success',
              title: 'Your password has been changed',
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(()=>{
              router.push('/login');
            },1500)
          }
        },
        (err) => {
          commit('changeLoading',false);
          var message = err.body.message; 
          commit('errorMessage',message);
          commit('errorTrue');
        }
      )
  }

};

export default { state, getters, mutations, actions }
