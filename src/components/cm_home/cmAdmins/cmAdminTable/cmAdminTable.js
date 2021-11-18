// import { ServiceFactory } from '../../../../service/ServiceFactory'
import JsonExcel from 'vue-json-excel'
import { ServiceFactory } from '@/service/ServiceFactory'
const _userService = ServiceFactory.get('UsersService')

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
        { text: 'Correo', value: 'email' },
        { text: 'Fecha de nacimiento', value: 'birthDate' },
        { text: 'Celular', value: 'cellphone' },
        { text: 'Opciones', value: 'options' }
        // ,
        // {
        //   text: 'Dessert',
        //   align: 'start',
        //   sortable: false,
        //   value: 'name'
        // },
        // { text: 'Calories', value: 'calories' },
        // { text: 'Fat', value: 'fat' },
        // { text: 'Carbs', value: 'carbs' },
        // { text: 'Protein', value: 'protein' },
        // { text: 'Iron', value: 'iron' },
        // { text: 'Opciones', value: 'options' }
      ],
      oreOutlets: [],
      users: [],
      excelReportName: 'Reporte de usuaios ' + (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      json_fields_users: {
        'Nombre(s)': 'name',
        'Apellido(s)': 'lastname',
        'Correo': 'email',
        'Celular': 'cellphone',
        'Fecha de nacimiento': 'birthDate'
      }
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        const usersResponse = await _userService.index()
        this.users = usersResponse.users
        console.log(usersResponse)
      } catch (error) {
        console.log(error)
      }
    },
    newItem () {
      this.$router.push({ name: 'NewAdmin' })
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