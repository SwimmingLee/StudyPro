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

let processResponse = (store, loginResponse) => {
    switch (loginResponse.state) {
        case 'Fail':
            setErrorState(store, '잘못된 아이디 또는 비밀번호 입니다')
            setIsAuth(store, false)
            break
        case 'Success':
            setUID(store, loginResponse.UID)
            setToken(store, loginResponse.TOKEN)
            setErrorState(store, '')
            setIsAuth(store, true)
            break
        default:
            setErrorState(store, '알 수 없는 에러')
            setIsAuth(store, false)
    }
}

export default {
    async login(store, { email, password }) {
        let loginResponse = await api.login(email, password)
        processResponse(store, loginResponse)
        return store.getters.getIsAuth
    }
}