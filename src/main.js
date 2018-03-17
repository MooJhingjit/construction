import Vue from 'vue'
import App from './App'
import router from './router'
import helper from '@Libraries/vue.helpers'
import 'bulma/bulma.sass'

Vue.mixin(helper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
