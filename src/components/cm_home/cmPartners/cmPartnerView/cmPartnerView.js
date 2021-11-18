import { ServiceFactory } from '@/service/ServiceFactory'
const _reportService = ServiceFactory.get('ReportsService')
// const _companyService = ServiceFactory.get('CompaniesService')
// const _partnerService = ServiceFactory.get('PartnersService')
export default {
  data() {
    return {
      partner: {},
      outlets: [],
      headers: [
        { text: 'Empresa', value: 'company', align: 'start' },
        { text: 'Numero', value: 'number' },
        { text: 'Fecha', value: 'date' },
        { text: 'Conductor', value: 'driver' },
        { text: 'Tipo material', value: 'materialType' },
        { text: 'Minerales', value: 'minerals' },
        { text: 'Cantidad', value: 'quantity' },
        { text: 'Peso', value: 'weight' },
        { text: 'Vehículo', value: 'vehicle' },
        { text: 'Sección', value: 'section' }
      ]
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize () {
      console.log(this.$route.params)
      this.partner = this.$route.params.item
      try {
        const reportResp = await _reportService.orePartner(['2021-10-20','2021-12-20'], this.partner.id)
        this.outlets = reportResp.report.outlets
        console.log(this.outlets)
      } catch (error) {
        console.log(error)
      }
    }
  }
}