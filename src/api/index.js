import Vue from 'vue'
import axios from 'axios'
import { ApiInstance } from './instance/instance.api'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.prototype.CMInstance = ApiInstance
export default new VueAxios()
