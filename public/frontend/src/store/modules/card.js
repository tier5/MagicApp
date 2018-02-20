import Vue from 'vue';

const state = {
    isCardValid: false,
    userCards:[],
    cardModal:false
}
const getters = {
    isCardValid : state => state.isCardValid,
    userCards: state => state.userCards,
    cardModal:state => state.cardModal
}

const mutations = {
    changeIsCardValid:(state,payload)=>{
        state.isCardValid = payload 
    },
    getUserCards:(state,payload)=>{
        state.userCards = [...payload]
    },
    changeCardModal:(state,payload)=>{
        state.cardModal = payload;
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
                        commit('changeCardModal',false)
                        dispatch('getUserCards');

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
    deleteUserCard:({commit,dispatch},payload)=>{
        commit('changeLoading',true);
        Vue.http.delete('cards/'+ payload)
            .then(
                (res) => {
                    if(res.body.status) {
                        commit('changeLoading',false);
                        // commit('getUserCards',res.body.data)
                        var message = res.body.message;
                        commit('successMessage',message);
                        commit('successTrue');
                        dispatch('getUserCards');
                        
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
    }

}


export default { state, getters, mutations, actions }
