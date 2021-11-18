import { ServiceFactory } from '@/service/ServiceFactory'
const _pricingService = ServiceFactory.get('PricingService')

export default {
  data () {
    return {
      tonelaje: 0,
      leyZn: 0,
      znSus: 0,
      leyPb: 0,
      pbSus: 0,
      leyAg: 0,
      agSus: 0,
      netoSus: 0,
      retencionesSus: 0,
      regaliasSus: 0,
      anticipoBs: 0,
      bonosBs: 0,
      pagableSus: 0,
      pagableBs: 0,
      tablaZn: [0,0,0,0,0,0,0,12.53,14.64,15.47,15.59,16.37,16.53,16.67,16.70,16.81,17.02,17.27,17.27,17.28,17.33,17.48,17.50,17.51,17.56,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61,17.61],
      tablaPb: [0,0,4.60,6.35,6.67,7.80,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92,8.92],
      tablaAg: [0,9.57,11.29,12.63,14.38,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99,14.99],
      humedad: 0.05,
      retenciones: [0.018,0.01,0.007,0.003,0.05,0.004],
      rm: {
        Zn: 0.07,
        Pb: 0.07,
        Ag: 0.07
      },
      dolarPrecio: 6.96,
      dialog: false,
      dialog2: false,
      search: '',
      tab: null,
      tabs: ['Zinc', 'Plomo', 'Plata'],
      newData: [],
      newPricing: 0,
      postData: {
        pricing: [],
        ore: '',
        short: ''
      },
      editId: '',
      responseData: {}
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        const pricingResponse = await _pricingService.index()
        console.log(pricingResponse)
        this.responseData = pricingResponse
        this.tablaZn = pricingResponse.pricing[0].pricing.pricing
        this.tablaPb = pricingResponse.pricing[1].pricing.pricing
        this.tablaAg = pricingResponse.pricing[2].pricing.pricing
      } catch (error) {
        console.log(error)
      }
    },
    roundToTwo(num) {    
      return +(Math.round(num + "e+2")  + "e-2");
    },
    calculate () {
      const tonelajeSeco = this.tonelaje-this.tonelaje*this.humedad
      this.znSus = this.tablaZn[Math.trunc(this.leyZn)]
      this.pbSus = this.tablaPb[Math.trunc(this.leyPb)]
      this.agSus = this.tablaAg[Math.trunc(this.leyAg)]
      // const valorNetoPb = this.znSus*tonelajeSeco*this.leyPb
      // const valorNetoZn = this.pbSus*tonelajeSeco*this.leyZn
      // const valorNetoAg = this.agSus*tonelajeSeco*this.leyAg
      const valorNetoPb = this.tablaPb[Math.trunc(this.leyPb)]*tonelajeSeco*this.leyPb
      const valorNetoZn = this.tablaZn[Math.trunc(this.leyZn)]*tonelajeSeco*this.leyZn
      const valorNetoAg = this.tablaAg[Math.trunc(this.leyAg)]*tonelajeSeco*this.leyAg
      this.netoSus = parseInt(valorNetoAg+valorNetoPb+valorNetoZn)
      let totalRetenciones = 0
      for (let i = 0; i < this.retenciones.length; i++) {
        totalRetenciones = totalRetenciones + (this.retenciones[i]*this.netoSus)
      }
      this.retencionesSus = parseInt(totalRetenciones)
      this.regaliasSus = parseInt((valorNetoZn*this.rm.Zn)+(valorNetoPb*this.rm.Pb)+(valorNetoAg*this.rm.Ag))
      const pgbSUS = this.netoSus-this.retencionesSus-this.regaliasSus-(this.anticipoBs/this.dolarPrecio)+(this.bonosBs/this.dolarPrecio)
      this.pagableSus = parseInt(this.netoSus-this.retencionesSus-this.regaliasSus-(this.anticipoBs/this.dolarPrecio)+(this.bonosBs/this.dolarPrecio))
      this.pagableBs = parseInt(pgbSUS*this.dolarPrecio)
    },
    calculate2 () {
      const tonelajeSeco = this.tonelaje-this.tonelaje*this.humedad
      // this.znSus = this.tablaZn[Math.trunc(this.leyZn)]
      // this.pbSus = this.tablaPb[Math.trunc(this.leyPb)]
      // this.agSus = this.tablaAg[Math.trunc(this.leyAg)]
      // console.log(this.tablaPb[Math.trunc(this.leyPb)])
      // console.log(this.pbSus)
      const valorNetoPb = this.pbSus*tonelajeSeco*this.leyPb
      const valorNetoZn = this.znSus*tonelajeSeco*this.leyZn
      const valorNetoAg = this.agSus*tonelajeSeco*this.leyAg
      this.netoSus = parseInt(valorNetoAg+valorNetoPb+valorNetoZn)
      let totalRetenciones = 0
      for (let i = 0; i < this.retenciones.length; i++) {
        totalRetenciones = totalRetenciones + (this.retenciones[i]*this.netoSus)
      }
      this.retencionesSus = parseInt(totalRetenciones)
      this.regaliasSus = parseInt((valorNetoZn*this.rm.Zn)+(valorNetoPb*this.rm.Pb)+(valorNetoAg*this.rm.Ag))
      const pgbSUS = this.netoSus-this.retencionesSus-this.regaliasSus-(this.anticipoBs/this.dolarPrecio)+(this.bonosBs/this.dolarPrecio)
      this.pagableSus = parseInt(this.netoSus-this.retencionesSus-this.regaliasSus-(this.anticipoBs/this.dolarPrecio)+(this.bonosBs/this.dolarPrecio))
      this.pagableBs = parseInt(pgbSUS*this.dolarPrecio)
    },
    async update(i) {
      this.dialog = true
      console.log(i)
      if (i == 'Zn') {
        this.newData = this.tablaZn
        this.editId = this.responseData.pricing[0].id
      }
      if (i == 'Pb') {
        this.newData = this.tablaPb    
        this.editId = this.responseData.pricing[1].id
      }
      if (i == 'Ag') {
        this.newData = this.tablaAg
        this.editId = this.responseData.pricing[2].id
      }
    },
    update2 () {
      this.dialog2 = true
    },
    addToNewData () {
      this.newData.push(this.newPricing)
      this.newPricing = 0
    },
    removeRow(i) {
      this.newData.splice(i, 1)
    },
    addToPostData () {
      this.postData.pricing.push(this.newPricing)
      this.newPricing = 0
    },
    removePostDataRow(i) {
      this.postData.pricing.splice(i, 1)
    },
    async saveTable(){
      this.dialog2 = false
      for (let i = 0; i < this.postData.pricing.length; i++) {
        this.postData.pricing[i] = parseFloat(this.postData.pricing[i])
      }
      console.log(this.postData)
      try {
        const saveResponse = await _pricingService.create(this.postData)
        console.log(saveResponse)
        this.postData = {
          pricing: [],
          ore: '',
          short: ''
        }
        this.initialize()
      } catch (error) {
        console.log(error)
      }
    },
    async saveEdit () {
      this.dialog = false
      console.log(this.editId, this.newData)
      for (let i = 0; i < this.newData.length; i++) {
        this.newData[i] = parseFloat(this.newData[i])
      }
      try {
        const p = {
          pricing: this.newData
        }
        const editResponse = await _pricingService.edit(this.editId, p)
        console.log(editResponse)
      } catch (error) {
        console.log(error)
      }
    }
  }
}