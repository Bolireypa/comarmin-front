import { ServiceFactory } from '@/service/ServiceFactory'
const _vehicleService = ServiceFactory.get('VehiclesService')

export default {
  data() {
    return {
      vehicleData: {
        vehicleType: '',
        model: '',
        licensePlate: '',
        color: ''
      }
    }
  },
  methods: {
    async submit () {
      try {
        const newVehicle = await _vehicleService.create(this.vehicleData)
        console.log(newVehicle)
        this.vehiclesTable()
      } catch (error) {
        console.log(error)
      }
    },
    vehiclesTable () {
      this.$router.push({ name: 'Vehicles' })
    }
  }
}