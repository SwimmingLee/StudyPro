import { UID, TOKEN, ERROR_STATE, USER } from './mutation_types'
import api from '../services'
import WbKakao from "@/social-signin/kakao/kakao";

let setUID = ({ commit }, data) => {
    commit(UID, data)
}

let setErrorState = ({ commit }, data) => {
    commit(ERROR_STATE, data)
}

let setToken = ({ commit }, data) => {
    commit(TOKEN, data)
}

let setUser = ({ commit }, data) => {
    commit(USER, data)
}
 
let processSignin = (store, data) => {
    switch (data.state) {
        case 'fail':
            setErrorState(store, '잘못된 아이디 또는 비밀번호 입니다')
            break
        case 'success':
            setUser(store, data.user)
            setUID(store, data.UID)
            setToken(store, data.token)
            sessionStorage.setItem("accessToken", data.token);
            setErrorState(store, '')
            break
        default:
            setErrorState(store, '알 수 없는 에러')
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
    //////////////////////////////////////////////////////////////////////////////////////
    async login(store, { email, password }) {
        let loginResponse = await api.login(email, password)
        console.log(loginResponse)
        processSignin(store, loginResponse)
        return store.getters.isAuth
    },
    
    async logout(store) {
        setToken(store, "");
        WbKakao.signout();
        sessionStorage.setItem("accessToken", "");
    },

    async socialLogin(store, { email, nickname, gender, platform }) {
        let loginResponse = await api.socialLogin(email, nickname, gender, platform)
        processSignin(store, loginResponse)
        return store.getters.isAuth
    },

    async checkToken(store, { token }) {
        let checkTokenResponse = await api.checkToken(token)
        processSignin(store, checkTokenResponse)
        return store.getters.isAuth
    },

    async signup(store, { email, nickname, name, password, gender, phone }) {
        console.log(email, nickname, name, password, gender, phone);
        let signupResponse = await api.signup(email, nickname, name, password, gender, phone)
        console.log(signupResponse)
        return processSignup(store, signupResponse)
    },
    ////////////////////////////////////////////////////////////////////////////////////

    async createGroup(store, { id }) {
        let createGroupResponse = await api.createGroup({id})
        return createGroupResponse
    },

    async getGroup(store, { id }) {
        let getGroupResponse = await api.getGroup(id, store.getters.getToken)
        return getGroupResponse
    },

    async getGroups(store, payload) {
        let getGroupsResponse = await api.getGroups(payload)
        return getGroupsResponse
    },

    async setAccessToken(store, {token}) {
        setToken(store, token);
    },
    //////////////////////////////////////////////////////////////////////////////////////

}