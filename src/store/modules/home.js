import Vue from 'vue';

const state = {
  isLoginModalOpen: false
}
const getters = {
  isLoginModalOpen  : state => state.isLoginModalOpen,
}

const mutations = {
  changeIsLoginModalOpen: (state, payload)=>{
    state.isLoginModalOpen = payload
  }
}
const actions = {}


export default { state, getters, mutations, actions };
