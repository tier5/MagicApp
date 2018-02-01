import Vue from 'vue';

const state ={
  zapierAuth:{
    token :'',
    tokenName:''
  },
  isShowModal: false,
  zaps:[],
  viewZap:false,
  zap : {}

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
  },
  viewZap:state => state.viewZap,
  zap:state => state.zap
};

const mutations = {
  zapierAuthToken:(state,payload)=> {
    state.zapierAuth = {...payload}
  },
  getZap:(state,payload)=>{
    const data = [...payload];
    for(let i = 0; i < data.length; i++) {
      data[i].scriptString = `<script src= 'https://amagiczap.com/mscript/build.js' id ='magic_app_script' data-script-id='${data[i]._id}'>`;
    }
    state.zaps = [...data]
  },
  addZap:(state,payload)=>{
    const data = {...payload};
    data.scriptString = `<script src= 'https://amagiczap.com/mscript/build.js' id ='magic_app_script' data-script-id='${data._id}'>`;
    state.zaps = [...state.zaps,{...data}]
  },
  deleteZap:(state,payload)=>{

    const index = state.zaps.findIndex(zap => zap._id === payload);
    const oldZaps = [...state.zaps];
    oldZaps.splice(index, 1);
    state.zaps = oldZaps;
  },
  updateZap:(state,payload)=>{
    const index = state.zaps.findIndex(zap => zap._id === payload._id)
    const someZap = state.zap[index]
    const updatedZap = {
        ...someZap,
        ...payload
    }
    const zaps = [...state.zap]
    zaps[index] = updatedZap
    state.zaps = [...zaps]
  },
  showModal:(state)=>{
    state.isShowModal = true ;
  },
  hideModal:(state)=>{
    state.isShowModal = false ;
  },
  viewZap:(state,payload)=>{
    state.zap = {...payload}
  },
  alterViewZap:(state,payload)=>{
    state.viewZap = payload
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
  },
  updateZap:({commit},payload)=>{
    commit('changeLoading',true);
    Vue.http.put('zaps/' + payload._id,payload)
      .then(
        (res) => {
          if(res.body.status) {
            commit('changeLoading',false);
            //commit('updateZap',payload);
            let message = res.body.message;
            commit('successMessage',message);
            commit('successTrue');
          } else {
            commit('changeLoading',false);
          }
        },
        (err) => {
          commit('changeLoading',false);
          let message = err.body.message;
          commit('errorMessage',message);
          commit('errorTrue');
          console.log(err.body);
        }
      )
  }
}


export default { state, getters, mutations, actions }
