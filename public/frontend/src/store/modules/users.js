import Vue from 'vue';

const state = {
    USERS : [],
    isLoading:false
};

const getters = {
    USERS: (state) => {
      return state.USERS;
    },
    isLoading :(state) =>{
        return state.isLoading
    }
};

const mutations = {
    getUsers:(state,payload)=>{
      state.USERS = [...payload]
    },
    changeLoading:(state,payload) =>{
        if(payload){
            state.isLoading = true
        }else{
            state.isLoading = false
        }
        
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
  