import Vue from 'vue';

const state ={
  tutorials:[],
  createAndUpdateModal:false,
  editTutorial: {}, // when edit is click whole object come to this object
  
}

const getters = {
    tutorials:(state)=> state.tutorials,
    createAndUpdateModal: state => state.createAndUpdateModal,
    editTutorial: state => state.editTutorial
    
};

const mutations = {
  getTutorials:(state,payload)=>{
    const data = payload;
    state.tutorials = data
  },
  addTutorials:(state,payload)=>{
    const data = {...payload};
    state.tutorials = [...state.tutorials,{...data}]
  },
  deleteTutorial:(state, payload)=> {
    state.tutorials = state.tutorials.filter(o => o._id !== payload);
  },
  changeCreateAndUpdateModal:(state, payload)=> {
    state.createAndUpdateModal = payload;
  },
  changeEditTutorial:(state, payload) => {
    state.editTutorial = payload;
  },
  updateTutorial:(state,payload) => {
   
    const index = state.tutorials.findIndex(o => o._id === payload._id);
    const someTutorial = state.tutorials[index]
    const updatedTutorial = {
        ...someTutorial,
        ...payload
    }
    const tutorials = [...state.tutorials]
    tutorials[index] = updatedTutorial
    state.tutorials = [...tutorials]
  },

}


const actions = {
    getTutorials:({commit},payload)=>{
        commit('changeLoading',true);
        Vue.http.get('tutorials', payload)
          .then(
            (res) => {
              if(res.body.status) {
                if(res.body.data){
                  commit('getTutorials',res.body.data);
                  commit('changeLoading',false);
                }
              } else {
                  commit('changeLoading',false);
              }
            },
            (err) => {
                console.log(err);
                commit('changeLoading',false);
            }
          )
    },
    createTutorial:({commit}, payload)=>{
      commit('changeLoading',true);
      Vue.http.post('tutorials', payload)
        .then(
          (res) => {
            if(res.body.status) {
              setTimeout(()=>{
                commit('changeCreateAndUpdateModal', false);
              }, 1500)
              if (res.body.data){
                commit('addTutorials',res.body.data);
              }
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
          }
        )
    },
    deleteTutorial:({commit,dispatch},payload)=> {
        commit('changeLoading',true);
        Vue.http.delete('tutorials/' + payload)
          .then(
            (res) => {
                commit('changeLoading',false);

                if(res.body.status) {
                    commit('deleteTutorial', payload)
                    let message = res.body.message;
                    commit('successMessage',message);
                    commit('successTrue');
                } else {
                    
                }
            },
            (err) => {
                commit('changeLoading',true);
                let message = err.body.message;
                commit('errorMessage',message);
                commit('errorTrue');
            }
          )
    },
    updateTutorial:({commit},payload)=>{
      commit('changeLoading',true);
      Vue.http.put('tutorials/' + payload._id,payload)
        .then(
          (res) => {
            if(res.body.status) {
              commit('changeLoading',false);
              commit('updateTutorial', payload);
              setTimeout(()=>{
                commit('changeCreateAndUpdateModal', false);
              }, 1500)
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
          }
        )
    }
    
}


export default { state, getters, mutations, actions }
