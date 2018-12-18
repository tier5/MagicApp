import Vue from 'vue';

const state = {
  isLoginModalOpen: false,
  isChangePasswordModalOpen: false
}
const getters = {
  isLoginModalOpen  : state => state.isLoginModalOpen,
  isChangePasswordModalOpen : state => state.isChangePasswordModalOpen
}

const mutations = {
  changeIsLoginModalOpen: (state, payload)=>{
    state.isLoginModalOpen = payload
  },
  changeIsChangePasswordModalOpen:(state, payload)=>{
    state.isChangePasswordModalOpen = payload;
  }
}
const actions = {}


export default { state, getters, mutations, actions };
