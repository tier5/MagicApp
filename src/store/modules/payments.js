import Vue from 'vue';

const state = {
  cards:[],
  isAddNewCardOpen: false,
  cancelMemberName: '',
  selectedPlanForHookedUser:''

}
const getters = {
    cards: state=> state.cards,
    isAddNewCardOpen : state => state.isAddNewCardOpen,
    cancelMemberName : state => state.cancelMemberName,
    selectedPlanForHookedUser : state => state.selectedPlanForHookedUser
}

const mutations = {
    getUserCards:(state,payload)=>{
        if (payload.length){
            state.cards = [...payload]
        } else {
            state.cards = []
        }
        
    },
    changeIsAddNewCardOpen:(state, payload)=>{
        state.isAddNewCardOpen = payload
    },
    changeCancelMemberName:(state, payload)=>{
        state.cancelMemberName = payload
    },
    changeSelectedPlanForHookedUser:(state, payload)=>{
      state.selectedPlanForHookedUser = payload
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
                commit('getUserCards',  [])
            }
          },
          (err) => {
            commit('changeLoading',false);
            commit('getUserCards',  [])
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
    },
    payUnpaidInvoices:({commit}, payload)=>{
        commit('changeLoading',true);
        Vue.http.put('stripe/invoices/pay',payload)
        .then(
          (res) => {
            commit('changeLoading',false);
            let message = err.body.message;
            commit('successMessage', message);
            commit('getUserCurrentSubscribtion');
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
