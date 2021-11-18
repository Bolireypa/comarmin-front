import { ServiceFactory } from '@/service/ServiceFactory'
const _userService = ServiceFactory.get('UsersService')

export default {
  data() {
    return {
      userData: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        birthDate: '',
        cellphone: ''
      }
    }
  },
  methods: {
    async submit () {
      try {
        this.userData.cellphone = parseInt(this.userData.cellphone)
        const userResponse = await _userService.create(this.userData)
        console.log(userResponse)
        this.adminTable()
      } catch (error) {
        console.log(error)
      }
    },
    adminTable () {
      this.$router.push({ name: 'Admin' })
    }
  }
}