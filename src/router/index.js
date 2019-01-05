import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@Pages/Home')
const Login = () => import('@Pages/Login')
const Ordering = () => import('@Pages/Ordering')
const OrderingDetail = () => import('@Pages/Ordering/detail')
// const OrderingExtra = () => import('@Pages/Ordering/extra')
const OrderingGroup = () => import('@Pages/Ordering/group')
const Users = () => import('@Pages/User')
const Authority = () => import('@Pages/Authority')
const Project = () => import('@Pages/Project')
const Contract = () => import('@Pages/Contract')
const CreateContract = () => import('@Pages/Contract/create')
const FrontSite = () => import('@Pages/FrontSite')
const FrontSiteUpdate = () => import('@Pages/FrontSite/update')
const FrontSiteVerify = () => import('@Pages/FrontSite/verify')
const Losing = () => import('@Pages/Losing')
const LosingDetail = () => import('@Pages/Losing/detail')
const Material = () => import('@Pages/Material')
const Store = () => import('@Pages/Store')
const AddMaterial = () => import('@Pages/Store/add')
const House = () => import('@Pages/House')
const Workorder = () => import('@Pages/Workorder')
const EditWorkorder = () => import('@Pages/Workorder/edit')
const Profile = () => import('@Pages/Profile')
const PayingPeriod = () => import('@Pages/PayingPeriod')
const Worksheet = () => import('@Pages/PayingPeriod/worksheet')
const PayingSummary = () => import('@Pages/PayingPeriod/summary')
const Approve = () => import('@Pages/PayingPeriod/approve')
const Technician = () => import('@Pages/Technician')
const WorkGroup = () => import('@Pages/WorkGroup')
const WorkGroupDetails = () => import('@Pages/WorkGroup/detail')
const ExtraJob = () => import('@Pages/PayingPeriod/extra-job')
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
    // {
    //   path: '/project',
    //   name: 'Project',
    //   component: Project
    // },
    {
      path: '/project/:key',
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
      path: '/front-site/verify/:key',
      name: 'FrontSiteVerify',
      component: FrontSiteVerify
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
      path: '/store/:key',
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
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/paying-period',
      name: 'PayingPeriod',
      component: PayingPeriod
    },
    {
      path: '/paying-period/worksheet',
      name: 'Worksheet',
      component: Worksheet
    },
    {
      path: '/paying-period/summary',
      name: 'PayingSummary',
      component: PayingSummary
    },
    {
      path: '/paying-period/approve',
      name: 'Approve',
      component: Approve
    },
    {
      path: '/technician',
      name: 'Technician',
      component: Technician
    },
    {
      path: '/work-group',
      name: 'WorkGroup',
      component: WorkGroup
    },
    {
      path: '/work-group/:key',
      name: 'WorkGroupDetails',
      component: WorkGroupDetails
    },
    {
      path: '/paying-period/extra-job',
      name: 'ExtraJob',
      component: ExtraJob
    }
  ]
})
