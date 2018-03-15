import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@Pages/Home')

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
