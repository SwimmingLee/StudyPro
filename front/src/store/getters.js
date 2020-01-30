export default {
    getToken: state => state.token,
    isAuth: (state) => {
        return state.token != "" ? true : false
    },
    userNickname: (state) => {
        return state.user.nickname;
    },
    userEmail: (state) => {
        return state.user.email;
    },
    userName: (state) => {
        return state.user.name;
    },
    userPhone: (state) => {
        return state.user.phone;
    },
    getUserNickname: state => state.getUserNickname,
}