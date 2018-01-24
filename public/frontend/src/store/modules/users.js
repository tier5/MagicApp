import Vue from 'vue';

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
    
              }
            },
            (err) => {
              console.log(err.body.message);
            }
          )
      }
    
  }
  
  
  export default { state, getters, mutations, actions }
  