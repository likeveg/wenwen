import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userid: '',
    level: '',
    sex: '',
    chief: ''
  }
})

export default store
