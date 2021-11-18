import JsonExcel from 'vue-json-excel'
import { ServiceFactory } from '@/service/ServiceFactory'
const _oreOutletService = ServiceFactory.get('OreOutletsService')
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
        { text: 'Numero', value: 'number', align: 'start' },
        { text: 'Empresa destino', value: 'company.name' },
        { text: 'Socio', value: 'partner.full_name' },
        { text: 'Minerales', value: 'minerals' },
        { text: 'Tipo de material', value: 'materialType' },
        { text: 'Transporte', value: 'vehicle.license_plate' },
        { text: 'Conductor', value: 'driver.full_name' },
        { text: 'Fecha', value: 'date' },
        { text: 'Opciones', value: 'options' }
      ],
      oreOutlets: [],
      excelReportName: 'Reporte de salidas de mineral ' + (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      json_fields_outlets: {
        'Número': 'number',
        'Fecha': 'date',
        'Socio': 'partner.full_name',
        'Empresa destino': 'company.name',
        'Conductor': 'driver.full_name',
        'Vehículo': 'vehicle.license_plate',
        'Minerales': 'minerals',
        'Tipo de material': 'materialType',
        'Peso Tn.': 'weight',
        'Cantidad': 'quantity',
        'Sección': 'section'
      },
      json_data_outlets: [],
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      try {
        const outletsResponse = await _oreOutletService.index()
        console.log(outletsResponse)
        this.oreOutlets = outletsResponse.outlets
      } catch (error) {
        console.log(error)
      }
    },
    newItem () {
      this.$router.push({ name: 'NewOreOutlet' })
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
    generatePDF() {
      var doc = new jsPDF('p', 'pt', 'letter')
      var margins = [80,60,40,40]
      // {
      //   top: 80,
      //   bottom: 60,
      //   left: 40,
      //   width: 522
      // }
      doc.html(this.$refs.testHtml, {
        callback: function (doc) {
          doc.save()
        },
        margin: margins,
        width: 170
      })
      // doc.save('test.pdf')
      // const doc = new jsPDF()
      // const contentHtml = this.$refs.testHtml
      // doc.fromHTML(contentHtml, 15, 15, {
      //     width: 170
      //   })
      // doc.save("sample.pdf")
    },
    generatePDFStyle () {
      // alert('generar pdf')
      // console.log('generar pdf')
      const doc = new jsPDF('p', 'pt', 'letter')
      // var canvasElement = document.createElement('canvas')
      html2canvas(this.$refs.testHtml).then(function (canvas) {
        const img = canvas.toDataURL("image/png")
        doc.addImage(img,'JPEG',20,20,550,130)
        doc.save("sample.pdf")
      })
      // html2canvas(this.$refs.testHtml, {
      //   onrendered:function(canvas){
      //     var img=canvas.toDataURL("image/png")
      //     var doc = new jsPDF()
      //     doc.addImage(img,'JPEG',20,20)
      //     doc.save('test.pdf')
      //   }
      // })
    }
  }
}