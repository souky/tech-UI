import Vue from 'vue'
import App from './App.vue'
import TechUI from '../lib/tech-ui.common.js'
import '../lib/tech-ui.css'

Vue.use(TechUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
