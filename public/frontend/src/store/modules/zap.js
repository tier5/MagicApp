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

    const index = state.zaps.findIndex(zap => zap._id === payload);
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
    commit('changeLoading',true);
    Vue.http.post('zaps', payload)
      .then(
        (res) => {
          if(res.body.status) {
            commit('addZap',res.body.zap);
            commit('hideModal');
            let message = res.body.message;
            commit('changeLoading',false);
            commit('successMessage',message);
            commit('successTrue');

          } else {
            commit('changeLoading',false);
          }
        },
        (err) => {
          let message = err.body.message
          commit('errorMessage',message);
          commit('errorTrue');
          commit('changeLoading',false);
          console.log(err.body);
        }
      )
  },
  createZapAuthToken:({commit},payload)=>{
    Vue.http.post('zaps', payload)
      .then(
        (res) => {
          if(res.body.status) {
            commit('zapierAuthToken',res.body.response)
          } else {
            console.log(err.body.message);
          }
        },
        (err) => {
          console.log(err.body.message);
        }
      )
  },
  getZap:({commit},payload)=>{
    Vue.http.get('zaps', payload)
      .then(
        (res) => {
          if(res.body.status) {
            commit('getZap',res.body.zaps)
          } else {

          }
        },
        (err) => {
          console.log(err.body.message);
        }
      )
  },
  deleteZap:({commit},payload)=>{
    Vue.http.delete('zaps/' + payload)
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
