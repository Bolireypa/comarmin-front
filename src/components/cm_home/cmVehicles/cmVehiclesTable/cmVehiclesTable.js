import JsonExcel from 'vue-json-excel'
import { ServiceFactory } from '@/service/ServiceFactory'
const _vehicleService = ServiceFactory.get('VehiclesService')

export default {
  components: {
    'downloadExcel': JsonExcel
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'Tipo de vehiculo', value: 'vehicle_type', align: 'start' },
        { text: 'Modelo', value: 'model' },
        { text: 'Placa', value: 'license_plate' },
        { text: 'Color', value: 'color' },
        { text: 'Opciones', value: 'options' }
      ],
      vehicles: [],
      excelReportName: 'Reporte de vehículos ' + (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      json_fields_vehicles: {
        'Tipo de vehiculo': 'vehicle_type',
        'Modelo': 'model',
        'Placa': 'license_plate',
        'Color': 'color'
      }
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        const vehiclesResponse = await _vehicleService.index()
        console.log(vehiclesResponse)
        this.vehicles = vehiclesResponse.vehicles
      } catch (error) {
        console.log(error)
      }
    },
    newItem () {
      this.$router.push({ name: 'NewVehicle' })
      // this.$router.push({ name: 'Home' })
    },
    editItem (item) {
      alert('EDIT ' + item.name)
      console.log(item)
    },
    deleteItem (item) {
      alert('DELETE ' + item.name)
      console.log(item)
    }
  }
}