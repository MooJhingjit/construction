import Vue from 'vue'
import App from './App'
import store from './Store'
import router from './router'
import helper from '@Libraries/vue.helpers'
import Buefy from 'buefy'
import VeeValidate from 'vee-validate'
// import 'buefy/lib/buefy.css'
import moment from 'moment'
Vue.use(moment)
Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultDateFormatter: (dateVal) => {
    return moment(dateVal).format('YYYY/MM/DD')
  }
})

Vue.use(VeeValidate)

// Vue.use(VeeValidate, { inject: true })
// import Font from 'font-awesome/css/font-awesome.css'

Vue.mixin(helper)
Vue.config.productionTip = false
export const bus = new Vue()
// Vue.use(Font)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
