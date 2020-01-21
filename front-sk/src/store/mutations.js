import * as types from './mutation_types'

export default {
    [types.UID](state, uid) {
        state.uid = uid
    },
    [types.TOKEN](state, token) {
        state.token = token
    },
    [types.ERROR_STATE](state, error_state) {
        state.error_state = error_state
    },
    [types.IS_AUTH](state, isAuth) {
        state.isAuth = isAuth
    }
}