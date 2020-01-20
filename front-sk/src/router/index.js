import Vue from 'vue'
import VueRouter from 'vue-router'
import intro from '../views/Intro'
import home from '../views/Home'
import appHeader from '@/components/common/Header'
import join from '@/components/user/Join'
import login from '@/components/user/Login'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'intro',
        components: {
            header: null,
            default: intro,
            footer: null
        }
    },
    {
        path: '/home',
        name: 'home',
        components: {
            header: appHeader,
            default: home,
            footer: null
        }
    },
    {
        path: '/join',
        name: 'join',
        components: {
            header: appHeader,
            default: join,
            footer: null
        }
    },
    {
        path: '/login',
        name: 'login',
        components: {
            header: appHeader,
            default: login,
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