import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '../views/Intro'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'intro',
    components: {
        header: null,
        default: Intro,
        footer: null
    }
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router