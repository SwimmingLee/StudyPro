import Vue from 'vue'
import VueRouter from 'vue-router'

// 공통페이지
import appHeader from '@/components/common/Header'
import appFooter from '@/components/common/Footer'

// 인트로, 홈페이지
import intro from '@/views/Intro'
import home from '@/views/Home'

// 게시판
import board from '@/components/board/board'

// 유저페이지
import user from '@/views/User'
import signup from '@/components/user/Signup'
import signupSuccess from '@/components/user/SignupSuccess'
import mypage from '@/components/user/Mypage'

// 스터디페이지
import study from '@/views/Study'
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
        path: '/board',
        name: 'board',
        components: {
            header: appHeader,
            default: board,
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
                path: 'signup/success',
                component: signupSuccess
            },
            {
                path: 'mypage',
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