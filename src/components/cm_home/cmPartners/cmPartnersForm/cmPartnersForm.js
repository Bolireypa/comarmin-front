import { ServiceFactory } from '@/service/ServiceFactory'
const _partnerService = ServiceFactory.get('PartnersService')

export default {
  data() {
    return {
      partnerData: {
        name: '',
        lastname: '',
        ci: '',
        address: '',
        membershipDate: '',
        cellphone: null
      }
    }
  },
  methods: {
    async submit () {
      this.partnerData.cellphone = parseInt(this.partnerData.cellphone)
      const partResponse = await _partnerService.create(this.partnerData)
      console.log(partResponse)
      this.partnersTable()
    },
    partnersTable () {
      this.$router.push({ name: 'Partners' })
    }
  }
}