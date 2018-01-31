import Vue from 'vue';

const state = {
  isSuccess : false,
  isError : false,
  successMessage:'',
  errorMessage:''
}
const getters = {
  isSuccess:state => state.isSuccess,
  isError: state => state.isError,
  successMessage: state => state.successMessage,
  errorMessage: state => state.errorMessage
}

const mutations = {
  successTrue : state => {
    state.isSuccess = true
    setTimeout(()=>{
      state.isSuccess = false
      state.successMessage = ''
    },1000)
  },
  errorTrue : state => {
    state.isError = true
    setTimeout(()=>{
      state.isError = false
      state.errorMessage = ''
    },1000)

  },
  successMessage:(state,payload) => state.successMessage = payload ,
  errorMessage:(state,payload) => state.errorMessage = payload
}
const actions = {}


export default { state, getters, mutations, actions }
