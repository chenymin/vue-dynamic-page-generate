import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import global from './modules/global'
import loanApply from './modules/loanApply'
import loanCenter from './modules/loanCenter'
import pay from './modules/pay'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  modules: {
    global,
    loanApply,
    loanCenter,
    pay
  },
  strict: debug
})
