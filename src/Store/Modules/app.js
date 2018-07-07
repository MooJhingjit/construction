const state = {
  app: {
    auth: true,
    user: {},
    notification: {
      ordering: null
    }
  }
}

const mutations = {
  SET_AUTH (state, payload) {
    state.app.auth = payload
  },
  SET_USERDATA (state, payload) {
    state.app.user = payload
  },
  SET_ORDERINGNOTIFICATION (state, payload) {
    state.app.notification.ordering = payload
  }
}

const actions = {
  setAuth: ({ commit }, obj) => {
    commit('SET_AUTH', obj)
  },
  setUserData: ({ commit }, obj) => {
    commit('SET_USERDATA', obj)
  },
  setOrderingNotification: ({ commit }, obj) => {
    commit('SET_ORDERINGNOTIFICATION', obj)
  }
}

const getters = {
  userData: state => state.app.user,
  auth: state => state.app.auth,
  orderingData: state => state.app.notification.ordering
}

export default {
  state,
  getters,
  mutations,
  actions
}
