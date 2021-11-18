import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Home from '../components/cm_home'
import Login from '../components/cm_login'
import Dashboard from '../components/cm_home/cmDashboard'
import OreOutletTable from '../components/cm_home/cmOreOutlet/cmOreOutletTable'
import OreOutletForm from '../components/cm_home/cmOreOutlet/cmOreOutletForm'
import PartnersTable from '../components/cm_home/cmPartners/cmPartnersTable'
import PartnersForm from '../components/cm_home/cmPartners/cmPartnersForm'
import PartnerView from '../components/cm_home/cmPartners/cmPartnerView'
import CompaniesTable from '../components/cm_home/cmCompanies/cmCompaniesTable'
import CompaniesForm from '../components/cm_home/cmCompanies/cmCompaniesForm'
import VehiclesTable from '../components/cm_home/cmVehicles/cmVehiclesTable'
import VehiclesForm from '../components/cm_home/cmVehicles/cmVehiclesForm'
import DriversTable from '../components/cm_home/cmDrivers/cmDriversTable'
import DriversForm from '../components/cm_home/cmDrivers/cmDriversForm'
import AdminTable from '../components/cm_home/cmAdmins/cmAdminTable'
import AdminForm from '../components/cm_home/cmAdmins/cmAdminForm'
import Reports from '../components/cm_home/cmReports'
import Calculator from '../components/cm_home/cmCalculator'

Vue.use(VueRouter)

const verifyAuth = (to, from, next) => {
  const authUser = store.state.authModule.data
  if (authUser && authUser.user.token) {
    next()
    return
  }
  next({ name: 'Login' })
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/app',
    name: 'Home',
    component: Home,
    redirect: { name: 'Dashboard' },
    beforeEnter: verifyAuth,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'tornaguia',
        name: 'OreOutlet',
        component: OreOutletTable
      },
      {
        path: 'tornaguia/agregar',
        name: 'NewOreOutlet',
        component: OreOutletForm
      },
      {
        path: 'socio',
        name: 'Partners',
        component: PartnersTable
      },
      {
        path: 'socio/agregar',
        name: 'NewPartner',
        component: PartnersForm
      },
      {
        path: 'socio/ver',
        name: 'ViewPartner',
        component: PartnerView
      },
      {
        path: 'empresa',
        name: 'Companies',
        component: CompaniesTable
      },
      {
        path: 'empresa/agregar',
        name: 'NewCompany',
        component: CompaniesForm
      },
      {
        path: 'transporte',
        name: 'Vehicles',
        component: VehiclesTable
      },
      {
        path: 'transporte/agregar',
        name: 'NewVehicle',
        component: VehiclesForm
      },
      {
        path: 'conductor',
        name: 'Drivers',
        component: DriversTable
      },
      {
        path: 'conductor/agregar',
        name: 'NewDriver',
        component: DriversForm
      },
      {
        path: 'administrador',
        name: 'Admin',
        component: AdminTable
      },
      {
        path: 'administrador/agregar',
        name: 'NewAdmin',
        component: AdminForm
      },
      {
        path: 'reportes',
        name: 'Reports',
        component: Reports
      },
      {
        path: 'calculadora',
        name: 'Calculator',
        component: Calculator
      }
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
