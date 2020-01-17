import * as types from './mutation_types'

export default {
    [types.UID](state, uid) {
        state.uid = uid
    },
    [types.TOKEN](state, token) {
        state.token = token
    },
    [types.IS_AUTH](state, isAuth) {
        state.isAuth = isAuth
    }
}