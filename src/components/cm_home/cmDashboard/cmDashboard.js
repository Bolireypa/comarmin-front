import Chart from 'chart.js'
import moment from 'moment'
import { ServiceFactory } from '@/service/ServiceFactory'
const _reportService = ServiceFactory.get('ReportsService')
const _companyService = ServiceFactory.get('CompaniesService')
const _partnerService = ServiceFactory.get('PartnersService')
// const _outletService = ServiceFactory.get('OreOutletsService')

export default {
  data() {
    return {
      dashboardCards: {},
      partners: [],
      companies: [],
      tab: null,
      // outlets: []
      items: [
        {
          name: 'Item 1',
          value: 30
        },
        {
          name: 'Item 2',
          value: 20
        }
      ],
      companiesList: [],
      partnersList: [],
      companiesDateset: {},
      partnersDateset: {},
      smChart: null,
      bgChart: null,
      filter: 'company',
      menu: false,
      dates: []
    }
  },
  mounted() {
    this.initialize()
  },
  created() {
    
  },
  methods: {
    getRandomColor () {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    async initialize () {
      var year = moment().year()
      var month = moment().month()
      var finalDayMonth = moment([0,0,31]).year(year).month(month).format('YYYY-MM-DD')
      var initialDayMonth = moment([0,0,1]).year(year).month(month).format('YYYY-MM-DD')
      console.log(finalDayMonth, initialDayMonth)
      const companiesResponse = await _companyService.index()
      this.companies = companiesResponse.companies
      const partnersResponse = await _partnerService.index()
      this.partners = partnersResponse.partners
      // const outletsResponse = await _outletService.index()
      // this.outlets = outletsResponse.outlets
      const dashboardResponse = await _reportService.dashboardCards()
      this.dashboardCards = dashboardResponse.data
      this.companiesList = dashboardResponse.outletCompany
      this.partnersList = dashboardResponse.outletPartner
      console.log(dashboardResponse)
      var complbs = []
      var compdat = []
      var comcol = []
      this.companiesList.forEach(el => {
        complbs.push(el.name)
        compdat.push(el.total)
        comcol.push(this.getRandomColor())
      });
      this.companiesDateset = {
        labels: complbs,
        datasets: [{
          label: '# Salidas de mineral por empresa',
          data: compdat,
          backgroundColor: comcol
        }]
      }
      var partlbs = []
      var partdat = []
      var partcol = []
      this.partnersList.forEach(el => {
        partlbs.push(el.name)
        partdat.push(el.total)
        partcol.push(this.getRandomColor())
      });
      this.partnersDateset = {
        labels: partlbs,
        datasets: [{
          label: '# Salidas de mineral por socio',
          data: partdat,
          backgroundColor: partcol
        }]
      }
      const ctx = document.getElementById('myChart');
      this.smChart = new Chart(ctx, {
        type: 'bar',
        data: this.companiesDateset,
        // {
        //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //   datasets: [{
        //       label: '# of Votes',
        //       data: [12, 19, 3, 5, 2, 3],
        //       backgroundColor: [
        //           'rgba(255, 99, 132, 0.2)',
        //           'rgba(54, 162, 235, 0.2)',
        //           'rgba(255, 206, 86, 0.2)',
        //           'rgba(75, 192, 192, 0.2)',
        //           'rgba(153, 102, 255, 0.2)',
        //           'rgba(255, 159, 64, 0.2)'
        //       ]
        //   }]
        // },
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Gráfica de salidas de mineral por empresa'
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          }
        }
      })

      // request chart data
      var now = moment().format('YYYY-MM-DD')
      var before = moment().subtract(7, 'days').format('YYYY-MM-DD')
      this.dates = [before, now]
      console.log(now, before)
      const reportResponse = await _reportService.dashboardChart([before, now], this.filter)
      console.log(reportResponse)
      reportResponse.data.datasets.forEach(el => {
        el.borderColor = this.getRandomColor()
      })
      const nco = document.getElementById('outletChart')
      this.bgChart = new Chart(nco, {
        type: 'line',
        data: reportResponse.data
      })
    },
    goToCompanyForm () {
      this.$router.push({ name: 'NewCompany' })
    },
    goToPartnerForm () {
      this.$router.push({ name: 'NewPartner' })
    },
    goToVehicleForm () {
      this.$router.push({ name: 'NewVehicle' })
    },
    goToOutletForm () {
      this.$router.push({ name: 'NewOreOutlet' })
    },
    updateChartData (item) {
      switch (item) {
        case 'company':
          this.smChart.data = this.companiesDateset
          this.smChart.options.title.text = 'Gráfica de salidas de mineral por empresa'
          // this.smChart.update()
          break
      
        case 'partner':
          this.smChart.data = this.partnersDateset
          this.smChart.options.title.text = 'Gráfica de salidas de mineral por socio'
          // this.smChart.update()
          break
          
        default:
          break
      }
      this.smChart.update()
    },
    async updateBgChart (item) {
      this.menu = false
      this.filter = item
      // var now = moment().format('YYYY-MM-DD')
      // var before = moment().subtract(7, 'days').format('YYYY-MM-DD')
      const reportResponse = await _reportService.dashboardChart(this.dates, this.filter)
      reportResponse.data.datasets.forEach(el => {
        el.borderColor = this.getRandomColor()
      })
      this.bgChart.data = reportResponse.data
      // switch (item) {
      //   case 'company':
      //     const reportResponse = await _reportService.dashboardChart([before, now], this.filter)
      //     reportResponse.data.datasets.forEach(el => {
      //       el.borderColor = this.getRandomColor()
      //     })
      //     this.bgChart.data = reportResponse.data
      //     // this.bgChart.options.title.text = 'Gráfica de salidas de mineral por empresa'
      //     // this.smChart.update()
      //     break
      
      //   case 'partner':
      //     this.bgChart.data = this.partnersDateset
      //     // this.bgChart.options.title.text = 'Gráfica de salidas de mineral por socio'
      //     // this.smChart.update()
      //     break
      
      //   default:
      //     break
      // }
      this.bgChart.update()
    }
  }
}