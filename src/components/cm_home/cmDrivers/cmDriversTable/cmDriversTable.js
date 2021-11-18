import JsonExcel from 'vue-json-excel'
import { ServiceFactory } from '@/service/ServiceFactory'
const _driverService = ServiceFactory.get('DriversService')

export default {
  components: {
    'downloadExcel': JsonExcel
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'Nombre(s)', value: 'name', align: 'start' },
        { text: 'Apellido(s)', value: 'lastname' },
        { text: 'CI', value: 'ci' },
        { text: 'Celular', value: 'cellphone' },
        { text: 'Direccion', value: 'address' },
        { text: 'Opciones', value: 'options' }
      ],
      oreOutlets: [],
      drivers: [],
      excelReportName: 'Reporte de conductores ' + (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      json_fields_drivers: {
        'Nombre(s)': 'name',
        'Apellido(s)': 'lastname',
        'CI': 'ci',
        'Celular': 'cellphone',
        'Direccion': 'address',
      }
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        const driversResponse = await _driverService.index()
        this.drivers = driversResponse.drivers
      } catch (error) {
        console.log(error)
      }
    },
    newItem () {
      this.$router.push({ name: 'NewDriver' })
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