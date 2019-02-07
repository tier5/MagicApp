import Vue from 'vue';

const state = {
  isLoginModalOpen: false,
  isChangePasswordModalOpen: false,
  overallStats: {
    totalUsers: 0,
    totalZaps: 0,
    totalZapierTriggerCount: 0,
    totalPageViewCount: 0
  }
}
const getters = {
  isLoginModalOpen  : state => state.isLoginModalOpen,
  isChangePasswordModalOpen : state => state.isChangePasswordModalOpen,
  overallStats: state => state.overallStats
}

const mutations = {
  changeIsLoginModalOpen: (state, payload)=>{
    state.isLoginModalOpen = payload
  },
  changeIsChangePasswordModalOpen:(state, payload)=>{
    state.isChangePasswordModalOpen = payload;
  },
  changeOverallStats:(state, payload)=>{
    state.overallStats = {
      totalUsers: payload.totalUsers,
      totalZaps: payload.totalZaps,
      totalZapierTriggerCount: payload.totalZapierTriggerCount,
      totalPageViewCount: payload.totalPageViewCount
    }
  }

}
const actions = {
  getStats:({commit},payload)=>{
    Vue.http.get('stats', {})
      .then(
        (res) => {
          if(res.body.status) {
            if(res.body.data){
              commit('changeOverallStats',res.body.data)
            }
          } else {

          }
        },
        (err) => {
          console.log(err.body.message);
        }
      )
  },
}


export default { state, getters, mutations, actions };
