import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import studyPro from './plugins/studyPro';
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    studyPro,
    render: h => h(App)
}).$mount('#app')