import Vue from 'vue'
import VueRouter from 'vue-router'
import intro from '@/views/Intro'
import home from '@/views/Home'
import appHeader from '@/components/common/Header'
import appFooter from '@/components/common/Footer'
import studySearch from '@/views/StudySearch'
import join from '@/components/user/Join'
import workspace from '@/components/WorkSpace'

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
            header: appHeader,
            default: studySearch,
            footer: appFooter
        }
    },
    {
        path: '/join',
        name: 'join',
        components: {
            header: appHeader,
            default: join,
            footer: appFooter
        }
    },
    {
        path: '/workspace',
        name: 'workspace',
        components: {
            header: null,
            default: workspace,
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