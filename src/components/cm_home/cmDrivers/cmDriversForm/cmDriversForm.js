import { ServiceFactory } from '@/service/ServiceFactory'
const _driverService = ServiceFactory.get('DriversService')

export default {
  data() {
    return {
      driverData: {
        name: '',
        lastname: '',
        ci: '',
        address: '',
        cellphone: null
      }
    }
  },
  methods: {
    async submit () {
      try {
        this.driverData.cellphone = parseInt(this.driverData.cellphone)
        const driverResponse = await _driverService.create(this.driverData)
        console.log(driverResponse)
        this.driverTable()
      } catch (error) {
        console.log(error)
      }
    },
    driverTable () {
      this.$router.push({ name: 'Drivers' })
    }
  }
}