import { BASE_SERVICE } from '../BaseService'

const nameSpace = 'reports/'

export const ReportsService = {
  ...BASE_SERVICE,
  oreCompany (dates, companyId) {
    return this.get(`${nameSpace}?date1=${dates[0]}&date2=${dates[1]}&companyId=${companyId}`)
  },
  orePartner (dates, partnerId) {
    return this.get(`${nameSpace}outlet/partner/?date1=${dates[0]}&date2=${dates[1]}&partnerId=${partnerId}`)
  },
  outletChart (dates) {
    return this.get(`${nameSpace}outlet/dataset/?date1=${dates[0]}&date2=${dates[1]}`)
  },
  dashboardCards () {
    return this.get(`${nameSpace}cards/`)
  },
  dashboardChart (dates, filter) {
    return this.get(`${nameSpace}outlet/chart/?date1=${dates[0]}&date2=${dates[1]}&getBy=${filter}`)
  }
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
