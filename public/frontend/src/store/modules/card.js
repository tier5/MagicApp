import Vue from 'vue';

const state = {
    isCardValid: false
}
const getters = {
    isCardValid : state => state.isCardValid
}

const mutations = {
    changeIsCardValid:(state,payload)=>{
        state.isCardValid = payload 
    }
}
const actions = {}


export default { state, getters, mutations, actions }
