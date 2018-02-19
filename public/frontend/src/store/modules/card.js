import Vue from 'vue';

const state = {
    isCardValid: false,
    userCards:[]
}
const getters = {
    isCardValid : state => state.isCardValid,
    userCards: state => state.userCards
}

const mutations = {
    changeIsCardValid:(state,payload)=>{
        state.isCardValid = payload 
    },
    getUserCards:(state,payload)=>{
        state.userCards = [...payload]
    }
}
const actions = {
    getUserCards:({commit},payload)=>{
        commit('changeLoading',true);
        Vue.http.get('cards')
        .then(
          (res) => {
            if(res.body.status) {
                commit('changeLoading',false);
                //console.log(res.body.data);
                commit('getUserCards',res.body.data)
            } else {
  
            }
          },
          (err) => {
            console.log(err.body.message);
            commit('changeLoading',false);
          }
        )
    }
}


export default { state, getters, mutations, actions }
