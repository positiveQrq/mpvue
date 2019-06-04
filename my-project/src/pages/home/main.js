import Vue from 'vue'
import App from './index'

let bus = new Vue()
Vue.prototype.bus = bus

const app = new Vue(App)
app.$mount()
