import axios from 'axios'
import store from '../../store'

export const ApiInstance = axios.create({
  // baseURL: 'https://comarminapp.herokuapp.com/api/v1/'
  baseURL: 'http://localhost:5000/api/v1/'
})

ApiInstance.interceptors.request.use((config) => {
  // console.log(store)
  const authUser = store.state.authModule.data
  if (authUser && authUser.user.token) {
    config.headers['Authorization'] = `Bearer ${authUser.user.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

ApiInstance.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data
    } else {
      return Promise.reject(response)
      // return Promise.reject(response.data)
    }
  },
  error => {
    return Promise.reject(error)
    // return Promise.reject(error.response.data)
    // if (error.response.status === 500) {
    // } else {
    //   Cookies.remove('authUser')
    //   store.state.authModule.status = {}
    //   store.state.authModule.data = null
    //   console.info('Se removió las credenciales')
    //   router.push({ name: 'login' })
    //   return Promise.reject(error.response.data)
    // }
  }
)
