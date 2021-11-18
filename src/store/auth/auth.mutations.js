import Cookies from 'js-cookie'

export const authMutations = {
  LOGIN_REQUEST (state, data) {
    state.status = { loggingIn: true }
    state.data = data
  },
  login (state, data) {
    state.status = { loggedIn: true }
    state.data = data
    console.log(typeof data)
    console.log(data)
    console.log(state)
    // const userDt = {
    //   email: data.user.email,
    //   token: data.user.token
    // }
    Cookies.set('authUser', data)
  },
  LOGIN_FAIL (state) {
    state.status = {}
    state.data = null
  },
  logout (state) {
    // console.info('removing credentials')
    state.status = {}
    state.data = null
    Cookies.remove('authUser')
  }
}
