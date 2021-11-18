import JsonExcel from 'vue-json-excel'
import { ServiceFactory } from '@/service/ServiceFactory'
const _reportService = ServiceFactory.get('ReportsService')
const _companyService = ServiceFactory.get('CompaniesService')
const _partnerService = ServiceFactory.get('PartnersService')

export default {
  components: {
    'downloadExcel': JsonExcel
  },
  data() {
    return {
      dates: [],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      dates2: [],
      menu2: false,
      excelReportName: '',
      companies: [],
      companyId: '',
      disabled: true,
      partners: [],
      partnerId: '',
      json_fields_outlets: {
        'Número': 'number',
        'Fecha': 'date',
        'Socio': 'partner',
        'Seccion': 'section',
        'Conductor': 'driver',
        'Vehículo': 'vehicle',
        'Minerales': 'minerals',
        'Tipo de material': 'materialType',
        'Peso Tn.': 'weight',
        'Cantidad': 'quantity'
      },
      json_data_outlets: [],
      json_fields_part_outl: {
        'Número': 'number',
        'Fecha': 'date',
        // 'Socio': 'partner',
        'Seccion': 'section',
        'Conductor': 'driver',
        'Vehículo': 'vehicle',
        'Minerales': 'minerals',
        'Tipo de material': 'materialType',
        'Peso Tn.': 'weight',
        'Cantidad': 'quantity',
        'Empresa': 'company'
      },
      json_data_part_outl: [],
      json_fields: {
        "Complete name": "name",
        City: "city",
        Telephone: "phone.mobile",
        "Telephone 2": {
          field: "phone.landline",
          callback: (value) => {
            return `Landline Phone - ${value}`
          }
        }
      },
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          },
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ]
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        const companiesResponse = await _companyService.index()
        this.companies = companiesResponse.companies
        const partnersResponse = await _partnerService.index()
        this.partners = partnersResponse.partners
      } catch (error) {
        console.log(error)
      }
    },
    validateFields () {

    },
    async getOreCompanyReport () {
      try {
        this.excelReportName = 'Reporte salidas de mineral por empresa' + (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10)) + '.xls'
        console.log(this.excelReportName)
        console.log(this.companyId)
        const reportResponse = await _reportService.oreCompany(this.dates, this.companyId)
        console.log(reportResponse)
        this.json_data_outlets = reportResponse.report.outlets
      } catch (error) {
        console.log(error)      
      }
    },
    async getOutletPartnerReport () {
      try {
        this.excelReportName = 'Reporte de salidas de mineral por socio' + (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10)) + '.xls'
        const reportResponse = await _reportService.orePartner(this.dates2, this.partnerId)
        this.json_data_part_outl = reportResponse.report.outlets
      } catch (error) {
        console.log(error) 
      }
    }
  }
}