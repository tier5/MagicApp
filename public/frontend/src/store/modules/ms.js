import Vue from 'vue';

const state ={
  isShowScriptModal: false,
  magicScripts:[],
  viewScript:false,
  ms : {},
  domains:[]
}

const getters = {
  magicScripts:(state)=>{
    return state.magicScripts
  },
  isShowScriptModal:(state)=>{
    return state.isShowScriptModal
  },
  viewScript:state => state.viewScript,
  ms:state => state.ms,
};

const mutations = {
  getScripts:(state,payload)=>{
    const data = [...payload];
    const url = Vue.backend_url;
    for(let i = 0; i < data.length; i++) {
      data[i].scriptString = `<script src= '${url}/block-iframe.js' id="block-iframe" data-domain_api='${url}/api/block-iframe/${data[i]._id}'></script>`;
    }
    state.magicScripts = [...data];
  },
  addScript:(state,payload)=>{
    const data = {...payload};
    const url = Vue.backend_url;
    data.scriptString = `<script src= '${url}/block-iframe.js' id="block-iframe" data-domain_api='${url}/api/block-iframe/${data[i]._id}'></script>`;
    state.magicScripts = [...state.magicScripts,{...data}]
  },
  deleteScript:(state,payload)=>{

    const index = state.magicScripts.findIndex(ms => ms._id === payload);
    const oldScripts = [...state.magicScripts];
    oldScripts.splice(index, 1);
    state.magicScripts = oldScripts;
  },
  updateScript:(state,payload)=>{
    const index = state.magicScripts.findIndex(ms => ms._id === payload._id)
    const someScript = state.ms[index]
    const updatedScript = {
        ...someScript,
        ...payload
    }
    const magicScripts = [...state.ms]
    magicScripts[index] = updatedScript
    state.magicScripts = [...magicScripts]
  },
  ShowScriptCreationModal:(state)=>{
    state.isShowScriptModal = true ;
  },
  hideModal:(state)=>{
    state.isShowScriptModal = false ;
  },
  viewScript:(state,payload)=>{
    state.ms = payload
  },
  alterViewScript:(state,payload)=>{
    state.viewScript = payload
  },
  changeStatus:(state,payload)=>{
    const index = state.magicScripts.findIndex(ms => ms._id === payload._id)
    const someScript = state.ms[index]
    const updatedScript = {
      ...someScript,
      ...payload
    }
    const magicScripts = [...state.ms]
    magicScripts[index] = updatedScript
    state.magicScripts = [...magicScripts]
  }
}


const actions = {
  createNewScript:({commit}, payload)=>{
    commit('changeLoading',true);
    Vue.http.post('domains', payload)
      .then(
        (res) => {
          if(res.body.status) {
            if(res.body.domains){
              commit('getScripts',res.body.domains)
            }
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
  getScripts:({commit},payload)=>{
    Vue.http.get('domains', payload)
      .then(
        (res) => {
          if(res.body.status) {
            if(res.body.domains){
              commit('getScripts',res.body.domains)
            }
          } else {
            commit('changeLoading',false);
            commit('successMessage','Something went wrong. Please try after sometime.');
            commit('successTrue');
          }
        },
        (err) => {
          console.log(err.body.message);
        }
      )
  },
  deleteScript:({commit},payload)=>{
    commit('changeLoading',true);
    Vue.http.delete('domains/' + payload)
      .then(
        (res) => {
          commit('changeLoading',false);
          if(res.body.status) {
            commit('deleteScript',payload);
            let message = res.body.message;
            commit('successMessage',message);
            commit('successTrue');
          } else {
            console.log('payload',payload);
            commit('changeLoading',false);
            commit('successMessage','Something went wrong. Please try after sometime.');
            commit('successTrue');
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
  },
  updateScript:({commit},payload)=>{
    commit('changeLoading',true);
    Vue.http.put('domains/' + payload._id,payload)
      .then(
        (res) => {
          if(res.body.status) {
            commit('changeLoading',false);
            let message = res.body.message;
            commit('successMessage',message);
            commit('successTrue');
            commit('hideModal');
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
  },
  changeStatus:({commit},payload)=>{
    commit('changeLoading', true);
    Vue.http.get('domains-status/' + payload)
      .then( (res) => {
        if(res.body.status) {
          commit('changeLoading',false);
          let message = res.body.message;
          commit('successMessage',message);
          commit('successTrue');
          commit('hideModal');
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
