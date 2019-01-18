import Vue from 'vue';

const state = {
  cards:[],
  isAddNewCardOpen: false,
  cancelMemberName: ''

}
const getters = {
    cards: state=> state.cards,
    isAddNewCardOpen : state => state.isAddNewCardOpen,
    cancelMemberName : state => state.cancelMemberName
}

const mutations = {
    getUserCards:(state,payload)=>{
        state.cards = [...payload]
    },
    changeIsAddNewCardOpen:(state, payload)=>{
        state.isAddNewCardOpen = payload
    },
    changeCancelMemberName:(state, payload)=>{
        state.cancelMemberName = payload
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
    },
    addUserCard:({commit,dispatch},payload)=>{
        commit('changeLoading',true);
        Vue.http.post('cards',payload)
            .then(
                (res) => {
                    if(res.body.status) {
                        commit('changeLoading',false);
                        // commit('getUserCards',res.body.data)
                        var message = res.body.message;
                        commit('successMessage',message);
                        commit('successTrue');
                        dispatch('getUserCards');
                        commit('changeIsAddNewCardOpen', false);

                    } else {
        
                    }
                },
                (err) => {
                    console.log(err.body.message);
                    var message = err.body.message;
                    commit('changeLoading',false);
                    commit('errorMessage',message);
                    commit('errorTrue');
                }
            )
    },
    cancelMembership:({commit}, payload)=>{
        commit('changeLoading',true);
        Vue.http.delete('cancel-membership',payload)
        .then(
          (res) => {
            commit('changeLoading',false);
            if(res.body.status) {
                commit('changeRoute', '/magic/cancel-confirm');
                commit('changeCancelMemberName', res.body.data.name);
                setTimeout(()=>{
                    commit('userSignOut');
                },6000)
            }
          },
          (err) => {
            //console.log(err.body.message);
            let message = err.body.message
        
            commit('errorMessage',message);
            commit('errorTrue');
            commit('changeLoading',false);
          }
        )
    }
}


export default { state, getters, mutations, actions }
