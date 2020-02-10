import axios from 'axios'
import AuthHeader from './auth.header'

const URL = process.env.VUE_APP_API_URL + 'users/'

class UserService {
    getUserContent(uid) {
        AuthHeader.changeHeadersToken()
        return axios.get(URL + uid)
            .then(res => {
                return res.data
            })
    }


    getAllUser() {
        return axios.get(URL)
    }
}

export default new UserService()