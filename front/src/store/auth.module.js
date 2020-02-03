import AuthService from '@/services/auth.service'

const local = JSON.parse(localStorage.getItem('user'))
const session = JSON.parse(localStorage.getItem('user'))
const user = local || session
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                res => {
                    commit('loginSuccess', res.user)
                    return Promise.resolve(res.state)
                },
                error => {
                    commit('loginFailure')
                    return Promise.reject(error.response.data)
                }
            )
        },
        logout({ commit }) {
            AuthService.logout()
            commit('logout')
        },
        register({ commit }, formData) {
            return AuthService.register(formData).then(
                response => {
                    commit('registerSuccess')
                    return Promise.resolve(response.data.state)
                },
                error => {
                    commit('registerFailure')
                    return Promise.reject(error.response)
                }
            )
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status = { loggedIn: true }
            state.user = user
        },
        loginFailure(state) {
            state.status = {}
            state.user = null
        },
        logout(state) {
            state.status = {}
            state.user = null
        },
        registerSuccess(state) {
            state.status = {}
        },
        registerFailure(state) {
            state.status = {}
        }
    }
}