class AuthHeader {
    getToken() {
        let local = JSON.parse(localStorage.getItem('user'))
        let session = JSON.parse(sessionStorage.getItem('user'))
        let user = local || session
        if (user && user.accessToken) {
            return { accessToken: user.accessToken }
        } else {
            return {}
        }
    }
}

export default new AuthHeader()