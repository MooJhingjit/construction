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
const CreateContract = () => import('@Pages/Contract/create')
const FrontSite = () => import('@Pages/FrontSite')
const FrontSiteUpdate = () => import('@Pages/FrontSite/update-status')
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
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/contract/:key',
      name: 'Contract',
      component: Contract
    },
    {
      path: '/create-contract/:key',
      name: 'CreateContract',
      component: CreateContract
    },
    {
      path: '/front-site',
      name: 'FrontSite',
      component: FrontSite
    },
    {
      path: '/front-site/update/:key',
      name: 'FrontSiteUpdate',
      component: FrontSiteUpdate
    }
  ]
})
