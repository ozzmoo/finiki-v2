import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/login'
import Reg from './modules/reg'
import Groups from './modules/groups'
import Students from './modules/students'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Login,
    Reg,
    Groups,
    Students
  }
})