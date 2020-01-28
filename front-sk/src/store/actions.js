import { UID, TOKEN, IS_AUTH, ERROR_STATE } from './mutation_types'
import api from '../services'

let setUID = ({ commit }, data) => {
    commit(UID, data)
}

let setErrorState = ({ commit }, data) => {
    commit(ERROR_STATE, data)
}

let setToken = ({ commit }, data) => {
    commit(TOKEN, data)
}

let setIsAuth = ({ commit }, data) => {
    commit(IS_AUTH, data)
}

let processSignin = (store, data) => {
    switch (data.state) {
        case 'fail':
            setErrorState(store, '잘못된 아이디 또는 비밀번호 입니다')
            setIsAuth(store, false)
            break
        case 'success':
            setUID(store, data.UID)
            setToken(store, data.TOKEN)
            setErrorState(store, '')
            setIsAuth(store, true)
            break
        default:
            setErrorState(store, '알 수 없는 에러')
            setIsAuth(store, false)
    }
}

let processSignup = (store, data) => {
    switch (data.state) {
        case 'fail':
            return false
        case 'success':
            return true
        default:
            return false
    }
}

export default {
    async login(store, { email, password }) {
        let loginResponse = await api.login(email, password)
        processSignin(store, loginResponse)
        return store.getters.getIsAuth
    },

    async signup(store, { email, nickname, name, password, gender, phone }) {
        console.log("signup")
        let signupResponse = await api.signup(email, nickname, name, password, gender, phone)
        console.log(signupResponse)
        return processSignup(store, signupResponse)
    },

    async getGroup(store, { id }) {
        let getGroupResponse = await api.getGroup(id, store.getters.getToken)
        return getGroupResponse
    },

    async getGroups(store, payload) {
        let getGroupsResponse = await api.getGroups(payload)
        return getGroupsResponse
    }
}