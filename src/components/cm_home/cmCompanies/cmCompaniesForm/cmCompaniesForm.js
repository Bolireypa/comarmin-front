import { ServiceFactory } from '@/service/ServiceFactory'
const _companyService = ServiceFactory.get('CompaniesService')

export default {
  data() {
    return {
      companyData: {
        name: '',
        city: '',
        department: '',
        phone: '',
        nit: ''
      }
    }
  },
  methods: {
    async submit () {
      try {
        this.companyData.phone = parseInt(this.companyData.phone)
        const companyResponse = await _companyService.create(this.companyData)
        console.log(companyResponse)
        this.companyTable()
      } catch (error) {
        console.log(error)
      }
    },
    companyTable () {
      this.$router.push({ name: 'Companies' })
    }
  }
}