import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@Pages/Home')
const Login = () => import('@Pages/Login')
const Ordering = () => import('@Pages/Ordering')
const User = () => import('@Pages/User')

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ordering',
      name: 'Ordering',
      component: Ordering
    },
    {
      path: '/user/:key',
      name: 'User',
      component: User
    }
  ]
})
