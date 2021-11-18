export const authActions = {
  storeCredentials: ({ commit }, { data }) => {
    commit('login', data)
  },
  removeCredentials: ({ commit }) => {
    commit('logout')
  }
}
