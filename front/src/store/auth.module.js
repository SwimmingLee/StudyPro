import AuthService from '@/services/auth.service'

const local = JSON.parse(localStorage.getItem('user'))
const session = JSON.parse(sessionStorage.getItem('user'))
const user = local || session
const initialState = user ? { status: { isLogged: true }, user: user } : { status: { isLogged: false }, user: null }

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        // 초기 유저정보 업데이트
        checkUserDefault({ commit }) {
            if (!initialState.user) return
            AuthService.checkUserDefault(initialState.user).then(
                res => {
                    if (res.state == 'success') {
                        commit('loginSuccess', res.user)
                    } else {
                        commit('loginFailure')
                    }
                }
            )
        },

        // 로그인
        async login({ commit }, user) {
            return await AuthService.login(user).then(
                res => {
                    if (res) {
                        commit('loginSuccess', res.user)
                        return true
                    } else {
                        commit('loginFailure')
                        return false
                    }
                },
                () => { // error
                    commit('loginFailure')
                    return false
                }
            )
        },

        // 로그아웃
        async logout({ commit }) {
            await AuthService.logout()
            commit('logout')
        },

        // 회원가입
        async register({ commit }, formData) {
            return await AuthService.register(formData).then(
                () => { //response
                    commit('registerSuccess')
                    return true
                },
                () => { //errors
                    commit('registerFailure')
                    return false
                }
            )
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status = { isLogged: true }
            state.user = user
        },
        loginFailure(state) {
            state.status = { isLogged: false }
            state.user = null
        },
        logout(state) {
            state.status = { isLogged: false }
            state.user = null
        },
        registerSuccess(state) {
            state.status = { isLogged: false }
        },
        registerFailure(state) {
            state.status = { isLogged: false }
        }
    },
    getters: {
        isAuth: (state) => {
            return state.status.isLogged
        },
        getUser: (state) => {
            return state.user
        }
    }
}