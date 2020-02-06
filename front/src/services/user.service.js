import axios from 'axios'
import AuthHeader from './auth.header'

const URL = process.env.VUE_APP_API_URL + 'users/'

class UserService {
    getUserContent() {
        let headers = AuthHeader.getToken()
        if (!headers) return { status: {}, user: null }
        return axios.post(URL + 'token', { headers: headers })
            .then(res => {
                return res.data
            })
    }


    getAllUser() {
        return axios.get(URL)
    }
}

export default new UserService()