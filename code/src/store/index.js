import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    map:null
  },
  mutations: {
    changLegendCurrentColors(state, payload) {
        state.legendCurrentColors = payload;
    },
    changeLayer(state,payload){
        state.Layer = payload;
    },
  },
  actions: {
    
  },
  modules: {
  }
})
