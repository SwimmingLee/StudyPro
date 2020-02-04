import axios from 'axios'

const API_URL = 'http://15.164.245.201:8000/users/'

function authHeader() {
    let local = JSON.parse(localStorage.getItem('user'))
    let session = JSON.parse(sessionStorage.getItem('user'))
    let user = local || session
    if (user && user.accessToken) {
        console.log('userservice')
        console.log(user)
        return { accessToken: user.accessToken }
    } else {
        return {}
    }
}

class UserService {
    getUserContent() {
        let headers = authHeader()
        if (!headers) return { status: {}, user: null }
        return axios.post(API_URL + 'token', { headers: headers })
            .then(res => {
                return res.data
            })
    }
}

export default new UserService()