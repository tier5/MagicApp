import Vue from 'vue';
import router from '../../router/index'
const state = {
  isSuccess : false,
  isError : false,
  successMessage:'',
  errorMessage:'',
  isAlertPopUpOpen: false,
  alertMessage:'',
  cookiePolicy: false
}
const getters = {
  isSuccess:state => state.isSuccess,
  isError: state => state.isError,
  successMessage: state => state.successMessage,
  errorMessage: state => state.errorMessage,
  isAlertPopUpOpen: state => state.isAlertPopUpOpen,
  alertMessage: state => state.alertMessage,
  cookiePolicy: state => state.cookiePolicy
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
  addAlertMessage: (state, payload)=> state.alertMessage = payload,
  acceptCookiePolicy:(state)=> {
    state.cookiePolicy = true
    localStorage.setItem('cookie_accepted_at', new Date());
  },
  checkCookiePolicy:(state)=>{
    let data = localStorage.getItem('cookie_accepted_at');
    if (data){
      state.cookiePolicy = true
    } else {
      state.cookiePolicy = false
    }
  }
}
const actions = {}


export default { state, getters, mutations, actions }
