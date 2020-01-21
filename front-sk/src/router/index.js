import Vue from 'vue'
import VueRouter from 'vue-router'
import intro from '@/views/Intro'
import home from '@/views/Home'
import appHeader from '@/components/common/Header'
import appFooter from '@/components/common/Footer'
import studySearch from '@/views/StudySearch'

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
            footer: appFooter,
        }
    },
    {
        path: '/search',
        name: 'search',
        components: {
            header: null,
            default: studySearch,
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