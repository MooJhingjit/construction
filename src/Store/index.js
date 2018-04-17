import Vue from 'vue'
import Vuex from 'vuex'

import App from './Modules/app'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    App
  },
  strict: debug
})
