import pageInfo from 'pageApplyInfo/apply'

const state = {
  ...pageInfo,
  toast: {
    title: '',
    content: ''
  },
  fullPath: '',
  currentRouterInfo: {
    title: '',
    alone: ''
  }
}

const getters = {
  toast: state => state.toast,
  fullPath: state => state.fullPath,
  currentRouterInfo: state => state.currentRouterInfo
}

const actions = {
}

const mutations = {
  changeFullPath (state, item) {
    state.fullPath = item
  },
  changeRouterInfo (state, {title, along}) {
    state.currentRouterInfo = Object.assign({}, {title, along})
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}
