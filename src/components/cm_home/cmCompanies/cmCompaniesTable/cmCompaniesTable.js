import JsonExcel from 'vue-json-excel'
import { ServiceFactory } from '@/service/ServiceFactory'
const _companyService = ServiceFactory.get('CompaniesService')
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  components: {
    'downloadExcel': JsonExcel
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'Nombre', value: 'name'},
        { text: 'Ciudad', value: 'city' },
        { text: 'Departamento', value: 'department' },
        { text: 'Telefono', value: 'phone' },
        { text: 'Fecha de afiliacion', value: 'created_at' },
        { text: 'Opciones', value: 'options' }
      ],
      oreOutlets: [],
      companies: [],
      excelReportName: 'Reporte de empresas ' + (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      json_fields_companies: {
        'Nombre(s)': 'name',
        'Ciudad': 'city',
        'Departamento': 'department',
        'Telefono': 'phone',
        'Fecha de afiliacion': 'created_at'
      }
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        const companiesResponse = await _companyService.index()
        this.companies = companiesResponse.companies
        console.log(companiesResponse)
      } catch (error) {
        console.log(error)
      }
    },
    newItem () {
      this.$router.push({ name: 'NewCompany' })
      // this.$router.push({ name: 'Home' })
    },
    editItem (item) {
      alert('EDIT ' + item.name)
      console.log(item)
    },
    deleteItem (item) {
      alert('DELETE ' + item.name)
      console.log(item)
    },
    generatePDFStyle () {
      const doc = new jsPDF('p', 'pt', 'letter')
      html2canvas(this.$refs.testHtml).then(function (canvas) {
        const img = canvas.toDataURL("image/png")
        doc.addImage(img,'JPEG',20,20,550,130)
        doc.save("report.pdf")
      })
    }
  }
}