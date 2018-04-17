const state = {
  app: {
    auth: true,
    user: {}
  }
}

const mutations = {
  SET_AUTH (state, payload) {
    state.app.auth = payload
  },
  SET_USERDATA (state, payload) {
    state.app.user = payload
  }
}

const actions = {
  setAuth: ({ commit }, obj) => {
    commit('SET_AUTH', obj)
  },
  setUserData: ({ commit }, obj) => {
    commit('SET_USERDATA', obj)
  }
}

const getters = {
  userData: state => state.app.user,
  auth: state => state.app.auth
}

export default {
  state,
  getters,
  mutations,
  actions
}
