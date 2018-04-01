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
const Losing = () => import('@Pages/Losing')
const LosingOrdering = () => import('@Pages/Losing/ordering')
const Material = () => import('@Pages/Material')
const AddMaterial = () => import('@Pages/Material/add')
const Store = () => import('@Pages/Store')
const House = () => import('@Pages/House/template')
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
    },
    {
      path: '/losing',
      name: 'Losing',
      component: Losing
    },
    {
      path: '/losing/order',
      name: 'LosingOrdering',
      component: LosingOrdering
    },
    {
      path: '/material/add',
      name: 'AddMaterial',
      component: AddMaterial
    },
    {
      path: '/material/:key',
      name: 'Material',
      component: Material
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/house-template',
      name: 'House',
      component: House
    }
  ]
})
