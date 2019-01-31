import Vue from 'vue';
import router from '../../router/index'
const state = {
  isSuccess : false,
  isError : false,
  successMessage:'',
  errorMessage:'',
  isAlertPopUpOpen: false,
  alertMessage:''
}
const getters = {
  isSuccess:state => state.isSuccess,
  isError: state => state.isError,
  successMessage: state => state.successMessage,
  errorMessage: state => state.errorMessage,
  isAlertPopUpOpen: state => state.isAlertPopUpOpen,
  alertMessage: state => state.alertMessage
}

const mutations = {
  successTrue : state => {
    state.isSuccess = true
    setTimeout(()=>{
      state.isSuccess = false
      state.successMessage = ''
    },2000)
  },
  errorTrue : state => {
    state.isError = true
    setTimeout(()=>{
      state.isError = false
      state.errorMessage = ''
    },2000)

  },
  changeRoute:(state, payload)=>{
    router.push(payload);
  },
  successMessage:(state,payload) => state.successMessage = payload ,
  errorMessage:(state,payload) => state.errorMessage = payload,
  changeIsAlertPopUpOpen : (state, payload)=> state.isAlertPopUpOpen = payload,
  addAlertMessage: (state, payload)=> state.alertMessage = payload
}
const actions = {}


export default { state, getters, mutations, actions }
