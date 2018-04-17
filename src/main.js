import Vue from 'vue'
import App from './App'
import store from './Store'
import router from './router'
import helper from '@Libraries/vue.helpers'
// import Font from 'font-awesome/css/font-awesome.css'

Vue.mixin(helper)
Vue.config.productionTip = false
// Vue.use(Font)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
