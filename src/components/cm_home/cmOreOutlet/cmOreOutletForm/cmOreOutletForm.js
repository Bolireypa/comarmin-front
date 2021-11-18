import store from '../../../../store'
import { ServiceFactory } from '@/service/ServiceFactory'
const _oreOutletService = ServiceFactory.get('OreOutletsService')
// const _userService = ServiceFactory.get('UsersService')
const _partnerService = ServiceFactory.get('PartnersService')
const _vehicleService = ServiceFactory.get('VehiclesService')
const _driverService = ServiceFactory.get('DriversService')
const _companyService = ServiceFactory.get('CompaniesService')

export default {
  data() {
    return {
      outletData: {
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        number: Math.floor(Math.random() * 101),
        section: '',
        quantity: null,
        weight: null,
        materialType: '',
        minerals: [],
        partnerId: '',
        companyId: '',
        driverId: '',
        vehicleId: '',
        userId: '64ebf7a7-21c2-4e65-95a0-b3cb72afc7e2'
      },
      companies: [],
      partners: [],
      drivers: [],
      vehicles: []
      // users: [],
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize () {
      console.log(store)
      try {
        // pr = partner response
        const pr = await _partnerService.index()
        this.partners = pr.partners
        // cr = company response
        const cr = await _companyService.index()
        this.companies = cr.companies
        // dr = driver response
        const dr = await _driverService.index()
        this.drivers = dr.drivers
        // vr = vehicle response
        const vr = await _vehicleService.index()
        this.vehicles = vr.vehicles
        // // ur = user response
        // const ur = await _userService.index()
        // this.users = 
      } catch (error) {
        console.log(error)
      }
    },
    async submit () {
      this.outletData.quantity = parseInt(this.outletData.quantity)
      this.outletData.weight = parseInt(this.outletData.weight)
      this.outletData.minerals = 'Zn'
      console.log(this.outletData)
      try {
        const oor = await _oreOutletService.create(this.outletData)
        this.$router.push({ name: 'OreOutlet' })
        console.log(oor)
      } catch (error) {
        console.log(error)
      }
    }
  }
}