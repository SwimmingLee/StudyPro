import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import StudyPro from './plugins/studyPro';

Vue.config.productionTip = false

Vue.use(StudyPro)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')