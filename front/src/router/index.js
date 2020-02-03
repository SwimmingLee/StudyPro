import Vue from 'vue'
import VueRouter from 'vue-router'
import intro from '@/views/Intro'
import home from '@/views/Home'
import appHeader from '@/components/common/Header'
import appFooter from '@/components/common/Footer'
import study from '@/views/Study'
import user from '@/views/User'
import signup from '@/components/user/Signup'
import mypage from '@/components/user/Mypage'
import studydetail from '@/components/studydetail/MainStudyDetail'
import workspace from '@/components/workspace/WorkSpace'

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
        path: '/user',
        name: 'user',
        components: {
            header: appHeader,
            default: user,
            footer: appFooter
        },
        children: [{
                path: 'signup',
                component: signup
            },
            {
                path: '/:id',
                component: mypage
            }
        ]
    },
    {
        path: '/workspace',
        name: 'workspace',
        components: {
            header: null,
            default: workspace,
            footer: null
        }
    },
    {
        path: '/study/studydetail/:id',
        name: 'studydetail',
        components: {
            header: appHeader,
            default: studydetail,
            footer: appFooter
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