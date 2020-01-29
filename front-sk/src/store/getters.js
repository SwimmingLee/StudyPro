export default {
    getToken: state => state.token,
    isAuth: (state) => {
        return state.token != "" ? true : false
        },
    getUserNickname: state => state.getUserNickname,
}