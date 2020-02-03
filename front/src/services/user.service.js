import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://15.164.245.201:8000/users/'

class UserService {
    getUserContent() {
        return axios.get(API_URL + { headers: authHeader() })
    }
}

export default new UserService()