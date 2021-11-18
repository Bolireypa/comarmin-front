import { authState } from './auth.state'
import { authMutations } from './auth.mutations'
import { authActions } from './auth.actions'
import { authGetters } from './auth.getters'

export default {
  namespaced: true,
  state: authState,
  mutations: authMutations,
  actions: authActions,
  getters: authGetters
}
