import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authModule
  }
})

// import Vue from 'vue'
// import Vuex from 'vuex'
// // import authModule from './auth'
// import Cookies from 'js-cookie'

// Vue.use(Vuex)

// const storeCookies = () => {
//   const aux = Cookies.get('authUser')
//   console.log(aux)
//   return (typeof aux === 'undefined') ? null : JSON.parse(aux)
// }

// export default new Vuex.Store({
//   state: {
//     status: storeCookies() ? { loggedIn: true } : {},
//     data: storeCookies() || null,
//     user: {}
//   },
//   mutations: {
//     login: (state, data) => {
//       state.status = { loggedIn: true }
//       state.data = data
//       console.log(data)
//       const new_data = JSON.parse(JSON.stringify(data))
//       console.log(new_data)
//       Cookies.set('authUser', data)
//     },
//     logout: (state) => {
//       state.status = {}
//       state.data = null
//       Cookies.remove('authUser')
//     }
//   },
//   actions: {
//     storeCredentials: ({ commit }, { data }) => {
//       commit('login', data)
//     },
//     removeCredentials: ({ commit }) => {
//       commit('logout')
//     }
//   },
//   modules: {
//   }
// })
