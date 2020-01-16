import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './routes'
import store from './vuex/store'
import StudyPro from './plugins/studyPro.js'

Vue.config.productionTip = false

Vue.use(Router);
Vue.use(StudyPro);

const router = new Router({
    routes,
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');