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
        number: null,
        section: '',
        quantity: null,
        weight: null,
        materialType: '',
        minerals: [],
        partnerId: '',
        companyId: '',
        driverId: '',
        vehicleId: '',
        userId: ''
      },
      companies: [],
      partners: [],
      drivers: [],
      vehicles: [],
      menu2: false,
      type: '',
      alert: false,
      alert2: false,
      alertMsg: ''
      // users: [],
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize () {
      // const authUser = store.state.authModule.data
      console.log(store.state.authModule.data.user.id)
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
      this.outletData.number = parseInt(this.outletData.number)
      this.outletData.minerals = 'Zn'
      this.outletData.userId = store.state.authModule.data.user.id
      console.log(this.outletData)
      try {
        const oor = await _oreOutletService.create(this.outletData)
        this.$router.push({ name: 'OreOutlet' })
        console.log(oor)
        this.alertMsg = 'Se guardo correctamente'
        setTimeout(() => this.alert2 = false, 4000)
        this.alert2 = true
      } catch (error) {
        console.log(error)
        this.alertMsg = 'Ocurrio un error al guardar la Salido de mineral'
        this.type = 'error'
        setTimeout(() => this.alert = false, 4000)
        this.alert = true
      }
    }
  }
}