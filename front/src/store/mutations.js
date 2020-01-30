import * as types from './mutation_types'

export default {
    [types.UID](state, uid) {
        state.uid = uid
    },
    [types.TOKEN](state, token) {
        state.token = token
    },
    [types.USER](state, user) {
        state.user = user
    },
    [types.ERROR_STATE](state, error_state) {
        state.error_state = error_state
    },
    [types.USER_NICKNAME](state, userNickname) {
        state.userNickname = userNickname
    }
}