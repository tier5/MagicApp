import Vue from 'vue';

const state = {
    isLoading:false 
}
const getters = {
    isLoading :(state) =>{
        return state.isLoading
    }
}

const mutations = {
    changeLoading:(state,payload) =>{
        if(payload){
            state.isLoading = true
        }else{
            state.isLoading = false 
        }
        
    }
}
const actions = {}


export default { state, getters, mutations, actions }
