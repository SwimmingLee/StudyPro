import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '../views/Intro'
import MainView from '../views/MainView'
import appHeader from '../views/components/Header'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'intro',
        components: {
            header: null,
            default: Intro,
            footer: null
        }
    },
    {
        path: '/main',
        name: 'intro',
        components: {
            header: appHeader,
            default: MainView,
            footer: null
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: "active",
    base: process.env.BASE_URL,
    routes
})

export default router