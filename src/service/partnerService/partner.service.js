import { BASE_SERVICE } from '../BaseService'

const nameSpace = 'partners/'

export const PartnersService = {
  ...BASE_SERVICE,
  index () {
    return this.get(`${nameSpace}`)
  },
  create (payload) {
    return this.post(`${nameSpace}`, payload)
  }
  // show (id) {
  //   return this.get(`${nameSpace}/${id}`)
  // },
  // edit (id, payload) {
  //   return this.put(`${nameSpace}/${id}`, payload)
  // },
  // updateRol (userId, roleId) {
  //   return this.put(`${nameSpace}/${userId}/${roleId}`)
  // },
  // destroy (id) {
  //   return this.delete(`${nameSpace}/${id}`)
  // },
  // destroyRol (userId, roleId) {
  //   return this.delete(`${nameSpace}/${userId}/${roleId}`)
  // }
}
