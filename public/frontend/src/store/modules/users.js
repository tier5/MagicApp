import Vue from 'vue';
import router from '../../router';

const state = {
    USERS : [],
    
};

const getters = {
    USERS: (state) => {
      return state.USERS;
    }
};

const mutations = {
    getUsers:(state,payload)=>{
      state.USERS = [...payload]
    }
  }
  
  
  const actions = {
    getUsers:({commit},payload)=>{
      Vue.http.get('users')
        .then(
          (res) => {
            if(res.body.status) {
              commit('getUsers',res.body.data)
            } else {
  
            }
          },
          (err) => {
            console.log(err.body.message);
          }
        )
    },

    updateUsers:({commit},payload)=>{
        commit('changeLoading',true);
        Vue.http.put('users/' + payload._id,payload)
          .then(
            (res) => {
              if(res.body.status) {
                commit('changeLoading',false);
                var message = res.body.message;
                commit('successMessage',message);
                commit('successTrue');
              } else {
                commit('changeLoading',false);
              }
            },
            (err) => {
              console.log(err.body.message);
              commit('changeLoading',false);
              var message = err.body.message;
              commit('errorMessage',message);
              commit('errorTrue');
            }
          )
    },
    updateSubscription : ({commit},payload)=>{
      commit('changeLoading',true);
      Vue.http.put('subscriptions',payload)
          .then(
            (res) => {
              if(res.body.status) {
                commit('changeLoading',false);
                var message = res.body.message;
                commit('successMessage',message);
                commit('successTrue');
                commit('userSignIn',res.body);
                router.push('/magic');
                
              } else {
                commit('changeLoading',false);
              }
            },
            (err) => {
              console.log(err.body.message);
              commit('changeLoading',false);
              var message = err.body.message;
              commit('errorMessage',message);
              commit('errorTrue');
            }
          )
    }

    
  }
  
  
  export default { state, getters, mutations, actions }
  