import Vue from 'vue';

const state = {
  registerUser:{}
}
const getters = {
    registerUser: state=> state.registerUser,

}

const mutations = {
  changeRegisterUser : (state, payload)=>{
      state.registerUser = payload
  }
}
const actions = {
    validateEmail : ({commit}, payload) => {
        commit('changeLoading',true);
        Vue.http.post('register/validate-email', payload)
          .then(
            (res) => {
              commit('changeLoading',false);
              if(res.body.status) {
                // console.log(res.body.response);
                commit('changeRegisterUser', payload);
                commit('changeRoute', '/register-payment'); 
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
}


export default { state, getters, mutations, actions }
