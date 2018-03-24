import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@Pages/Home')
const Login = () => import('@Pages/Login')
const Ordering = () => import('@Pages/Ordering')
const OrderingDetail = () => import('@Pages/Ordering/detail')
const User = () => import('@Pages/User')
const Authority = () => import('@Pages/Authority')
const Project = () => import('@Pages/Project')
const Contract = () => import('@Pages/Contract')
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
      path: '/ordering/:key',
      name: 'OrderingDetail',
      component: OrderingDetail
    },
    {
      path: '/user/:key',
      name: 'User',
      component: User
    },
    {
      path: '/authority/:key',
      name: 'Authority',
      component: Authority
    },
    {
      path: '/project/:key',
      name: 'Project',
      component: Project
    },
    {
      path: '/contract/:key',
      name: 'Contract',
      component: Contract
    }
  ]
})
