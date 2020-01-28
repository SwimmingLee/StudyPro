import Vue from 'vue'
import VueRouter from 'vue-router'
import intro from '@/views/Intro'
import home from '@/views/Home'
import appHeader from '@/components/common/Header'
import appFooter from '@/components/common/Footer'
import study from '@/views/Study'
import signup from '@/components/user/Signup'
import mypage from '@/components/user/Mypage'
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
        path: '/study',
        name: 'study',
        components: {
            header: appHeader,
            default: study,
            footer: appFooter
        }
    },
    {
        path: '/signup',
        name: 'signup',
        components: {
            header: appHeader,
            default: signup,
            footer: appFooter
        }
    },
    {
        path: '/mypage',
        name: 'mypage',
        components: {
            header: appHeader,
            default: mypage,
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