import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')