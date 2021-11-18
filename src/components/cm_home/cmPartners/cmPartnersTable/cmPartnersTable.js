import JsonExcel from 'vue-json-excel'
import { ServiceFactory } from '@/service/ServiceFactory'
const _partnerService = ServiceFactory.get('PartnersService')
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  components: {
    'downloadExcel': JsonExcel
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'Nombre(s)', value: 'name', align: 'start' },
        { text: 'Apellido(s)', value: 'lastname' },
        { text: 'CI', value: 'ci' },
        { text: 'Celular', value: 'cellphone' },
        { text: 'Direccion', value: 'address' },
        { text: 'Fecha socio', value: 'membershipDate' },
        { text: 'Opciones', value: 'options' }
      ],
      oreOutlets: [],
      partners: [],
      excelReportName: 'Reporte de socios ' + (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      json_fields_partners: {
        'Nombre(s)': 'name',
        'Apellido(s)': 'lastname',
        'CI': 'ci',
        'Celular': 'cellphone',
        'Direccion': 'address',
        'Fecha socio': 'membershipDate'
      }
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        const partnersResponse = await _partnerService.index()
        this.partners = partnersResponse.partners
        console.log(partnersResponse)
      } catch (error) {
        console.log(error)
      }
    },
    newItem () {
      this.$router.push({ name: 'NewPartner' })
      // this.$router.push({ name: 'Home' })
    },
    editItem (item) {
      // alert('EDIT ' + item.id)
      console.log(item)
      this.$router.push({ name: 'ViewPartner', params: { item } })
    },
    deleteItem (item) {
      alert('DELETE ' + item.name)
      console.log(item)
    },
    cardPDF (element) {
      const doc = new jsPDF('p', 'pt', 'letter')
      var getEl = document.getElementById('card'+element)
      // console.log(this.$refs.cardHtml)
      // console.log(element)
      // console.log(getEl)
      html2canvas(getEl).then(function (canvas) {
        const img = canvas.toDataURL("image/png")
        doc.addImage(img,'JPEG',20,20)
        doc.save("card.pdf")
      })
    }
  }
}