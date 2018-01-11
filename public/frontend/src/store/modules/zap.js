import Vue from 'vue';

const state ={
  zapierAuth:{
    token :'',
    tokenName:''
  },
  isShowModal: false,
  zaps:[],

}

const getters = {
  zapierAuthToken:(state)=>{
    return state.zapierAuth
  },
  zaps:(state)=>{
    return state.zaps
  },
  isShowModal:(state)=>{
    return state.isShowModal
  }
};

const mutations = {
  zapierAuthToken:(state,payload)=> {
    state.zapierAuth = {...payload}
  },
  getZap:(state,payload)=>{
    state.zaps = [...payload]
  },
  addZap:(state,payload)=>{
    state.zaps = [...state.zaps,{...payload}]
  },
  deleteZap:(state,payload)=>{

    const index = state.zaps.findIndex(zap => zap.id === payload);
    const oldZaps = [...state.zaps];
    oldZaps.splice(index, 1);
    state.zaps = oldZaps;
  },
  showModal:(state)=>{
    state.isShowModal = true ;
  },
  hideModal:(state)=>{
    state.isShowModal = false ;
  }

}


const actions = {
  createNewZap:({commit}, payload)=>{
    Vue.http.post('create-user-zap', payload)
      .then(
        (res) => {
          if(res.body.status) {
            commit('addZap',res.body.response[0]);
            commit('hideModal');
            let message = res.body.message;
            commit('successMessage',message);
            commit('successTrue');
          } else {

          }
        },
        (err) => {
          let message = err.body.message
          commit('errorMessage',message);
          commit('errorTrue');
          console.log(err.body);
        }
      )
  },
  createZapAuthToken:({commit},payload)=>{
    Vue.http.post('create-zapier-token', payload)
      .then(
        (res) => {
          if(res.body.status) {
             //console.log(res.body.response);
            commit('zapierAuthToken',res.body.response)
          } else {

          }
        },
        (err) => {
          console.log(err.body.message);
        }
      )
  },
  getZap:({commit},payload)=>{
    Vue.http.post('user-zap-list', payload)
      .then(
        (res) => {
          if(res.body.status) {

            commit('getZap',res.body.response)
          } else {

          }
        },
        (err) => {
          console.log(err.body.message);
        }
      )
  },
  deleteZap:({commit},payload)=>{
    Vue.http.post('delete-user-zap?zapId=' + payload)
      .then(
        (res) => {
          if(res.body.status) {
            commit('deleteZap',payload);
            let message = res.body.message;
            commit('successMessage',message);
            commit('successTrue');
          } else {

          }
        },
        (err) => {
          let message = err.body.message;
          commit('errorMessage',message);
          commit('errorTrue');
          console.log(err.body);
        }
      )
  }
}


export default { state, getters, mutations, actions }
