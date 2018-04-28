import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@Pages/Home')
const Login = () => import('@Pages/Login')
const Ordering = () => import('@Pages/Ordering')
const OrderingDetail = () => import('@Pages/Ordering/detail')
const OrderingExtra = () => import('@Pages/Ordering/extra')
const OrderingGroup = () => import('@Pages/Ordering/group')
const Users = () => import('@Pages/User')
const Authority = () => import('@Pages/Authority')
const Project = () => import('@Pages/Project')
const Contract = () => import('@Pages/Contract')
const CreateContract = () => import('@Pages/Contract/create')
const FrontSite = () => import('@Pages/FrontSite')
const FrontSiteUpdate = () => import('@Pages/FrontSite/update-status')
const Losing = () => import('@Pages/Losing')
const LosingDetail = () => import('@Pages/Losing/detail')
const Material = () => import('@Pages/Material')
const AddMaterial = () => import('@Pages/Material/add')
const Store = () => import('@Pages/Store')
const House = () => import('@Pages/House/template')
const Workorder = () => import('@Pages/Workorder')
const EditWorkorder = () => import('@Pages/Workorder/edit')

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
      path: '/ordering/extra',
      name: 'OrderingExtra',
      component: OrderingExtra
    },
    {
      path: '/ordering/group',
      name: 'OrderingGroup',
      component: OrderingGroup
    },
    {
      path: '/ordering/:key',
      name: 'OrderingDetail',
      component: OrderingDetail
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
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
      path: '/losing/detail',
      name: 'LosingDetail',
      component: LosingDetail
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
    },
    {
      path: '/work-order',
      name: 'Workorder',
      component: Workorder
    },
    {
      path: '/work-order/edit/:key',
      name: 'EditWorkorder',
      component: EditWorkorder
    }
  ]
})
