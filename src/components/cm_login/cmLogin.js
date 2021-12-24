// import Axios from '../../api/instance.api'
import { mapActions } from 'vuex'
import { ServiceFactory } from '../../service/ServiceFactory'
// const _userServ = ServiceFactory.get('UsersService')
const _loginService = ServiceFactory.get('AuthService')

export default {
  data() {
    return {
      payload: {
        email: '',
        password: ''
      },
      loading: false,
      show1: false,
      alert: false,
      alertMsg: ''
    }
  },
  computed: {
    // ...mapGetters({
    //   authCredentials$: 'authModule/authCredentials'
    // })
  },
  methods: {
    ...mapActions('authModule', ['storeCredentials']),
    async login () {
      this.loading = true
      // const log_in = Axios.post('/login/', this.payload)
      await _loginService.authPost(this.payload)
      .then((resp) => {
        console.log(resp)
        if (resp.success) {
          this.storeCredentials({ data: resp })
          console.log('LOGIN EXITOSO')
          this.$router.push({ name: 'Home' })
        }
      })
      .catch((err) => {
        // this.$notify({
        //   type: 'error',
        //   text: err.msg
        // })
        console.log('Ocurrio un error', err)
        this.alertMsg = 'Usuario o contraseña incorrectos, intente nuevamente'
        setTimeout(() => this.alert = false, 4000)
        this.alert = true
        this.loading = false
      })
      // console.log(log_in)
      // this.$router.push({ name: 'Home' })
      // this.$http.post('/login/', this.payload)
      //   .then(res => {
      //     // if (res) {
      //       console.log(res)
      //     // }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    }
  }
}